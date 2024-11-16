'use client'
import React from 'react';
import "./BlockBlurAnimationLayout.scss"
import useStore from '@/store/store';

interface IBlockBlurAnimationLayout{
	children: React.ReactNode
}

const BlockBlurAnimationLayout: React.FC<IBlockBlurAnimationLayout> = ({children}) => {
	const blockRef = React.useRef<HTMLDivElement | null>(null);
	const store = useStore();

	React.useEffect(() => {
		if (store.animationControl.renderStart) {
			blockRef.current?.classList.add('inactive-blur-custom');
		}
	}, [store.animationControl.renderStart]);

	React.useEffect(() => {
		blockRef.current?.classList.remove('inactive-blur-custom');
	}, []);
	return (
		<div ref={blockRef} className='block-layout-blur-custom inactive-blur-custom'>
			{children}
		</div>
	);
};

export default BlockBlurAnimationLayout;