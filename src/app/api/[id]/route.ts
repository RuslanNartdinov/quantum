import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import pdf from 'pdf-parse';
import OpenAI from 'openai';

// Настройка OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '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', // Убедитесь, что ключ API берётся из переменных среды
});

// Функция для разбиения текста
function splitText(text: string, maxLength = 2000): string[] {
  const sentences = text.split('. ');
  const chunks: string[] = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length < maxLength) {
      currentChunk += sentence + '. ';
    } else {
      chunks.push(currentChunk.trim());
      currentChunk = sentence + '. ';
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

// Функция для суммаризации текста
async function summarizeText(text: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: `Summarize the following text:\n${text}` }],
    max_tokens: 150,
  });

  return response.choices?.[0]?.message?.content?.trim() ?? 'No summary available';
}

const projects = [
  { id: '0', name: 'Проект 1', description: 'Описание проекта 1' },
  { id: '1', name: 'Проект 2', description: 'Описание проекта 2' },
  { id: '2', name: 'Проект 3', description: 'Описание проекта 3' },
];

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  console.log('Получен запрос для ID:', id);

  // Проверяем, есть ли проект
  const project = projects.find((p) => p.id === id);

  if (!project) {
    console.error('Проект не найден:', id);
    return NextResponse.json({ error: 'Проект не найден' }, { status: 404 });
  }

  // Строим путь к файлу
  const pdfPath = path.join(process.cwd(), 'public', 'pdfs', `${id}.pdf`);
  console.log('Путь к PDF:', pdfPath);

  // Проверяем существование файла
  const fileExists = await fs.access(pdfPath).then(() => true).catch(() => false);

  if (!fileExists) {
    console.error('Файл не найден:', pdfPath);
    return NextResponse.json({ error: 'Файл не найден' }, { status: 404 });
  }

  // Читаем файл
  try {
    const fileBuffer = await fs.readFile(pdfPath);
    console.log('Буфер файла:', fileBuffer);

    //------------------------------------------------------
    // Извлекаем текст из PDF
    const parsedData = await pdf(fileBuffer);
    console.log('Извлечённый текст:', parsedData.text);

    // Разбиваем текст на части для обработки OpenAI
    const textChunks = splitText(parsedData.text);

    // Суммаризируем каждую часть текста
    const summaries: string[] = [];
    for (const chunk of textChunks) {
      const summary = await summarizeText(chunk);
      summaries.push(summary);
    }

    // Объединяем все суммаризации
    const finalSummary = summaries.join('\n\n');
    //------------------------------------------------------

    return NextResponse.json({
      ...project,
      pdfContent: parsedData.text, // Полное содержимое текста из PDF
      summary: finalSummary, // Суммаризация текста
    });
  } catch (error) {
    console.error('Ошибка при чтении или анализе файла:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}