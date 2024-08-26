import {
	_decorator,
	Component,
	director,
	EventMouse,
	EventTouch,
	Input,
	input,
} from "cc";
import { GameManager } from "../managers/GameManager";
const { ccclass, property } = _decorator;

@ccclass("WelcomeScence")
export class WelcomeScence extends Component {
	protected start(): void {
		input.on(Input.EventType.TOUCH_START, this.onTouch, this);
	}

	protected onDestroy(): void {
		input.off(Input.EventType.TOUCH_START, this.onTouch, this);
	}

	private onTouch(event: EventTouch) {
		GameManager.instance.playGame();
	}
}
