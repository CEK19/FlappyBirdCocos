import { _decorator, Node } from "cc";
import { BasePooler } from "./BasePool";
const { ccclass, property } = _decorator;

@ccclass("GroundPool")
export class GroundPool extends BasePooler {
	start() {
		this.initializePool();
	}

	getGround(): Node {
		return this.getPrefab();
	}

	returnGround(pipe: Node) {
		this.returnPrefab(pipe);
	}
}
