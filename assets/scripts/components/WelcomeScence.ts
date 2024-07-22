import { _decorator, Component, director, EventMouse, Input, input } from "cc";
const { ccclass, property } = _decorator;

@ccclass("WelcomeScence")
export class WelcomeScence extends Component {
	protected start(): void {
		input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown.bind(this));
	}

	private onMouseDown(event: EventMouse) {
		console.log("[WelcomeScence] Mouse down event detected on target node");
		director.loadScene("play");
	}
}