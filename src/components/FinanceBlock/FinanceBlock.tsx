import React from 'react';
import "./FinanceBlock.scss"

interface IFinanceBlock {
	title: string;
	children: React.ReactNode | string;
	icons?: React.ReactNode[];
}

const FinanceBlock: React.FC<IFinanceBlock> = ({title, children, icons}) => {
	return (
		<div className='finance-block'>
			<div className="finance-title">{title}</div>
			<div className="finance-text">{children}</div>
			<div className="finance-watched">
				{icons ? 'Seen by: ' : ''}
				{icons}
			</div>
		</div>
	);
};

export default FinanceBlock;