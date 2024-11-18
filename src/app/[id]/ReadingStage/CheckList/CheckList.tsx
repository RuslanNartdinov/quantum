'use client';

import React from 'react';
import styles from "./styles.module.scss";
import useStore from '@/store/store';
import { IStatements, emtyStatements } from '@/store/store';
import { Popover } from 'antd';

const CheckList = ({ id }: { id: number }) => {
	const [statements, setStatements] = React.useState<IStatements>(emtyStatements);
	const store = useStore();
	const [popoverOpen, setPopoverOpen] = React.useState<boolean>(false);

	const handleCheckboxChange = (questionKey: keyof IStatements) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setStatements((prev) => ({
			...prev,
			[questionKey]: {
				...prev[questionKey],
				success: e.target.checked,
			},
		}));
	};

	const handleTextareaChange = (questionKey: keyof IStatements) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setStatements((prev) => ({
			...prev,
			[questionKey]: {
				...prev[questionKey],
				commentary: e.target.value,
			},
		}));
	};

	const handleCommitCommentary = () => {
		if (store.getElementById(id) != null) {
			store.updateStatementsById(id, statements);
		}
		setPopoverOpen(true);
		console.log(store.workflow.workflowRead.items)
		setTimeout(() => {
			setPopoverOpen(false);
		}, 2500)
	};
	React.useEffect(() => {
		const item = store.getElementById(id);
		if (item && item.statements) {
			setStatements(item.statements);
		}
	}, [id, store]);

	return (
		<div className={styles.checkList}>
			<div className={styles.notes}>
				<ul>
					<li>
						<div className={styles.question}>
							<div className={styles.questionText}>

								<input
									type="checkbox"
									onChange={handleCheckboxChange('questionOne')}
									checked={statements.questionOne.success}
								/>
								<span>
									Do other developed or emerging countries have similar projects implemented?
								</span>
							</div>
							<textarea
								onChange={handleTextareaChange('questionOne')}
								value={statements.questionOne.commentary}
							/>
						</div>
					</li>
					<li>
						<div className={styles.question}>
							<div className={styles.questionText}>
								<input
									type="checkbox"
									onChange={handleCheckboxChange('questionTwo')}
									checked={statements.questionTwo.success}
								/>
								<span>
									Are there similar projects already implemented in our country? What are the outcomes, successes, or gaps in those existing initiatives?
								</span>
							</div>

							<textarea
								onChange={handleTextareaChange('questionTwo')}
								value={statements.questionTwo.commentary}
							/>
						</div>
					</li>
					<li>
						<div className={styles.question}>
							<div className={styles.questionText}>
								<input
									type="checkbox"
									onChange={handleCheckboxChange('questionThree')}
									checked={statements.questionThree.success}
								/>
								<span>
									Does this project align with the country’s strategic goals, such as Vision 2030 or digital transformation plans?
								</span>
							</div>

							<textarea
								onChange={handleTextareaChange('questionThree')}
								value={statements.questionThree.commentary}
							/>
						</div>
					</li>
				</ul>
				<Popover
					content={<span>Your changes was saved!</span>}
					trigger="click"
					open={popoverOpen}
				>

					<button onClick={handleCommitCommentary}>Save Changes</button>
				</Popover>
			</div>
		</div>
	);
};

export default CheckList;