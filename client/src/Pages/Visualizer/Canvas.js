import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import playPause from '../../assets/playPause.png';

// Changing Variables
let ctx

// constants
const width = window.innerWidth;
const height = window.innerHeight;

class Canvas extends Component {
    constructor(props) {
        super(props)
        this.audio = new Audio();
        this.audio.crossOrigin = "anonymous";
        // this.audio.crossOrigin = "use-credentials";
        this.audio.preload = "auto"
        this.audio.src = this.props.track.soundtrack
        this.audio.volume = 0.5;
        this.canvas = createRef();
        this.img = new Image();
        this.img.src = this.props.track.img;
        this.context = new AudioContext();
        console.log('')
        console.log(this.context)
        this.source = this.context.createMediaElementSource(this.audio);
        this.analyser = this.context.createAnalyser();
        this.source.connect(this.analyser);
        this.analyser.connect(this.context.destination);
        this.frequency_array = new Uint8Array(this.analyser.frequencyBinCount);
    }

    animationLooper(canvas) {
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext("2d");
        this.analyser.fftSize = 512;
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = this.frequency_array;
        const barWidth = 5;
        let barHeight;
        let x = 0;
        //draw a bar
        this.drawBar(bufferLength, x, barWidth, barHeight, dataArray, canvas);
    }

    imgLoad (canvas, img) {
        // console.log(img)
        // console.log(img)
        ctx.save();
        ctx.beginPath();
        // ctx.arc(960, 487.5, 245, 0, Math.PI * 2, false)
        ctx.arc(canvas.width / 2, canvas.height / 2, 222, 0, Math.PI * 2);
        // ctx.strokeStyle = '#2465D3'
        ctx.strokeStyle = 'white';
        ctx.stroke();
        ctx.clip();
        ctx.drawImage(img, canvas.width / 2 - 500 / 2,
        canvas.height / 2 - 500 / 2, 500, 500);
        // ctx.drawImage(img,0,1, barWidth, barHeight + 2 )
        ctx.restore();
    }

    drawBar(bufferLength, x, barWidth, barHeight, dataArray, canvas) {
        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 1.8 + 225;
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            // ctx.rotate(i * Math.PI * 2.315 / bufferLength);
            ctx.rotate(i * Math.PI * 4 / bufferLength);
            // ctx.fillStyle = 'white'
            // ctx.fillRect(0,1, barWidth, barHeight + 2)
            // const red = i * barHeight / 10;
            // const green = i * 4;
            // const blue = barHeight;
            // ctx.fillStyle = 'white';
            const hue = i * 4;
            // ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
            ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)';
            ctx.fillRect(0, 0, barWidth, barHeight);
            x += barWidth;
            ctx.restore();
        }
        this.imgLoad(canvas, this.img)
    }

    componentDidMount() {
        
        // this.audio.current.src = this.props.crrentMusic.soundtrack
        // this.audio.current.volume = 0.2;
        // this.audio.current.onplaying = () => {console.log('실행')}

    }

    togglePlay = () => {
        // console.log(this.context)
        // this.context.resume()
        console.log('플레이',this.audio)
        if(this.audio.paused) {
            console.log('gfd')
            this.audio.play();
            this.rafId = requestAnimationFrame(this.tick);
        } else {
            this.audio.pause();
        cancelAnimationFrame(this.rafId);
        }
    }

    // next= () => {
    //     const {setCrrentMusic, playList, crrentMusic} = this.props
    //     console.log(setCrrentMusic)
    //     setCrrentMusic(playList[playList.indexOf(crrentMusic + 1)])
    //     this.audio.src = crrentMusic.soundtrack
    // }

    tick = () => {
        this.animationLooper(this.canvas.current);
        this.analyser.getByteFrequencyData(this.frequency_array);
        this.rafId = requestAnimationFrame(this.tick);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rafId);
        this.analyser.disconnect();
        this.source.disconnect();
    }

    render() {
        console.log(this.props)

        return (
    <>
        <button
        className='go-main-button' onClick={() => {
            this.props.goMain();
        }}
        >Go Main
        </button>
        <div className='inner-circle-control'>
        <div className='inner-circle-title'>{this.props.track.title}</div>
        <div className='inner-circle-artist'>{this.props.track.user.nickName}</div>
        <button className='inner-circle-button' onClick={() => { this.togglePlay(); }}>
            <img src={playPause} style={{ width: '50px', height: '50px' }} alt='play/pause' />
        </button>
        </div>
        <canvas
        id='canvas'
        ref={this.canvas}
        />
    </>
    )
    }
}

export default Canvas;
