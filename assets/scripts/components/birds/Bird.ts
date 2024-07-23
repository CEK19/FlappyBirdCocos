import {
	_decorator,
	Component,
	Input,
	input,
	Quat,
	RigidBody2D,
	Vec2,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Bird")
export class Bird extends Component {
	private JUMP_DURATION: number = 0.2;

	private _jumpTime: number = 0;
	private _isJumping: boolean = false;
	private _rigidBody: RigidBody2D = null!;

	onLoad() {
		this._rigidBody = this.getComponent(RigidBody2D)!;
		input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
	}

	private onMouseDown() {
		this.jump();
	}

	private jump() {
		if (!this._rigidBody) {
			return;
		}

		this._isJumping = true;
		this._rigidBody.linearVelocity = new Vec2(0, 10);
		this._jumpTime = 0;

		if (this._isJumping) {
			return;
		}
	}

	update(deltaTime: number) {
		if (!this._rigidBody) {
			return;
		}

		if (this._rigidBody.linearVelocity.y < 0) {
			this.rotateBirdDown();
		} else {
			this.rotateBirdNormal();
		}

		if (!this._isJumping) {
			return;
		}

		this._jumpTime += deltaTime;
		this;
		if (this._jumpTime >= this.JUMP_DURATION) {
			this._jumpTime = 0;
			this._isJumping = false;
			this._rigidBody.linearVelocity = new Vec2(0, -10);
		}
	}

	private rotateBirdDown() {
		this.node.setRotation(Quat.fromEuler(new Quat(), 0, 0, -20));
	}

	private rotateBirdNormal() {
		this.node.setRotation(Quat.fromEuler(new Quat(), 0, 0, 0));
	}
}
