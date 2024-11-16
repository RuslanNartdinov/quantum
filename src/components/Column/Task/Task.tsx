import React from 'react';
import styles from "./Task.module.scss"
import type { IWorkflowItem } from '@/store/store';

interface ITask{
	taskData: IWorkflowItem; 
}

const Task : React.FC<ITask> = ({taskData}) => {
	return (
		<div className={styles.task}>
			<div className={styles.taskName}>{taskData.name}</div>
			<div className={styles.taskDescription}>{taskData.description}</div>
		</div>
	);
};

export default Task;