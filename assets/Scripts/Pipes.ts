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

    // Scoring mechanism
    isPass: boolean; // Did the pipe pass the bird?

    // What to do when the pipes load
    onLoad(): void {
        this.game = find("GameCtrl").getComponent("GameCtrl");
        this.pipeSpeed = this.game.pipeSpeed; // Add pipeSpeed to temporary method
        this.initPos(); // Work on original position
        this.isPass = false; // Set the scroing mechanism
    }

    initPos() {
        // Start with the initial position of x for both pipes
        this.tempStartLocationUp.x = (this.topPipe.getComponent(UITransform).width + this.scene.width);
        this.tempStartLocationDown.x = (this.topPipe.getComponent(UITransform).width + this.scene.width);

        // Random variables forthe gaps
        let gap = random(90, 100); // passable area randomized
        let topHeight = random(0, 450); // The height of the toppipe

        // Set the top pipe initial position of y
        this.tempStartLocationUp.y = topHeight;

        // Set the bottom pipe initial position of y
        this.tempStartLocationDown.y = (topHeight - (gap * 10));

        // Set temp locations to real ones
        this.topPipe.setPosition(this.tempStartLocationUp.x, this.tempStartLocationUp.y);
        this.bottomPipe.setPosition(this.tempStartLocationDown.x, this.tempStartLocationDown.y);
    }

    update(deltaTime: number): void {
        // Get the pipe speed
        this.tempSpeed = this.pipeSpeed * deltaTime;

        // Make the temporary pipe locations
        this.tempStartLocationDown = this.bottomPipe.position;
        this.tempStartLocationUp = this.topPipe.position;

        // Move temporary pipe locations
        this.tempStartLocationDown.x -= this.tempSpeed;
        this.tempStartLocationUp.x -= this.tempSpeed;

        // Place new postiions of the pipes from temporary pipe locations
        this.bottomPipe.setPosition(this.tempStartLocationDown);
        this.topPipe.setPosition(this.tempStartLocationUp);

        // Find out if bird past a pipe, add  to the score
        if (this.isPass == false && this.topPipe.position.x <= 0) {
            // Make sure it is only counted once
            this.isPass = true;
            // Add a point to the score
            this.game.passPipe();
        }

        if (this.topPipe.position.x < (0 - this.scene.width)) {
            // Create a new pipe
            this.game.createPipe();
            // Delete this node for memory saving
            this.destroy();
        }
    }


}


