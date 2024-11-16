// app/api/projects/[id]/route.ts
import { NextResponse } from 'next/server';

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