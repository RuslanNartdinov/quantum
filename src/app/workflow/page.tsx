'use client'
import Column from '@/components/Column/Column';
import useStore from '@/store/store';
import React from 'react';
import styles from './styles.module.scss'
import BlockBlurAnimationLayout from '@/layouts/BlockBlurAnimationLayout/BlockBlurAnimationLayout';

const Workflow = () => {
	const store = useStore()
	const workflow = store.workflow;
	return (
		<BlockBlurAnimationLayout>
			<div className={styles.workflowColumnsContainer}>
				<Column title={workflow.workflowRead.title} items={workflow.workflowRead.items} />
				<Column title={workflow.workflowResearch.title} items={workflow.workflowResearch.items} />
				<Column title={workflow.workflowApproval.title} items={workflow.workflowApproval.items} />
			</div>
		</BlockBlurAnimationLayout>
	);
};

export default Workflow;