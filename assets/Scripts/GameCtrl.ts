import {
    _decorator,
    CCInteger,
    Component,
    director,
    EventKeyboard,
    input,
    Input,
    KeyCode,
    Node,
    Collider2D,
    IPhysics2DContact,
    Contact2DType
} from "cc";
import {Ground} from "./Ground";
import {Results} from "./Results";
import {Bird} from "./Bird";
import {PipePool} from "./PipePool";
import {BirdAudio, BirdSound} from "./BirdAudio";

const {ccclass, property} = _decorator;

@ccclass("GameCtrl")
export class GameCtrl extends Component {
    @property({
        type: Component,
        tooltip: "Add ground prefab owner here",
    })
    public ground: Ground;

    @property({
        type: CCInteger,
        tooltip: "Change the speed of ground",
    })
    public speed: number = 200;

    @property({
        type: CCInteger,
        tooltip: "Change the speed of pipes",
    })
    public pipeSpeed: number = 200;

    @property({
        type: Results,
        tooltip: "Add results here",
    })
    public result: Results;

    @property({
        type: Bird,
        tooltip: "Add results here",
    })
    public bird: Bird;

    @property({
        type: PipePool,
    })
    public pipeQueue: PipePool;

    @property({
        type: BirdAudio,
        tooltip: 'Add audio controller'
    })
    public clip: BirdAudio;

    public isOver: boolean;

    // Things to do when the game loads
    onLoad() {
        // Get listener started
        this.initListener();
        // Reset score to zero
        // game is over
        this.isOver = true;
        this.result.resetScore();
        // Pause the game
        director.pause();
    }

    // Listener for the mouse clicks and keyboard
    initListener() {
        // If keyboard key goes down, go to onKeyDown
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        // If a mouse or finger goes down, do this
        this.node.on(Node.EventType.TOUCH_START, () => {
            // If we are starting a new game
            if (this.isOver == true) {
                // Reset everything and start the game again
                this.resetGame();
                this.bird.resetBird();
                this.startGame();
            }

            if (this.isOver == false) {
                // Have bird fly
                this.bird.fly();
                this.clip.onAudioQueue(BirdSound.SWOOSH);
            }
        });
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                // End game
                this.gameOver();
                break;
            case KeyCode.KEY_P:
                // Add one point
                this.result.addScore();
                break;
            case KeyCode.KEY_Q:
                // Reset score to zero
                this.resetGame();
                this.bird.resetBird();
                break;
        }
    }

    // What to do when the game is starting
    startGame() {
        // Hide high score and other text
        this.result.hideResult();

        // Resume game
        director.resume();
    }

    // When the bird hits something, run this
    gameOver() {
        // Show the results
        this.result.showResult();

        // game is over
        this.isOver = true;

        this.clip.onAudioQueue(BirdSound.DIE);

        // Pause the game
        director.pause();
    }

    // When the game starts again, do these things.
    resetGame() {
        // Reset score, bird and pipes
        this.result.resetScore();

        //reset the pipes
        this.pipeQueue.reset();

        // game is over
        this.isOver = false;

        // Get objects moving again
        this.startGame();
    }

    passPipe() {
        this.result.addScore();
        this.clip.onAudioQueue(BirdSound.POINT);
    }

    createPipes() {
        this.pipeQueue.addPool();
    }

    contactGroundPipe() {
        let collider = this.bird.getComponent(Collider2D);

        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        this.bird.hitSomething = true;
        this.clip.onAudioQueue(BirdSound.HIT);
    }

    birdStruck() {
        this.contactGroundPipe();

        if (this.bird.hitSomething == true) {
            this.gameOver();
        }
    }

    update() {
        if (this.isOver == false) {
            this.birdStruck();
        }
    }
}
