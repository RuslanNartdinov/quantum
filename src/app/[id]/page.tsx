'use client';
import React, { useEffect, useState } from 'react';
import styles from "./styles.module.scss";
import BlockBlurAnimationLayout from '@/layouts/BlockBlurAnimationLayout/BlockBlurAnimationLayout';

interface Project {
	id: string;
	name: string;
	description: string;
	pdfContent?: string; // Добавлено для содержимого PDF
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
		return <div>Загрузка...</div>;
	}

	return (
		<BlockBlurAnimationLayout>
			<div className={styles.projectPage}>
				<h1 className={styles.projectTitle}>{project.name}</h1>
				<div className={styles.projectContainer}>
					<div className={styles.projectDescription}>{project.description}</div>
					<div className={styles.artificalInt}>{project.pdfContent}</div>
				</div>
			</div>
		</BlockBlurAnimationLayout>
	);
};

export default ProjectPage;