import { h } from '../gl-background-video.core.js';

class GLBackgroundVideoComponent {
    constructor() {
        this.muted = true;
    }
    componentDidLoad() {
        if (this.muted) {
            this.videoElement.muted = true;
        }
    }
    render() {
        return h("video", { autoplay: true, loop: true, playsinline: true, preload: "auto", muted: this.muted, src: this.src, poster: this.poster });
    }
    static get is() { return "gl-background-video"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "muted": {
            "type": Boolean,
            "attr": "muted"
        },
        "poster": {
            "type": String,
            "attr": "poster"
        },
        "src": {
            "type": String,
            "attr": "src"
        },
        "videoElement": {
            "elementRef": true
        }
    }; }
    static get style() { return "video.sc-gl-background-video{position:fixed;top:50%;left:50%;min-width:100%;min-height:100%;width:auto;height:auto;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%)}.plt-android.sc-gl-background-video-h   video[poster].sc-gl-background-video, .plt-android   .sc-gl-background-video-h   video[poster].sc-gl-background-video{}"; }
}

export { GLBackgroundVideoComponent as GlBackgroundVideo };
