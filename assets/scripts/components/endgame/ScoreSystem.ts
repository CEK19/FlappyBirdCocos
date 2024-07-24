import { _decorator, Component, find, Label, Node } from "cc";
import { GameManager } from "../../managers/GameManager";
const { ccclass, property } = _decorator;

@ccclass("ScoreSystem")
export class ScoreSystem extends Component {
	start() {
		const scoreNode = find("Canvas/finalResult/score");
		scoreNode.getComponent(
			Label
		)!.string = `Score: ${GameManager.instance.score}`;
	}
}
