import { _decorator, Component, director } from "cc";

const { ccclass, property } = _decorator;

@ccclass("PauseManager")
export class PauseManager extends Component {
	onLoad() {}

	pauseGame() {
		director.pause();
	}

	resumeGame() {
		director.resume();
	}
}
