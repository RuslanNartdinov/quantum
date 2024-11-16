import { create } from 'zustand';
interface AnimationControl {
	renderStart: boolean;
	startAnimation: () => void;
	stopAnimation: () => void;
}

export interface IWorkflowItem {
	id: number,
	name: string;
	description: string;
}

export interface IWorkflowContainer {
	title: string;
	items: IWorkflowItem[];
}

interface StoreState {
	animationControl: AnimationControl;
	workflow: IWorkflowContainer[];
}

const useStore = create<StoreState>((set) => ({
	animationControl: {
		renderStart: false,
		startAnimation: () => set((state) => ({ animationControl: { ...state.animationControl, renderStart: true } })),
		stopAnimation: () => set((state) => ({ animationControl: { ...state.animationControl, renderStart: false } })),
	},
	workflow: [
		{
			title: "Reading Stage",
			items: [
				{
					id: 0,
					name: "Reconstruction of Mina Port Request",
					description: "Redesign and modernization of Mina Port infrastructure",
				},
				{
					id: 1,
					name: "42 Abu Dhabi (School Opening)",
					description: "Peer-to-peer learning innovative coding school that can train more than 400 coders per year.",
				}
			]
		},
		{
			title: "Research Stage",
			items: [
				{
					id: 2,
					name: "JetSki Transportation to Yas",
					description: "Proposing a new method of transporting residents to Yas Island that will be faster than other methods.",
				}
			]
		},
		{
			title: "Approval Stage",
			items: [
				{
					id: 3,
					name: "",
					description: "",
				}
			]
		},
	]
}));

export default useStore;