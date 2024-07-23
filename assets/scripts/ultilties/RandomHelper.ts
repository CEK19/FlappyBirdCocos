import { _decorator } from "cc";

const { ccclass, property } = _decorator;

@ccclass("Bullet")
export class RandomHelper {
	static randomInRange(min: number, max: number): number {
		return Math.random() * (max - min) + min;
	}
}
