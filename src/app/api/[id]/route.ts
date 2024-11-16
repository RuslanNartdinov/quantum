import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

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
    console.log('Файл прочитан успешно.');

    return NextResponse.json({
      ...project,
      pdfContent: fileBuffer.toString('base64'), // Отправляем содержимое файла в Base64
    });
  } catch (error) {
    console.error('Ошибка при чтении файла:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}