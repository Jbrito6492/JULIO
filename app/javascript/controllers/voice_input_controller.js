import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="voice-input"
export default class extends Controller {
    static targets = ["input", "startButton"]

    connect() {
        console.log("Connected to voice-input controller")
        this.speechRecognition = this.getSpeechRecognition()
        this.speaking = false
    }

    getSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if (!SpeechRecognition) {
            console.error("SpeechRecognition is not supported in this browser")
            return null
        }

        const speechRecognition = new SpeechRecognition()
        this.setupSpeechRecognitionProperties(speechRecognition)
        this.setupSpeechRecognitionCallbacks(speechRecognition)
        return speechRecognition
    }

    setupSpeechRecognitionProperties(speechRecognition) {
        speechRecognition.lang = "en-US"
        speechRecognition.interimResults = true
        speechRecognition.continuous = true
    }

    setupSpeechRecognitionCallbacks(speechRecognition) {
        speechRecognition.onstart = () => console.log("Speech recognition started")
        speechRecognition.onerror = (event) => this.handleSpeechRecognitionError(event)
        speechRecognition.onend = () => console.log("Speech recognition ended")
        speechRecognition.onresult = (event) => this.handleSpeechRecognitionResult(event)
    }

    handleSpeechRecognitionError(event) {
        console.error("Speech recognition error", event)
        this.stopRecording()
    }

    handleSpeechRecognitionResult(event) {
        const {finalTranscript, interimTranscript} = this.getTranscripts(event)
        this.updateInputValue(finalTranscript, interimTranscript)
    }

    updateInputValue(finalTranscript, interimTranscript) {
        const input = this.inputTarget
        const selectionStart = input.selectionStart
        const selectionEnd = input.selectionEnd

        const currentValue = input.value
        const beforeSelection = currentValue.substring(0, selectionStart)
        const afterSelection = currentValue.substring(selectionEnd)

        input.value = beforeSelection + finalTranscript + afterSelection
        input.selectionStart = selectionStart + finalTranscript.length

        const updatedSelectionStart = selectionStart + finalTranscript.length
        const updatedSelectionEnd = updatedSelectionStart + finalTranscript.length

        input.setSelectionRange(updatedSelectionStart, updatedSelectionEnd)
    }

    getTranscripts(event) {
        let finalTranscript = ""
        let interimTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript
            } else {
                interimTranscript += event.results[i][0].transcript
            }
        }
        return {finalTranscript, interimTranscript}
    }

    stopRecording() {
        this.speaking = false
        this.speechRecognition.stop()
        console.log("Stopped recording")
    }

    startRecording() {
        this.speaking = true
        this.speechRecognition.start()
        console.log("Started recording")
    }

    record() {
        if (!this.speechRecognition) {
            console.log("Speech recognition is not supported in this browser")
            return
        }

        const startButton = this.startButtonTarget
        if (this.speaking) {
            this.stopRecording()
            startButton.textContent = "Start voice input"
        } else {
            this.startRecording()
            startButton.textContent = "Stop voice input"
        }
    }
}
