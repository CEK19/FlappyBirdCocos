import { _decorator, Component, Node } from "cc";
import { BasePooler } from "./BasePool";
const { ccclass, property } = _decorator;

@ccclass("BulletPool")
export class BulletPool extends BasePooler {
	constructor() {
		super();
		this.initialSize = 50;
	}

	getBullet(): Node {
		return this.getPrefab();
	}

	returnBullet(node: Node) {
		return this.returnPrefab(node);
	}
}
