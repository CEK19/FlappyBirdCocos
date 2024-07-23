import { _decorator, Component, director, Input, input } from "cc";
const { ccclass, property } = _decorator;

@ccclass("GameOverScence")
export class GameOverScence extends Component {
	start() {
		input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
	}

	private onMouseDown() {
		director.loadScene("start");
	}
}
