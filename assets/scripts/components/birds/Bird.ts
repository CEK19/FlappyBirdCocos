import {
	_decorator,
	Collider2D,
	Component,
	Contact2DType,
	director,
	Input,
	input,
	Quat,
	RigidBody2D,
	Vec2,
	IPhysics2DContact,
	find,
	Node,
	Label,
} from "cc";
import { GameManager } from "../../managers/GameManager";
const { ccclass, property } = _decorator;

@ccclass("Bird")
export class Bird extends Component {
	private JUMP_DURATION: number = 0.2;

	private _jumpTime: number = 0;
	private _isJumping: boolean = false;
	private _rigidBody: RigidBody2D = null!;
	private _isCollided: boolean = false;
	private _score: Node = null!;

	onLoad() {
		input.on(Input.EventType.TOUCH_START, this.onTouch, this);

		this._rigidBody = this.getComponent(RigidBody2D)!;
		this._score = find("Canvas/background/score");
		this.node
			.getComponent(Collider2D)!
			.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);

		this.schedule(() => {
			GameManager.instance.addScore(1);
			this._score.getComponent(Label)!.string =
				GameManager.instance.score.toString();
		}, 2);
	}

	private onTouch() {
		if (this._isCollided) {
			return;
		}

		this.jump();
	}

	private onBeginContact(
		selfCollider: Collider2D,
		otherCollider: Collider2D,
		contact: IPhysics2DContact | null
	) {
		if (this._isCollided) {
			return;
		}
		this._rigidBody.linearVelocity = new Vec2(0, -10);
		this._isCollided = true;
		GameManager.instance.endGame();
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
