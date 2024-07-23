import { _decorator, Component, find, Node, UITransform } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Pipe")
export class Pipe extends Component {
	public background: Node = null!;

	private PIPE_SPEED = 50;

	private pipe: Node = null!;

	start() {
		this.pipe = this.node;
		this.background = find("Canvas/background")!;
	}

	update(deltaTime: number) {
		const deltaX = this.PIPE_SPEED * deltaTime;

		this.pipe.setPosition(
			this.pipe.position.x - deltaX,
			this.pipe.position.y
		);
		if (this._isBaseFullyLeftOfBackground()) {
			this._resetPipe();
		}
	}

	private _isBaseFullyLeftOfBackground(): boolean {
		const baseTransform = this.pipe.getComponent(UITransform);
		const backgroundTransform = this.background.getComponent(UITransform);

		const baseWorldPosition = this.pipe.getWorldPosition();
		const backgroundWorldPosition = this.background.getWorldPosition();

		const baseRightEdge = baseWorldPosition.x + baseTransform.width / 2;
		const backgroundLeftEdge =
			backgroundWorldPosition.x - backgroundTransform.width / 2;

		return baseRightEdge < backgroundLeftEdge;
	}

	private _resetPipe(): void {
		console.log("Resetting pipe");
	}
}
