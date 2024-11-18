import React from 'react';
import "./NewsPageBlock.scss"

interface INewsPageBlock{
	title: string;
	children: string | React.ReactNode;
}

const NewsPageBlock:React.FC<INewsPageBlock> = ({title, children}) => {
	return (
		<div className='news-page-block'>
			<div className="block-title">{title}</div>
			<div className="block-icon">{children}</div>
		</div>
	);
};

export default NewsPageBlock;