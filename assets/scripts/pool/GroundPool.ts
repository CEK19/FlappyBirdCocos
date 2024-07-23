import { _decorator, Node } from "cc";
import { BasePooler } from "./BasePool";
const { ccclass, property } = _decorator;

@ccclass("GroundPool")
export class GroundPool extends BasePooler {
	start() {
		console.log("GroundPool.ts loaded");
		this.initializePool();
	}

	getPipe(): Node {
		return super.getPrefab();
	}

	returnPipe(pipe: Node) {
		super.returnPrefab(pipe);
	}
}
