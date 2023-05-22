import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BirdAudio')
export class BirdAudio extends Component {
    @property({
        type: [AudioClip],
        tooltip: 'Place audio clip here'
    })
    public clips: AudioClip[] = [];

    @property({
        type: AudioSource,
        tooltip: 'Place audio node here'
    })
    public audioSource: AudioSource = null!;

    // Place correct audio clip in the audio player and play the audio
    onAudioQueue(index: number) {

        // Place audio clip in the the player
        let clip: AudioClip = this.clips[index];

        // Play the audio just once
        this.audioSource.playOneShot(clip);

    }
}


