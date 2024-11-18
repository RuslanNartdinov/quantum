import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import pdf from 'pdf-parse';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || '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',
});

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

async function summarizeText(text: string): Promise<string> {
	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [{ role: 'user', content: `Summarize the following text:\n${text}` }],
		max_tokens: 150,
	});

	return response.choices?.[0]?.message?.content?.trim() ?? 'No summary available';
}

const projects = [
	{ id: '1', name: "Reconstruction of Mina Port Request", description: '' },
	{ id: '2', name: "42 Abu Dhabi (School Opening)", description: '' },
	{ id: '3', name: "JetSki Transportation to Yas", description: '' },
];

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const project = projects.find((p) => p.id === id);

	if (!project) {
		return NextResponse.json({ error: 'Project not found' }, { status: 404 });
	}

	const pdfPath = path.join(process.cwd(), 'public', 'pdfs', `${id}.pdf`);
	const fileExists = await fs.access(pdfPath).then(() => true).catch(() => false);

	if (!fileExists) {
		return NextResponse.json({ error: 'no flag' }, { status: 404 });
	}

	try {
		const fileBuffer = await fs.readFile(pdfPath);
		const parsedData = await pdf(fileBuffer);
		const textChunks = splitText(parsedData.text);
		
		//------------------------------------------------------AI
		const summaries: string[] = [];
		for (const chunk of textChunks) {
			const summary = await summarizeText(chunk);
			summaries.push(summary);
		}

		const finalSummary = summaries.join('\n\n');
		//------------------------------------------------------AI
		//------------------------------------------------------NOAI
		//const finalSummary="This document contains exercises from Module 00 of C++ modules. It covers topics such as namespaces, classes, member functions, stdio streams, initialization lists, static, const, and other basic concepts. The goal of the modules is to introduce Object-Oriented Programming in C++. The exercises will increase in complexity, and code should comply with the C++98 standard. It is recommended to explore modern C++ further after completing these exercises. Additionally, general rules such as compiling with specific flags and following naming conventions are provided. The text provides guidelines and restrictions for coding in C++ modules. It emphasizes the use of standard library functions over C functions, prohibits the use of external libraries such as Boost, and lists forbidden functions. It also mentions that namespaces and friend keywords are forbidden, except when explicitly allowed. Additionally, it states that memory leakage can occur in C++. The text outlines rules for memory allocation, class design, function implementation, header file usage, and file organization in coding exercises. It also encourages reading instructions thoroughly, using additional files if necessary, and avoiding laziness. The text emphasizes following guidelines and theoretical concepts while implementing classes and scripts for coding exercises, such as the Megaphone exercise. The text describes a programming exercise to create a phonebook software in C++. The program must have two classes: PhoneBook and Contact, with specific functionalities. The phonebook can store up to 8 contacts, replacing the oldest one if a new contact is added. The user can input information for a new contact using the ADD command, with fields for first name, last name, nickname, phone number, and darkest secret. The program only accepts commands ADD, SEARCH, and EXIT. The text provides guidelines for creating a program that manages contacts, with commands such as SEARCH and EXIT. Contact information is displayed in a specific format, and the program waits for more input until the user enters EXIT. The program must be named appropriately. The second part of the text sets the scene for an exercise in which the protagonist must recreate a lost file at their new job at a bank. Despite challenges, they decide to stay and tackle the task at hand. The text describes a scenario where a developer is given files to work on, and they successfully recreate the missing file Account.cpp by using the provided Account.hpp header file and a log file for reference. The developer successfully passes tests and impresses their colleagues with their C++ skills. The text also mentions that the order of destructors being called may vary depending on the compiler/operating system. Lastly, it instructs on how to submit the assignment for evaluation."
		//------------------------------------------------------NOAI



		return NextResponse.json({
			...project,
			pdfContent: parsedData.text,
			summary: finalSummary,
		});
	} catch (error) {
		return NextResponse.json({ error: 'Server error' }, { status: 500 });
	}
}