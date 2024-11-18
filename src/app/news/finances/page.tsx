'use client'
import React from 'react';
import BlockBlurAnimationLayout from '@/layouts/BlockBlurAnimationLayout/BlockBlurAnimationLayout';
import FinanceBlock from '@/components/FinanceBlock/FinanceBlock';
import "./styles.scss"
import { Spin } from 'antd';

const text = `1. COP29 Update:
• G20 discussions may boost climate finance contributions from affluent developing nations.
• Emissions talks face delays, with disputes over stricter fossil fuel targets. COP29 President aims to keep negotiations on track.
2. Green Finance in Real Estate:
• Real estate needs $2 trillion for green retrofits but struggles with low uptake of sustainable debt.
• Public-private initiatives and better ESG metrics are crucial to bridge this gap.
3. Upsurge Finance Q2 Results:
• Net sales grew 137%, with profits up over 200%.
• Strong performance signals positive outlook and boosts investor confidence.`

const Page = () => {
	const [showText, setShowText] = React.useState<boolean>(false);

	React.useEffect(() => {
		const timer = setTimeout(() => {
			setShowText(true);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<BlockBlurAnimationLayout>
			<div className="container flex items-center justify-center">
				<div className="suggestions flex flex-col items-center justify-start">
					<a
						target="_blank"
						href="https://www.climatechangenews.com/2024/11/18/cop29-g20-finance-breakthrough-emissions-mitigation-talks-collapse/"
					>
						<FinanceBlock title="COP29 Finance and Mitigation Talks">
							G20 may boost climate finance; emissions talks face delays due to disputes over stricter targets.
						</FinanceBlock>
					</a>
					<FinanceBlock
						icons={[
							<div key={0} className="watched" style={{ backgroundColor: '#faaaa7' }}>
								R
							</div>,
							<div style={{ backgroundColor: '#a0d5ab' }} key={2} className="watched">
								K
							</div>,
						]}
						title="Real Estate Green Finance Insights Finance"
					>
						$2 trillion needed for real estate retrofits; better ESG measures and funding required.
					</FinanceBlock>
					<FinanceBlock title="Upsurge Investment & Finance Q2 Report">
						Net sales up 137%, profits more than doubled, signaling strong growth.
					</FinanceBlock>
					<FinanceBlock
						icons={[
							<div key={0} style={{ backgroundColor: '#a0d5ab' }} className="watched">
								K
							</div>,
							<div style={{ backgroundColor: '#b6eaff' }} key={2} className="watched">
								S
							</div>,
						]}
						title="Global Banking Annual Review 2024"
					>
						The past two years have been the best for banking since before the global financial crisis (GFC) of 2007–09,
						with healthy profitability, capital, and liquidity.
					</FinanceBlock>
				</div>
				<div className="ai">
					<div className="ai_title">Summary by AI</div>
					<div className="ai_text whitespace-pre-wrap">
						{showText ? (
							text
						) : (
							<Spin size="large" tip="Loading AI Summary..." />
						)}
					</div>
					<div className="ai_input">
						<input type="text" placeholder="Ask me..." />
						<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
							<path fill="black" d="m2 21l21-9L2 3v7l15 2l-15 2z" />
						</svg>
					</div>
				</div>
			</div>
		</BlockBlurAnimationLayout>
	);
};

export default Page;