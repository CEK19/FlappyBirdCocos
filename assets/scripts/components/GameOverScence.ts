import { _decorator, Component, director, Input, input } from "cc";
const { ccclass, property } = _decorator;

@ccclass("GameOverScence")
export class GameOverScence extends Component {
	start() {
		input.on(Input.EventType.TOUCH_START, this.onTouch, this);
	}

	private onTouch() {
		director.loadScene("start");
	}
}
