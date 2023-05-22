import {
  _decorator,
  CCFloat,
  Component,
  Node,
  Vec3,
  Animation,
  tween,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Bird")
export class Bird extends Component {
  @property({
    type: CCFloat,
    tooltip: "How high does he fly?",
  })
  public jumpHeight: number = 1.5;

  @property({
    type: CCFloat,
    tooltip: "How long does he fly?",
  })
  public jumpDuration: number = 1.5;

  // Animation property of the bird
  public birdAnimation: Animation;

  // Temporary location of the bird
  public birdLocation: Vec3;
  public hitSomething: boolean;

  // All the actions we want done when we start the script.
  onLoad(): void {
    // Restart the bird
    this.resetBird();
    // Get the initial information
    this.birdAnimation = this.getComponent(Animation);
  }

  resetBird() {
    // Create original bird location
    this.birdLocation = new Vec3(0, 0, 0);
    // Place bird in location
    this.node.setPosition(this.birdLocation);

    this.hitSomething = false;
  }

  fly() {
    // Stop the bird animation immediately
    this.birdAnimation.stop();
    // Start the movement of the bird
    tween(this.node.position)
      .to(
        this.jumpDuration,
        new Vec3(
          this.node.position.x,
          this.node.position.y + this.jumpHeight,
          0
        ),
        {
          easing: "smooth",
          onUpdate: (target: Vec3, ratio: number) => {
            this.node.position = target;
          },
        }
      )
      .start();

    // Play the bird animation
    this.birdAnimation.play();
  }
}
