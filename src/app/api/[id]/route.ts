// app/api/projects/[id]/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from "fs"
import pdf from "pdf-parse"

const projects = [
	{ id: '0', name: 'Проект 1', description: 'Описание проекта 1' },
	{ id: '1', name: 'Проект 2', description: 'Описание проекта 2' },
	{ id: '2', name: 'Проект 3', description: 'Описание проекта 3' },
];

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const { id } = params;

	const project = projects.find((p) => p.id === id);

	if (!project) {
		return NextResponse.json({ error: 'Проект не найден' }, { status: 404 });
	}

	return NextResponse.json(project);
}

// Import required module

// OpenAI API Configuration
const openai = new OpenAI({
	apiKey: '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', // Replace with your OpenAI API key
});

// Function to split text into chunks
function splitText(text: string, maxLength = 2000) {
	const sentences = text.split('. ');
	const chunks = [];
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

// Function to summarize text using OpenAI API
async function summarizeText(text: string) {
	try {
		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: `Summarize the following text:\n${text}` }],
			max_tokens: 150,
		});
		return response.choices[0].message.content?.trim();
	} catch (error) {
		console.error('Error during summarization:', error);
		return 'Error in summarization.';
	}
}

// Main function to process the PDF
async function processPdf(filePath: string) {
	try {
		const dataBuffer = fs.readFileSync(filePath);
		const pdfData = await pdf(dataBuffer);

		console.log('Extracting text from PDF...');
		const textChunks = splitText(pdfData.text);

		console.log(`Text split into ${textChunks.length} chunks. Summarizing...`);
		let fullSummary = '';

		for (const chunk of textChunks) {
			const summary = await summarizeText(chunk);
			fullSummary += summary + '\n';
		}

		console.log('Final Summary:');
		console.log(fullSummary);
	} catch (error) {
		console.error('Error processing PDF:', error);
	}
}

// Run the script with the PDF file path as an argument
const filePath = process.argv[2];
if (!filePath) {
	console.error('Please provide a PDF file path.');
	process.exit(1);
}

