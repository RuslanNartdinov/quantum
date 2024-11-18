'use client'
import React from 'react';
import NewsPageBlock from '@/components/NewsPageBlock/NewsPageBlock';
import BlockBlurAnimationLayout from '@/layouts/BlockBlurAnimationLayout/BlockBlurAnimationLayout';
import "./styles.scss"
import { useRouter } from 'next/navigation';
import useStore from '@/store/store';

const Page = () => {
	const router = useRouter();
	const store = useStore();
	return (
		<BlockBlurAnimationLayout>
			<div className="news flex items-center justify-center flex-col">
				<div className="search-container">
					<svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24"><path fill="currentColor" d="M10 4a6 6 0 1 0 0 12a6 6 0 0 0 0-12m-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10" /></svg>
					<input className='ml-3' type="text" />
					<button className="keywords">Technology</button>
					<button className="keywords">Finance</button>
					<button className="keywords">Sports</button>
				</div>
				<div className='news-page p-4 flex items-center justify-center flex-wrap'>
					<div onClick={()=>{
						setTimeout(()=>{

							router.push('/news/finances');
							store.animationControl.startAnimation();
						},300)
					}} className="">
						<NewsPageBlock title='Finances'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 50 50"><path fill="currentColor" d="M43 12H0v26h50V12zm5 19.271A6.7 6.7 0 0 0 43.271 36H6.729A6.7 6.7 0 0 0 2 31.271V18.729A6.7 6.7 0 0 0 6.729 14h36.565A7 7 0 0 0 48 18.706zm-20.884-4.216c-.23-.14-.116-.269-1.116-.388v2.897l.548-.102q1.113-.391 1.114-1.451c0-.409-.183-.731-.546-.956m-4.501-4.727q0 .669.607 1q.234.131.777.289v-2.741a2.4 2.4 0 0 0-.769.315q-.615.409-.615 1.137M25 15c-4.971 0-9 4.478-9 10c0 5.521 4.029 10 9 10s9-4.479 9-10c0-5.522-4.029-10-9-10m3.854 15.654c-.679.58-1.854.935-2.854 1.069V33h-2v-1.3c-1.044-.142-1.909-.3-2.588-.835A3.72 3.72 0 0 1 20 28h2.488c.081 0 .239.801.475 1.084c.245.291.593.325 1.037.448v-3.405c-1.217-.281-2.065-.584-2.536-.91q-1.261-.863-1.261-2.7q0-1.675 1.234-2.784q.943-.846 2.563-1.046V17h2v1.74c1 .149 1.676.613 2.3 1.076c.939.697 1.6 1.184 1.645 3.184h-2.506c-.047-1-.549-1.432-1.172-1.748a2 2 0 0 1-.267-.207v3.143l.902.174c.959.226 1.846.528 2.324.905c.744.588 1.032 1.437 1.032 2.547c.002 1.14-.524 2.086-1.404 2.84" /></svg></NewsPageBlock>
					</div>
					<NewsPageBlock title='Education'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="m368 350.643l-112 63l-112-63v-66.562l-32-17.778v103.054l144 81l144-81V266.303l-32 17.778z" /><path fill="currentColor" d="M256 45.977L32 162.125v27.734L256 314.3l192-106.663V296h32V162.125Zm160 142.831l-32 17.777L256 277.7l-128-71.115l-32-17.777l-22.179-12.322L256 82.023l182.179 94.463Z" /></svg></NewsPageBlock>
					<NewsPageBlock title='Healthcare'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M8.962 18.469C6.019 16.214 2 12.489 2 8.967C2 3.083 7.5.886 12 5.43C16.5.886 22 3.083 22 8.967c0 3.522-4.02 7.247-6.962 9.502C13.706 19.489 13.04 20 12 20s-1.706-.51-3.038-1.531M16.5 6.25a.75.75 0 0 1 .75.75v1.25h1.25a.75.75 0 0 1 0 1.5h-1.25V11a.75.75 0 0 1-1.5 0V9.75H14.5a.75.75 0 0 1 0-1.5h1.25V7a.75.75 0 0 1 .75-.75" clip-rule="evenodd" /></svg></NewsPageBlock>
					<NewsPageBlock title='Sustainability'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M21.57 27.75A12.9 12.9 0 0 1 16 29C8.832 29 3 23.168 3 16c0-3.075 1.057-5.979 3-8.308V10h2V4H2v2h2.842A14.86 14.86 0 0 0 1 16c0 8.271 6.729 15 15 15a14.9 14.9 0 0 0 6.43-1.444z" /><path fill="currentColor" d="M21 9c-3.16 0-5.751 2.457-5.978 5.56A5.97 5.97 0 0 0 11 13H7v4c0 3.309 2.692 6 6 6h2v4h2v-8h2c3.308 0 6-2.691 6-6V9zm-8 12c-2.206 0-4-1.794-4-4v-2h2c2.206 0 4 1.794 4 4v.586l-2.293-2.293l-1.414 1.414L13.586 21zm10-8c0 2.206-1.794 4-4 4h-.586l2.293-2.293l-1.414-1.414L17 15.586V15c0-2.206 1.794-4 4-4h2z" /><path fill="currentColor" d="M31 16c0-8.271-6.729-15-15-15a14.9 14.9 0 0 0-6.43 1.444l.86 1.806A12.9 12.9 0 0 1 16 3c7.168 0 13 5.832 13 13c0 3.075-1.057 5.979-3 8.308V22h-2v6h6v-2h-2.842A14.86 14.86 0 0 0 31 16" /></svg></NewsPageBlock>
					<NewsPageBlock title='Technology'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" fill-rule="evenodd" d="M384 128v256H128V128zm-148.25 64h-24.932l-47.334 128h22.493l8.936-25.023h56.662L260.32 320h23.847zm88.344 0h-22.402v128h22.402zm-101 21.475l22.315 63.858h-44.274zM405.335 320H448v42.667h-42.667zm-256 85.333H192V448h-42.667zm85.333 0h42.666V448h-42.666zM149.333 64H192v42.667h-42.667zM320 405.333h42.667V448H320zM234.667 64h42.666v42.667h-42.666zM320 64h42.667v42.667H320zm85.333 170.667H448v42.666h-42.667zM64 320h42.667v42.667H64zm341.333-170.667H448V192h-42.667zM64 234.667h42.667v42.666H64zm0-85.334h42.667V192H64z" /></svg></NewsPageBlock>
					<NewsPageBlock title='Human Rights'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><circle cx="10" cy="5.5" r="4.5" fill="currentColor" /><path fill="currentColor" d="M20 16.288v-1.632l-1.012-.168c-.055-.22-.164-.437-.324-.76l-.014-.028l.619-.844l-1.181-1.18l-.844.618a3 3 0 0 0-.788-.338l-.112-1.012h-1.632l-.141.851l-.027.161c-.282.056-.507.17-.788.338l-.844-.619l-1.18 1.181l.562.844c-.106.176-.168.33-.227.49l-.025.07l-.01.027q-.035.096-.076.2L11 14.6v1.631l1.012.17c.057.28.17.505.338.786l-.563.844l.969.969l.213.213l.32-.213l.524-.35c.199.1.443.2.691.3l.05.02l.046.018l.002.012l.167 1h1.687l.167-1l.002-.012c.281-.057.506-.17.787-.338l.477.35l.367.27l1.182-1.182l-.62-.844c.17-.28.282-.563.338-.788Zm-4.5.843a1.66 1.66 0 0 1-1.688-1.687c0-.956.732-1.688 1.688-1.688s1.688.732 1.688 1.688s-.732 1.687-1.688 1.687M10 11c.739 0 1.418.047 2.04.133l-1.594 1.596l.574.862l-1.02.12v3.367l1.098.183l-.598.897l.842.842H2v-3c0-2 2.083-5 8-5" /></svg></NewsPageBlock>
					<NewsPageBlock title='Peace & Security'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="m14 32l-.36-.14A21.07 21.07 0 0 1 0 12.07V5.44L14 .06l14 5.38v6.63a21.07 21.07 0 0 1-13.64 19.78zM2 6.82v5.25a19.08 19.08 0 0 0 12 17.77a19.08 19.08 0 0 0 12-17.77V6.82L14 2.2z" /><path fill="currentColor" d="M9 17.83h2V23H9zm2-7.65V7H9v3.18a3 3 0 1 0 2 0M10 14a1 1 0 1 1 0-2a1 1 0 0 1 0 2m7-7h2v5.17h-2zm4 10a3 3 0 1 0-4 2.82V23h2v-3.18A3 3 0 0 0 21 17m-3 1a1 1 0 1 1 0-2a1 1 0 0 1 0 2" /></svg></NewsPageBlock>
					<NewsPageBlock title='Sports'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M2.34 14.63c.6-.22 1.22-.33 1.88-.33q2.01 0 3.51 1.26L4.59 18.7a10.6 10.6 0 0 1-2.25-4.07M15.56 9.8c1.97 1.47 4.1 1.83 6.38 1.08c.03.21.06.59.06 1.12c0 1.03-.25 2.18-.72 3.45c-.47 1.26-1.05 2.28-1.73 3.05l-6.33-6.31zm-6.79 6.84c1.06 1.53 1.28 3.2.65 5.02c-1.42-.41-2.69-1.05-3.75-1.93zm3.42-3.42l6.31 6.33c-2.17 1.9-4.72 2.7-7.62 2.39c.21-.66.32-1.38.32-2.16c0-.62-.14-1.35-.42-2.18s-.61-1.51-.98-2.04zM8.81 14.5a6.7 6.7 0 0 0-3.23-1.59c-1.22-.23-2.39-.16-3.52.22c-.03-.22-.06-.6-.06-1.13c0-1.03.25-2.18.72-3.45c.47-1.26 1.05-2.28 1.73-3.05l6.66 6.69zm6.75-6.77c-1.34-1.65-1.65-3.45-.93-5.39c.62.16 1.33.46 2.13.92c.79.45 1.44.9 1.94 1.33zm6.1 1.65c-.6.21-1.22.32-1.88.32c-1.09 0-2.14-.32-3.14-.98l3.09-3.05c.88 1.1 1.52 2.33 1.93 3.71m-9.47 1.73L5.5 4.45c2.17-1.9 4.72-2.7 7.63-2.39q-.33.99-.33 2.16c0 .72.16 1.53.49 2.44c.33.9.71 1.62 1.21 2.15z" /></svg></NewsPageBlock>
					<NewsPageBlock title='Justice & crime'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M.5 13.29H8m-1 0v-2.5H1.5v2.5M7.787 1.002L4.202 4.587a1 1 0 0 0 0 1.414l1.584 1.584a1 1 0 0 0 1.414 0L10.785 4a1 1 0 0 0 0-1.414L9.2 1.002a1 1 0 0 0-1.414 0ZM9 5.79l4.5 4.5" /></svg></NewsPageBlock>
				</div>
			</div>
		</BlockBlurAnimationLayout>
	);
};

export default Page;