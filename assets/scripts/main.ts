import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("main")
export class main extends Component {
	protected onLoad(): void {
		console.log("Main.ts loaded");
		this.initializeServices();
		this.loadConfigurations();
		this.startGame();
	}

	private initializeServices(): void {
		console.log("Initializing services");
	}

	private loadConfigurations(): void {
		console.log("Loading configurations");
	}

	private startGame(): void {
		console.log("Starting game");
	}
}
