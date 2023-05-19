import { _decorator, Component, Node, Vec3, screen, find, UITransform } from 'cc';
const { ccclass, property } = _decorator;

// Make a random number generator for the gap
const random = (min, max) => {
    return Math.random() * (max - min) + min
}

@ccclass('Pipes')
export class Pipes extends Component {
    @property({
        type: Node,
        tooltip: 'Top Pipe'
    })
    public topPipe: Node;

    @property({
        type: Node,
        tooltip: 'Bottom Pipe'
    })
    public bottomPipe: Node;

    // Temporary Locations
    public tempStartLocationUp: Vec3 = new Vec3(0, 0, 0); // Temporary location of the up pipe
    public tempStartLocationDown: Vec3 = new Vec3(0, 0, 0); // Temporary location of the up pipe
    public scene = screen.windowSize; // Get the size of the screen in case we decide to change the content size

    // Get the pipe speeds
    public game; // Get the pipe speed from GameCtrl
    public pipeSpeed: number; // Use as a final speed number
    public tempSpeed: number; // Use as the moving pipe speed

    onLoad(): void {
        this.game = find("GameCtrl").getComponent("GameCtrl");
        this.pipeSpeed = this.game.pipeSpeed; // Add pipeSpeed to temporary method
        this.initPos(); // Work on original position
    }

    initPos() {
        // Start with the initial position of x for both pipes
        this.tempStartLocationUp.x = (this.topPipe.getComponent(UITransform).width + this.scene.width);
        this.tempStartLocationDown.x = (this.topPipe.getComponent(UITransform).width + this.scene.width);
    }
}


