import React from 'react';
import BlockBlurAnimationLayout from '@/layouts/BlockBlurAnimationLayout/BlockBlurAnimationLayout';
import styles from "./styles.module.scss"
import type { Project } from '../page';
import useStore from '@/store/store';
import { useRouter } from 'next/navigation';

interface IReadingStage{
	project: Project;
	id: string;
}

const ReadingStage:React.FC<IReadingStage> = ({project, id}) => {
	const store = useStore();
	const router = useRouter();
	const handleSubmit = () =>{
		store.moveToNextStage(Number(id));
		router.push('/workflow');
	}
	const handleDelete = () =>{
		store.deleteItemById(Number(id));
		router.push('/workflow');
	}
	return (
		<BlockBlurAnimationLayout>
		<div className={styles.projectPage}>
			<h1 className={styles.projectTitle}>{project.name}</h1>
			<div className={styles.projectContainer}>
				<div className={styles.projectDescription}>{project.pdfContent}</div>
				<div className={styles.artificalIntContainer}>
					<div className={styles.artificalIntText}>
					{project.summary}
					</div>
					<div className={styles.artificalIntControl}>
						<button onClick={handleSubmit} className={styles.intControlSubmit}>Submit</button>
						<button className={styles.intControlRegenerate}>Regenerate</button>
						<button onClick={handleDelete} className={styles.intControlDecline}>Delete</button>
					</div>
				</div>
			</div>
		</div>
	</BlockBlurAnimationLayout>
	);
};

export default ReadingStage;