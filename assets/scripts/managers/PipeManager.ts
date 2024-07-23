import { _decorator, Component, Node, UITransform, Vec3 } from "cc";
import { PipePool } from "../components/grounds/PipePool";
const { ccclass, property } = _decorator;

@ccclass("PipeManager")
export class PipeManager extends Component {
	@property(PipePool)
	public pipePool: PipePool = null!;
	@property(Node)
	public background: Node = null!;

	private INIT_PIPES: number = 4;
	public pipes: Node[] = [];

	protected start(): void {
		console.log("PipeManager.ts loaded");
		this._initPipes();
	}

	private _initPipes() {
		for (let i = 0; i < this.INIT_PIPES; i++) {
			const pipe = this.pipePool.getPipe();
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
