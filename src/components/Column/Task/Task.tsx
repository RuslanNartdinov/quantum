'use client'
import React from 'react';
import styles from "./Task.module.scss"
import type { IWorkflowItem } from '@/store/store';
import { useRouter } from 'next/navigation';
import useStore from '@/store/store';

interface ITask{
	taskData: IWorkflowItem; 
}

const Task : React.FC<ITask> = ({taskData}) => {
	const router = useRouter();
	const store = useStore();

	const handleClick = () => {
		store.animationControl.startAnimation();

		setTimeout(() => {
			router.push(`/${taskData.id}`);
			store.animationControl.stopAnimation();
		}, 310);
	};
  
	return (
		<div className={styles.task} onClick={handleClick}>
			<div className={styles.taskName}>{taskData.name}</div>
			<div className={styles.taskDescription}>{taskData.description}</div>
		</div>
	);
};

export default Task;