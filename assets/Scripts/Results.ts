import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {
    @property({
        type: Label,
        tooltip: 'Current Score'
    })
    public scoreLabel: Label;

    @property({
        type: Label,
        tooltip: 'High Score'
    })
    public highScore: Label;

    @property({
        type: Label,
        tooltip: 'Try Again?'
    })
    public resultEnd: Label;

    // Variables needed for the scores
    maxScore: number = 0; // Save high score
    currentScore: number; // Current Score while playing

    updateScore(num: number) {
        // Update the score to the new number on the screen
        this.currentScore = num;

        // Display new score
        this.scoreLabel.string = ('' + this.currentScore);
    }


    resetScore() {
        // Reset score to 0
        this.updateScore(0);

        // Hide high score and try again request
        this.hideResult();

        // Reset current score label
        this.scoreLabel.string = ('' + this.currentScore);
    }

    // Add a point to the score
    addScore() {
        // Add a point to the score
        this.updateScore(this.currentScore + 1);
    }

    // Show the score results when the game ends
    showResult() {
        // Check if it's the high score
        this.maxScore = Math.max(this.maxScore, this.currentScore);

        // Activate high score label
        this.highScore.string = 'High Score is:' + this.maxScore;
        this.highScore.node.active = true;

        // Activate try again label
        this.resultEnd.node.active = true;
    }

    // Hide results and request for a new a game when the new game starts
    hideResult() {
        // hide the high score and try again label

        this.highScore.node.active = false;
        this.resultEnd.node.active = false;
    }

}


