import { _decorator, CCInteger, Component, director, EventKeyboard, input, Input, KeyCode, Node } from 'cc';
import { Ground } from './Ground';
import { Results } from './Results';
import { Bird } from './Bird';
const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {
    @property({
        type: Component,
        tooltip: 'Add ground prefab owner here'
    })
    public ground: Ground;

    @property({
        type: CCInteger,
        tooltip: 'Change the speed of ground'
    })
    public speed: number = 200;

    @property({
        type: CCInteger,
        tooltip: 'Change the speed of pipes'
    })
    public pipeSspeed: number = 200;

    @property({
        type: Results,
        tooltip: 'Add results here'
    })
    public result: Results;

    @property({
        type: Bird,
        tooltip: 'Add results here'
    })
    public bird: Bird;

    // Things to do when the game loads
    onLoad(): void {
        // Get listerner started
        this.initListener();
        // Reset score to zero
        this.result.resetScore();
        // Pause the game
        director.pause();
    }

    // Listener for the mouse clicks and keyboard
    initListener() {
        // If keyboard key goes down, go to onKeyDown
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        // If an mouse or finger goes down, do this
        this.node.on(Node.EventType.TOUCH_START, () => {
            // Have the bird fly
            this.bird.fly();
        })
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

    // When the game starts again, do these things.
    resetGame() {
        // Reset score, bird and pipes
        this.result.resetScore();

        // Get objects moving again
        this.startGame();
    }

    // When the bird hits something, run this
    gameOver() {
        // Show the results
        this.result.showResult();

        // Pause the game
        director.pause();
    }

    // What to do when the game is starting
    startGame() {
        // Hide high score and other text
        this.result.hideResult();

        // Resume game
        director.resume();
    }






}


