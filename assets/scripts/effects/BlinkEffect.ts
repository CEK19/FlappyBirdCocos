import { _decorator, Component, Node, tween, UIOpacity } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BlinkEffect")
export class BlinkEffect extends Component {
	@property({ type: Node, tooltip: "The node to blink" })
	targetNode: Node = null!;

	private isVisible: boolean = true;

	protected onLoad(): void {
		this.toggleOpacity();
	}

	private toggleOpacity() {
		this.isVisible = !this.isVisible;
		const opacity = this.isVisible ? 255 : 0;

		tween(this.targetNode.getComponent(UIOpacity)!)
			.to(0.5, { opacity: opacity })
			.call(() => this.toggleOpacity())
			.start();
	}
}
