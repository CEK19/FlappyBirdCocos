import { GroundManager } from "../../managers/GroundManager";
import { _decorator, Component, find, Node, UITransform } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Ground")
export class Ground extends Component {
	public background: Node = null!;
	private readonly PIPE_SPEED = 100;
	private ground: Node = null!;
	private isPassed: boolean = false;
	private groundManager: GroundManager = null!;

	start() {
		this.ground = this.node;
		this.background = find("Canvas/background")!;
		this.groundManager = find("Canvas/background/grounds").getComponent(
			GroundManager
		)!;
	}

	update(deltaTime: number) {
		if (this.isPassed) {
			return;
		}
		const deltaX = this.PIPE_SPEED * deltaTime;

		this.ground.setPosition(
			this.ground.position.x - deltaX,
			this.ground.position.y
		);
		if (this._isBaseFullyLeftOfBackground()) {
			this._resetPipe();
		}
	}

	private _isBaseFullyLeftOfBackground(): boolean {
		const baseTransform = this.ground.getComponent(UITransform);
		const backgroundTransform = this.background.getComponent(UITransform);

		const baseWorldPosition = this.ground.getWorldPosition();
		const backgroundWorldPosition = this.background.getWorldPosition();

		const baseRightEdge = baseWorldPosition.x + baseTransform.width / 2;
		const backgroundLeftEdge =
			backgroundWorldPosition.x - backgroundTransform.width / 2;

		return baseRightEdge < backgroundLeftEdge;
	}

	private _resetPipe(): void {
		this.groundManager.repositionPassedPipes(this.ground);
	}
}
