'use client'

import React from 'react';
import "./NavigationButton.scss"
import { usePathname } from 'next/navigation'
import useStore from '@/store/store';
import { useRouter } from 'next/navigation';
interface INavigationButton {
	children: React.ReactNode | string
	to: string
}

const NavigationButton: React.FC<INavigationButton> = ({ children, to }) => {
	const pathname = usePathname();
	const isActive = pathname === to;
	const router = useRouter();
	const store = useStore();

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		if (!isActive) {
			store.animationControl.startAnimation();

			setTimeout(() => {
				router.push(to);
				store.animationControl.stopAnimation();
			}, 310);
		}
	};


	return (
		<button onClick={handleClick} className={`navigation-button ${isActive ? 'active-nav-button' : ''}`}>
			{children}
		</button>
	);
};

export default NavigationButton;