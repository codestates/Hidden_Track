import React, { Component, createRef } from 'react';
import playPause from '../../assets/playPause.png';
import axios from 'axios'
import './index.scss'

axios.defaults.withCredentials = true;
// Changing Variables
let ctx

// constants
const width = window.innerWidth;
const height = window.innerHeight;

class Canvas extends Component {
    constructor(props) {
        super(props)
        this.trackId = this.props.loca.pathname.split('/')[2];
        this.audio = new Audio();
        this.audio.volume = 1;
        this.audio.crossOrigin = "use-credentials"
        this.img = new Image();
        this.canvas = createRef();
        // this.audio.crossOrigin = "use-credentials"; // 자격증명을 하는거 쿠키 헤더
        // this.audio.crossOrigin = "anonymous"; //익명으로 요청보내는건데 자격증명 x default header로 확인하는거같음
    }

    state = {
        context: {},
        title: '',
        nickName: '',
        soundtrack: '',
        img: ''
    }

    getData = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/track/${this.trackId}`)
            .then(res => {
                this.setState({ title: res.data.track.title, 
                    nickName: res.data.track.user.nickName,
                    soundtrack: res.data.track.soundtrack,
                    img: res.data.track.img
                })
            }).then(res => {
                this.img.src = this.state.img
                axios.get(`${this.state.soundtrack}`).then(res => {
                    this.audio.src=res.config.url
                })
            })
    } 

    componentDidMount () {
        this.getData()
        this.context = new window.AudioContext();
        this.setState({
            context: this.context
        })
        // console.log(window.AudioNode)
        // this.context = new AudioContext();
        this.source = this.context.createMediaElementSource(this.audio);
        this.analyser = this.context.createAnalyser();
        this.source.connect(this.analyser);
        this.analyser.connect(this.context.destination);
        this.frequency_array = new Uint8Array(this.analyser.frequencyBinCount);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rafId);
        this.analyser.disconnect();
        this.source.disconnect();
    }

    animationLooper(canvas) {
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext("2d");
        ctx.shadowBlur = 90;
        ctx.shadowColor = 'pink';
        ctx.globalCompositOperation = 'difference'
        this.analyser.fftSize = 512;
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = this.frequency_array;
        const barWidth = 5.5;
        let barHeight;
        let x = 0;
        this.drawBar(bufferLength, x, barWidth, barHeight, dataArray, canvas);
    }

    imgLoad (canvas, img) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 250, 0, Math.PI * 2);
        ctx.strokeStyle = 'white';
        ctx.stroke();
        ctx.clip();
        ctx.drawImage(img, canvas.width / 2 - 500 / 2, canvas.height / 2 - 500 / 2, 500, 500);
        ctx.restore();
    }

    drawBar(bufferLength, x, barWidth, barHeight, dataArray, canvas) {
        for (let i = 0; i < bufferLength; i++) {
            // barHeight = dataArray[i] * 1.8 + 225;
            barHeight = dataArray[i] * 1.015 + 253;
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            // ctx.rotate(i * Math.PI * 2.315 / bufferLength);
            // ctx.rotate(i * Math.PI * 4 / bufferLength);
            // ctx.rotate(i * Math.PI * 8.318 / bufferLength);
            ctx.rotate(i * bufferLength * 3.5);
            // ctx.fillStyle = 'white'
            // ctx.fillRect(0,1, barWidth, barHeight + 2)
            // const red = i * barHeight / 10;
            // const green = i * 4;
            // const blue = barHeight;
            // ctx.fillStyle = 'white';
            const hue = i * 4;
            // ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
            ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
            ctx.fillRect(0, 0, barWidth, barHeight);
            x += barWidth;
            ctx.restore();
        }
        this.imgLoad(canvas, this.img)
    }

    togglePlay = () => {
        if(this.audio.paused) {
            if(this.state.context.state === 'suspended'){
                this.context = this.state.context.resume()
                this.setState({ context: this.context})
            }
            this.audio.play();
            this.rafId = requestAnimationFrame(this.tick);
        } else {
            this.audio.pause();
            cancelAnimationFrame(this.rafId);
        }
    }

    tick = () => {
        this.animationLooper(this.canvas.current);
        this.analyser.getByteFrequencyData(this.frequency_array);
        this.rafId = requestAnimationFrame(this.tick);
    }

    render() {
        return (
            <div id='visualizer'>
                {this.state.title.length?
                <>
                    <div className="hamburger" id="hamburger-3" onClick={() => {
                        this.props.history.push('/main')
                    }}>
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </div>
                    <div className='inner-circle-control'>
                    <div className='inner-circle-title'>{this.state.title.length > 15?this.state.title.slice(0, 15) + '...':this.state.title }</div>
                    <div className='inner-circle-artist'>{this.state.nickName}</div>
                    <button className='inner-circle-button' onClick={() => { this.togglePlay(); }}>
                        <img src={playPause} style={{ width: '50px', height: '50px' }} alt='play/pause' />
                    </button>
                    </div>
                    <canvas
                    id='canvas'
                    ref={this.canvas}
                    />
                </>
                :<h1 className="Bad" >잘못된 접근입니다.</h1>} 
            </div>
            )
    }
}

export default Canvas;