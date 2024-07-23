import {
	_decorator,
	Component,
	find,
	math,
	Node,
	tween,
	UITransform,
	Vec3,
} from "cc";
import { RandomHelper } from "../../ultilties/RandomHelper";
const { ccclass, property } = _decorator;

@ccclass("Bullet")
export class Bullet extends Component {
	@property
	private background: Node = null!;

	start() {
		this.background = find("Canvas/background")!;
		this.launchBullet();
	}

	private launchBullet() {
		const wBackground = this.background.getComponent(UITransform).width;
		const hBackground = this.background.getComponent(UITransform).height;
		const wBullet = this.node.getComponent(UITransform).width;
		const duration = RandomHelper.randomInRange(2, 5);

		const startPos = new Vec3(
			wBackground / 2 + wBullet / 2,
			RandomHelper.randomInRange(-hBackground / 2, hBackground / 2),
			0
		);
		const endPos = new Vec3(
			-wBackground / 2 - wBullet / 2,
			RandomHelper.randomInRange(-hBackground / 2, hBackground / 2),
			0
		);

		this.node.setPosition(startPos);

		tween(this.node)
			.to(
				duration,
				{
					position: endPos,
				},
				{
					progress: (
						start: number,
						end: number,
						current: number,
						ratio: number
					): number => {
						return math.lerp(start, end, ratio);
					},
				}
			)
			.start();
	}

	private onBulletReachTarget() {}

	update(deltaTime: number) {}
}
