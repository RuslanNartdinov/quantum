'use client'
import React from 'react';
import "./Navigation.scss"
import NavigationButton from './NavigationButton/NavigationButton';

const Navigation = () => {
	return (
		<div className='navigation'>
			<div className="navigation-container">
				<NavigationButton to='/'>Home</NavigationButton>
				<NavigationButton to='/workflow'>Workflow</NavigationButton>
				<NavigationButton to='/news'>News</NavigationButton>
			</div>
		</div>
	);
};

export default Navigation;