import { _decorator, Component, Input, input, RigidBody2D, Vec2 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Bird")
export class Bird extends Component {
	private JUMP_DURATION: number = 0.1;

	private jumpTime: number = 0;

	private _isJumping: boolean = false;
	start() {
		input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown.bind(this));
	}

	private onMouseDown() {
		this.jump();
	}

	private jump() {
		if (this._isJumping) {
			return;
		}

		this._isJumping = true;
		this.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 30);
	}

	update(deltaTime: number) {
		if (!this._isJumping) {
			return;
		}

		this.jumpTime += deltaTime;
		if (this.jumpTime >= this.JUMP_DURATION) {
			this.jumpTime = 0;
			this._isJumping = false;
			this.getComponent(RigidBody2D).linearVelocity = new Vec2(0, -10);
		}
	}
}
