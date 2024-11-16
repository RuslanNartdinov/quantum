'use client'
import Column from '@/components/Column/Column';
import useStore from '@/store/store';
import React from 'react';
import styles from './styles.module.scss'
import BlockBlurAnimationLayout from '@/layouts/BlockBlurAnimationLayout/BlockBlurAnimationLayout';

const Workflow = () => {
	const store = useStore()
	return (
		<BlockBlurAnimationLayout>
		<div className={styles.workflowColumnsContainer}>
			{
				store.workflow.map((item, index)=>(<Column key={index} title={item.title} items={item.items}/>))
			}
		</div>
		</BlockBlurAnimationLayout>
	);
};

export default Workflow;