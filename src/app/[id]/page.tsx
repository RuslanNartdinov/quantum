'use client';
import React, { useEffect, useState } from 'react';
//import useStore from '@/store/store';
import ReadingStage from './ReadingStage/ReadingStage';
//import ResearchingStage from './ResearchingStage/ResearchingStage';
import { Spin } from 'antd';

export interface Project {
	id: string;
	name: string;
	description: string;
	pdfContent?: string; // Добавлено для содержимого PDF
	summary?: string; // Добавлено для содержимого PDF
}

interface PageProps {
	params: {
		id: string;
	};
}

const ProjectPage: React.FC<PageProps> = ({ params }) => {
	const [project, setProject] = useState<Project | null>(null);
	const [error, setError] = useState<string | null>(null);
	//const store = useStore();
	useEffect(() => {
		const fetchProject = async () => {
			try {
				const response = await fetch(`/api/${params.id}`);
				if (!response.ok) {
					throw new Error('Проект не найден');
				}
				const data = await response.json();
				setProject(data);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('Произошла неизвестная ошибка');
				}
			}
		};

		fetchProject();
	}, [params.id]);

	if (error) {
		return <div>Ошибка: {error}</div>;
	}

	if (!project) {
		return <div className='h-full w-full flex items-center justify-center'><Spin size='large'/></div>;
	}
	//if(store.getStageById(Number(params.id)) === 'workflowRead')
	//	return (<ReadingStage project={project} id={params.id}/>)
	//else if(store.getStageById(Number(params.id)) === 'workflowResearch')
	//	return (<ResearchingStage project={project} id={params.id}/>)
	return (
		<ReadingStage project={project} id={params.id}/>
	);
};

export default ProjectPage;