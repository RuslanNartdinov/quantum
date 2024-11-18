import { create } from 'zustand';

interface AnimationControl {
	renderStart: boolean;
	startAnimation: () => void;
	stopAnimation: () => void;
}

export type projectStage = 'workflowRead' | 'workflowResearch' | 'workflowApproval';
export interface IWorkflowItem {
	stage: projectStage;
	id: number;
	name: string;
	description: string;
}

export interface IWorkflowColumn {
	title: string;
	items: IWorkflowItem[];
}

export interface IWorkflowContainer {
	workflowRead: IWorkflowColumn;
	workflowResearch: IWorkflowColumn;
	workflowApproval: IWorkflowColumn;
}

interface StoreState {
	animationControl: AnimationControl;
	workflow: IWorkflowContainer;
	setWorkflow: (newWorkflow: IWorkflowContainer) => void;
	deleteItemById: (id: number) => void;
	moveToNextStage: (id: number) => void;
	moveToPreviousStage: (id: number) => void;
	getStageById: (id: number) => projectStage | null;
}

const useStore = create<StoreState>((set) => ({
	animationControl: {
		renderStart: false,
		startAnimation: () => set((state) => ({ animationControl: { ...state.animationControl, renderStart: true } })),
		stopAnimation: () => set((state) => ({ animationControl: { ...state.animationControl, renderStart: false } })),
	},
	workflow: {
		workflowRead: {
			title: "Reading Stage",
			items: [
				{
					stage: 'workflowRead',
					id: 0,
					name: "Reconstruction of Mina Port Request",
					description: "Redesign and modernization of Mina Port infrastructure",
				},
				{
					stage: 'workflowRead',
					id: 2,
					name: "42 Abu Dhabi (School Opening)",
					description: "Peer-to-peer learning innovative coding school that can train more than 400 coders per year.",
				}
			],
		},
		workflowResearch: {
			title: "Research Stage",
			items: [
				{
					stage: 'workflowResearch',
					id: 1,
					name: "JetSki Transportation to Yas",
					description: "Proposing a new method of transporting residents to Yas Island that will be faster than other methods.",
				}
			],
		},
		workflowApproval: {
			title: "Approval Stage",
			items: [
				{
					stage: 'workflowApproval',
					id: 3,
					name: "Approval Needed",
					description: "Awaiting final decision",
				}
			],
		},
	},
	setWorkflow: (newWorkflow) => set(() => ({ workflow: newWorkflow })),
	deleteItemById: (id) =>
		set((state) => {
			const updatedWorkflow: IWorkflowContainer = {
				...state.workflow,
			};

			(Object.keys(updatedWorkflow) as (keyof IWorkflowContainer)[]).forEach((key) => {
				updatedWorkflow[key].items = updatedWorkflow[key].items.filter((item) => item.id !== id);
			});

			return { workflow: updatedWorkflow };
		}),
	moveToNextStage: (id: number) =>
		set((state) => {
			const updatedWorkflow: IWorkflowContainer = { ...state.workflow };
			const stages = ['workflowRead', 'workflowResearch', 'workflowApproval'] as const;

			for (let i = 0; i < stages.length; i++) {
				const currentStage = stages[i];
				const itemIndex = updatedWorkflow[currentStage].items.findIndex((item) => item.id === id);

				if (itemIndex !== -1) {
					const [item] = updatedWorkflow[currentStage].items.splice(itemIndex, 1);
					item.stage = stages[i + 1] as projectStage;
					if (i + 1 < stages.length) {
						updatedWorkflow[stages[i + 1]].items.push(item);
					}
					break;
				}
			}

			return { workflow: updatedWorkflow };
		}),
	moveToPreviousStage: (id: number) =>
		set((state) => {
			const updatedWorkflow: IWorkflowContainer = { ...state.workflow };
			const stages = ['workflowRead', 'workflowResearch', 'workflowApproval'] as const;

			for (let i = stages.length - 1; i >= 0; i--) {
				const currentStage = stages[i];
				const itemIndex = updatedWorkflow[currentStage].items.findIndex((item) => item.id === id);

				if (itemIndex !== -1) {
					const [item] = updatedWorkflow[currentStage].items.splice(itemIndex, 1);
					item.stage = stages[i - 1] as projectStage;
					if (i - 1 >= 0) {
						updatedWorkflow[stages[i - 1]].items.push(item);
					}
					break;
				}
			}

			return { workflow: updatedWorkflow };
		}),
	getStageById: (id: number): projectStage | null => {
		const { workflow } = useStore.getState();
		const stages: (keyof IWorkflowContainer)[] = ['workflowRead', 'workflowResearch', 'workflowApproval'];

		for (const stageKey of stages) {
			const column = workflow[stageKey];
			const foundItem = column.items.find((item) => item.id === id);

			if (foundItem) {
				return foundItem.stage;
			}
		}

		return null;
	},
}));

export default useStore;