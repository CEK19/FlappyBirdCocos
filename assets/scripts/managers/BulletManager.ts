import { _decorator, Component, Node, UITransform } from "cc";
import { BulletPool } from "../pool/BulletPool";
const { ccclass, property } = _decorator;

@ccclass("BulletManager")
export class BulletManager extends Component {
	@property(BulletPool)
	public bulletPool: BulletPool = null!;

	private INIT_BULLETS = 10;

	protected start() {
		this._initBullets();
	}

	private _initBullets() {
		for (let i = 0; i < this.INIT_BULLETS; ++i) {
			const bullet = this.bulletPool.getBullet();
			this.node.addChild(bullet);
		}
	}
}
