import Navbar from "../components/Navbar";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicrophoneIcon from '../components/tempImages/microphone.png';
import SubmitTranscript from "../components/SubmitTranscript";
import { useState } from "react";

const SpeechRecognitionPage = () => {
    const [recording, setRecording] = useState('');

    const Dictaphone = () => {
        const {
            transcript,
            listening,
            resetTranscript,
            browserSupportsSpeechRecognition
        } = useSpeechRecognition();
        

        const stop = () => {
            SpeechRecognition.stopListening(); 
            setRecording(transcript);
            console.log("the script is: " + transcript)
        }

        const reset = () => {
            resetTranscript();
            setRecording("");
        }

        if (!browserSupportsSpeechRecognition) {
            return <span>Browser doesn't support speech recognition.</span>;
        }

        return (
            <div style={{maxHeight:100, marginTop:20}}>
                <div className='center' style={{height:20}}>
                    <img src={MicrophoneIcon} alt="microphone icon for recording"></img>
                    Microphone is: {listening ? 'on' : 'off'}
                </div>
                <div className='center' >
                <button className='btn' style={{fontSize:10}} onClick={() => { SpeechRecognition.startListening({ continuous: true }) }}>Start Recording</button>
                <button className='btn' style={{fontSize:10}} onClick={()=> stop()}>Stop/Generate Script</button>
                <button className='btn' style={{fontSize:10}} onClick={()=> reset()}>Reset Script</button>
                </div>
                
            </div>

        );
    };

    return (
        <div>
            <Navbar />
            <div className='containerWide'>
                <h1 >Speech to Script</h1>
            <div style={{fontStyle:'italic', fontSize:12}}>This feature works best on Google Chrome.</div>
            </div>
            
            <div className='container' style={{background: 'rgba(100, 100, 100, 0.75)'}}>
            <Dictaphone />
            <SubmitTranscript transcript={recording}/>
            </div>
        </div>
    )
}

export default SpeechRecognitionPage
