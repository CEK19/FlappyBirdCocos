import { _decorator, Component, Node, UITransform, Vec3 } from "cc";
import { GroundPool } from "../pool/PipePool";
const { ccclass, property } = _decorator;

@ccclass("GroundManager")
export class GroundManager extends Component {
	@property(GroundPool)
	public groundPool: GroundPool = null!;
	@property(Node)
	public background: Node = null!;

	private INIT_PIPES: number = 4;
	public pipes: Node[] = [];

	protected start(): void {
		console.log("GroundManager.ts loaded");
		this._initPipes();
	}

	public repositionPassedPipes(pipe: Node): void {
		const wBackground = this.background.getComponent(UITransform).width;
		const wPipe = pipe.getComponent(UITransform).width;
		pipe.setPosition(wBackground / 2 + wPipe / 2, pipe.position.y);
	}

	private _initPipes() {
		for (let i = 0; i < this.INIT_PIPES; i++) {
			const pipe = this.groundPool.getPipe();
			this.node.addChild(pipe);
			this.pipes.push(pipe);
		}

		if (!this.pipes[0]) {
			return;
		}

		const firstPipe = this.pipes[0];
		const backgroundWidth = this.background.getComponent(UITransform).width;
		const backgroundHeight =
			this.background.getComponent(UITransform).height;

		const pipeWidth = firstPipe.getComponent(UITransform).width;
		const pipeHeight = firstPipe.getComponent(UITransform).height;

		const firstPipeX = -backgroundWidth / 2 + pipeWidth / 2;
		const firstPipeY = -backgroundHeight / 2 + pipeHeight / 2;

		firstPipe.setPosition(firstPipeX, firstPipeY);

		if (this.pipes.length === 1) {
			return;
		}

		for (let i = 1; i < this.pipes.length; i++) {
			const pipe = this.pipes[i];
			const previousPipe = this.pipes[i - 1];

			const previousPipeX = previousPipe.position.x;
			const previousPipeY = previousPipe.position.y;

			const pipeX = previousPipeX + pipeWidth;
			const pipeY = previousPipeY;

			pipe.setPosition(pipeX, pipeY);
		}
	}
}
