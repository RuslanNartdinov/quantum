'use client'
import React from 'react';
import styles from "./Column.module.scss"
import type { IWorkflowColumn } from '@/store/store';
import Task from './Task/Task';
const Column = (column : IWorkflowColumn) => {
	return (
		<div className={styles.column}>
			<div className={styles.columnTitle}>{column.title}</div>
			<div className={styles.columnContainer}>{column.items.map((item, index)=>(<Task key={index} taskData={item}/>))}</div>
		</div>
	);
};

export default Column;