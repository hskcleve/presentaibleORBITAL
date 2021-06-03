import MP3Logo from '../components/tempImages/mp3.png';

const PlayAudioFromURL = ({downloadURL}) => {
    if (downloadURL != null) {
    return (
        <div className='center'> 
        <button className='btn' onClick={()=>{window.open(downloadURL)}}>Play Recording</button>
        <img src={MP3Logo} alt="image of mp3 logo"></img>
        </div>
    )
    } else {
        return (
            <div style={{fontSize:15}}>
                No recording has been uploaded for this script yet!
            </div>
        )
    }
}

export default PlayAudioFromURL
