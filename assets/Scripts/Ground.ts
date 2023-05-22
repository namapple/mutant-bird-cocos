import {
    _decorator,
    Component,
    Node,
    UITransform,
    Vec3,
    Canvas,
    director,
} from "cc";
import {GameCtrl} from "./GameCtrl";

const {ccclass, property} = _decorator;

@ccclass("Ground")
export class Ground extends Component {
    @property({
        type: Node,
        tooltip: "First ground",
    })
    public ground1: Node;

    @property({
        type: Node,
        tooltip: "Second ground",
    })
    public ground2: Node;

    @property({
        type: Node,
        tooltip: "Third ground",
    })
    public ground3: Node;

    // Create ground with variables
    public groundWidth1: number;
    public groundWidth2: number;
    public groundWidth3: number;

    // Make temporary staring locations
    public tempStartLocation1 = new Vec3();
    public tempStartLocation2 = new Vec3();
    public tempStartLocation3 = new Vec3();

    // Get the game speeds
    public gameCtrlSpeed = new GameCtrl;
    public gameSpeed: number;

    // All the things we want to happen when we start the script
    protected onLoad(): void {
        this.startUp();
    }

    startUp() {
        // Get ground groundWidth
        this.groundWidth1 = this.ground1.getComponent(UITransform).width;
        this.groundWidth2 = this.ground2.getComponent(UITransform).width;
        this.groundWidth3 = this.ground3.getComponent(UITransform).width;

        // Set temporary staring locations of ground
        this.tempStartLocation1.x = 0;
        this.tempStartLocation2.x = this.groundWidth1;
        this.tempStartLocation3.x = this.groundWidth1 + this.groundWidth2;

        // Update position to final starting locations
        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
    }

    // Everytime the game updates, move the ground
    update(deltaTime: number) {
        // Get speed of ground and background
        this.gameSpeed = this.gameCtrlSpeed.speed;

        // Place real location data into temp locations
        this.tempStartLocation1 = this.ground1.position;
        this.tempStartLocation2 = this.ground2.position;
        this.tempStartLocation3 = this.ground3.position;

        // Get speed and subtract location on axis
        this.tempStartLocation1.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation2.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation3.x -= this.gameSpeed * deltaTime;

        // Get canvas size prepared
        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);

        // Check if ground1 went out of bounds. If so, return to the end of the line.
        if (this.tempStartLocation1.x <= (0 - this.groundWidth1)) {
            this.tempStartLocation1.x = canvas.getComponent(UITransform).width;
        }
        // Check if ground1 went out of bounds. If so, return to the end of the line.
        if (this.tempStartLocation2.x <= (0 - this.groundWidth2)) {
            this.tempStartLocation2.x = canvas.getComponent(UITransform).width;
        }
        // Check if ground1 went out of bounds. If so, return to the end of the line.
        if (this.tempStartLocation3.x <= (0 - this.groundWidth3)) {
            this.tempStartLocation3.x = canvas.getComponent(UITransform).width;
        }

        // Place new locations back into ground nodes
        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);


    }
}
