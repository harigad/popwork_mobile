export class GLBackgroundVideoComponent {
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
    static get style() { return "/**style-placeholder:gl-background-video:**/"; }
}
