import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="dashboard"
export default class extends Controller {
    static targets = ["welcomeAudio"]

    welcomeAudioTargetConnected() {
        console.log("Connected to welcome audio target")
        this.welcomeAudioTarget.play()
    }
}
