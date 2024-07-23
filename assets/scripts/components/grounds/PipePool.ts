import { _decorator, Component, instantiate, Node, Prefab } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PipePool")
export class PipePool extends Component {
	@property(Prefab)
	public pipePrefab: Prefab = null;

	private INITIAL_SIZE: number = 10;
	private pool: Node[] = [];

	start() {
		console.log("PipePool.ts loaded");
		this.initializePool();
	}

	initializePool() {
		for (let i = 0; i < this.INITIAL_SIZE; i++) {
			const pipe = instantiate(this.pipePrefab);
			this.pool.push(pipe);
		}
	}

	getPipe(): Node {
		if (this.pool.length > 0) {
			return this.pool.pop();
		} else {
			return instantiate(this.pipePrefab);
		}
	}

	returnPipe(pipe: Node) {
		pipe.setParent(null);
		this.pool.push(pipe);
	}
}
