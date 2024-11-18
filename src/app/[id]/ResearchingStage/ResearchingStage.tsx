import React from 'react';
import styles from './styles.module.scss'
import type { Project } from '../page';
import TextAI from './TextAI/TextAI';
import TextParsed from './TextParsed/TextParsed';

interface IResearchingStage {
	project: Project;
	id: string;
}

const ResearchingStage:React.FC<IResearchingStage> = ({project, id}) => {
	return (
		<div>
			ResearchingStage
		</div>
	);
};

export default ResearchingStage;