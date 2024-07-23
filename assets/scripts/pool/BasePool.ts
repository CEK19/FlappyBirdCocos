import { _decorator, Component, instantiate, Node, Prefab } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BasePool")
export class BasePooler extends Component {
	@property(Prefab)
	public prefab: Prefab = null;
	protected initialSize: number = 10;
	private pool: Node[] = [];

	start() {
		this.initializePool();
	}

	initializePool() {
		for (let i = 0; i < this.initialSize; i++) {
			const prefab = instantiate(this.prefab);
			this.pool.push(prefab);
		}
	}

	getPrefab(): Node {
		if (this.pool.length > 0) {
			return this.pool.pop();
		} else {
			return instantiate(this.prefab);
		}
	}

	returnPrefab(prefab: Node) {
		prefab.setParent(null);
		this.pool.push(prefab);
	}
}
