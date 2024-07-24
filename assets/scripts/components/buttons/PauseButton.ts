import { _decorator, Button, Component, Node, SpriteFrame } from "cc";
import { GameManager } from "../../managers/GameManager";
const { ccclass, property } = _decorator;

enum ButtonState {
	PAUSE,
	RESUME,
}

@ccclass("PauseButton")
export class PauseButton extends Component {
	@property(SpriteFrame)
	public pauseSprite: SpriteFrame = null!;

	@property(SpriteFrame)
	public resumeSprite: SpriteFrame = null!;

	private currentState = ButtonState.RESUME;

	start() {
		this.node.on(Button.EventType.CLICK, this.onClick, this);
	}

	onClick() {
		if (this.currentState === ButtonState.PAUSE) {
			GameManager.instance.resumeGame();
			this.currentState = ButtonState.RESUME;
			this.changeSpriteFrame(this.pauseSprite);
		} else if (this.currentState === ButtonState.RESUME) {
			GameManager.instance.pauseGame();
			this.currentState = ButtonState.PAUSE;
			this.changeSpriteFrame(this.resumeSprite);
		}
	}

	private changeSpriteFrame(changedSprite: SpriteFrame) {
		this.node.getComponent(Button)!.normalSprite = changedSprite;
	}
}
