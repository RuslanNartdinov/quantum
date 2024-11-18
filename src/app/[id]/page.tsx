'use client';
import React, { useEffect, useState } from 'react';
import ReadingStage from './ReadingStage/ReadingStage';
import { Spin } from 'antd';

export interface Project {
	id: string;
	name: string;
	description: string;
	pdfContent?: string;
	summary?: string;
}

interface PageProps {
	params: {
		id: string;
	};
}

const ProjectPage: React.FC<PageProps> = ({ params }) => {
	const [project, setProject] = useState<Project | null>(null);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		const fetchProject = async () => {
			try {
				const response = await fetch(`/api/${params.id}`);
				if (!response.ok) {
					throw new Error('Incorrect path');
				}
				const data = await response.json();
				setProject(data);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('unknown error');
				}
			}
		};

		fetchProject();
	}, [params.id]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!project) {
		return <div className='h-full w-full flex items-center justify-center'><Spin size='large'/></div>;
	}
	return (
		<ReadingStage project={project} id={params.id}/>
	);
};

export default ProjectPage;