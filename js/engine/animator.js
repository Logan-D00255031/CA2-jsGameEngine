// Import the required modules and classes.
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Component from './component.js';
import { Animations } from '../engine/resources.js';

class Animator extends Component {
    // The constructor initializes a new instance of the Animator class.
    constructor( name, lenght = 1, fps = 12, delay = 0) {
        // The name of the animation that we want to play.
        this.name = name;
        // The amount of frames the animation is made of.
        this.lenght = lenght;
        // The amount of animation frames that should be displayed per second.
        this.fps = fps;
        // The amount of frames before the next animation frame is shown.
        this.delay = delay;
        // The renderer of the GameObject we wish to animate.
        this.renderer = this.gameObject.getComponent(Renderer);
    }

    update(deltaTime) {
        this.deltaTime = deltaTime;
        this.gameFPS = 1000 / deltaTime;
        this.fpsDelay = this.gameFPS / this.fps;
    }

    playAnim() {
        this.currentFrame = 0;
        this.currentAnimFrame = 0;
        this.animImage = 1;
        if( this.currentFrame == this.fpsDelay ) {
            this.currentAnimFrame ++;
            this.currentFrame = 0;
            if(this.currentAnimFrame == this.fps) {
                if(this.animImage < this.lenght) {
                    this.animImage ++;
                }
            }
        }

        this.renderer.image = Animations.playerMove + this.animImage + ".png";
    }
    // this.renderer.image = null;
}