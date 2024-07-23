import { _decorator, Component, Input, input, RigidBody2D, Vec2 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Bird")
export class Bird extends Component {
	private JUMP_DURATION: number = 0.1;

	private _jumpTime: number = 0;
	private _isJumping: boolean = false;
	private _rigidBody: RigidBody2D = null!;
	start() {
		this._rigidBody = this.getComponent(RigidBody2D)!;
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
		this._rigidBody.linearVelocity = new Vec2(0, 30);
	}

	update(deltaTime: number) {
		if (!this._isJumping) {
			return;
		}

		this._jumpTime += deltaTime;
		if (this._jumpTime >= this.JUMP_DURATION) {
			this._jumpTime = 0;
			this._isJumping = false;
			this._rigidBody.linearVelocity = new Vec2(0, -10);
		}
	}
}
