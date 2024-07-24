import { _decorator, Component, director, find, Label } from "cc";
import { PauseManager } from "./PauseManager";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
	private static _instance: GameManager;
	public pauseManager: PauseManager = null!;

	public score: number = 0;

	static get instance() {
		return this._instance;
	}

	protected onLoad(): void {
		GameManager._instance = this;
		director.addPersistRootNode(this.node);
	}

	protected start(): void {
		this.score = 0;
	}

	addScore(points: number) {
		this.score += points;
	}

	playGame() {
		this.score = 0;
		director.loadScene("play");
	}

	pauseGame() {
		if (!this.pauseManager) {
			this.findPauseManager();
		}
		if (this.pauseManager) {
			this.pauseManager.pauseGame();
		}
	}

	resumeGame() {
		if (!this.pauseManager) {
			this.findPauseManager();
		}

		if (this.pauseManager) {
			this.pauseManager.resumeGame();
		}
	}

	endGame() {
		this.scheduleOnce(() => {
			director.loadScene("end");
		}, 1);
	}

	private findPauseManager() {
		if (!this.pauseManager) {
			const scence = director.getScene();
			this.pauseManager = scence.getComponentInChildren(PauseManager)!;
		}
	}
}
