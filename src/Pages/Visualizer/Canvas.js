// import React, { Component, createRef } from 'react';
// import playPause from '../../assets/playPause.png';

// // Changing Variables
// let ctx

// // constants
// const width = window.innerWidth;
// const height = window.innerHeight;

// class Canvas extends Component {
//     constructor(props) {
//         super(props)
//         this.track = {title: localStorage.getItem('title'),
//             nickName: localStorage.getItem('nickName'),
//             soundtrack: localStorage.getItem('soundTrack'),
//             img: localStorage.getItem('img')
//         }
//         this.audio = new Audio();
//         this.audio.preload = "auto"
//         // this.audio.crossOrigin = "anonymous"
//         this.audio.volume = 0.5;
//         this.audio.src = localStorage.getItem('soundTrack')
//         this.img = new Image();
//         this.img.src = this.track.img

//         // this.track = localStorage.getItem('trackDetail')
//         // this.audio.crossOrigin = "use-credentials"; // 자격증명을 하는거 쿠키 헤더
//         // this.audio.crossOrigin = "anonymous"; //익명으로 요청보내는건데 자격증명 x default header로 확인하는거같음

//         // const objectURL = window.URL.createObjectURL(this.props.track.soundtrack)
//         // console.log(this.objectURL)
//         this.canvas = createRef();
//     }

//     animationLooper(canvas) {
//         canvas.width = width;
//         canvas.height = height;
//         ctx = canvas.getContext("2d");
//         this.analyser.fftSize = 512;
//         const bufferLength = this.analyser.frequencyBinCount;
//         const dataArray = this.frequency_array;
//         const barWidth = 5;
//         let barHeight;
//         let x = 0;
//         this.drawBar(bufferLength, x, barWidth, barHeight, dataArray, canvas);
//     }

//     imgLoad (canvas, img) {
//         ctx.save();
//         ctx.beginPath();
//         ctx.arc(canvas.width / 2, canvas.height / 2, 222, 0, Math.PI * 2);
//         ctx.strokeStyle = 'white';
//         ctx.stroke();
//         ctx.clip();
//         ctx.drawImage(img, canvas.width / 2 - 500 / 2, canvas.height / 2 - 500 / 2, 500, 500);
//         ctx.restore();
//     }

//     drawBar(bufferLength, x, barWidth, barHeight, dataArray, canvas) {
//         for (let i = 0; i < bufferLength; i++) {
//             barHeight = dataArray[i] * 1.8 + 225;
//             ctx.save();
//             ctx.translate(canvas.width / 2, canvas.height / 2);
//             // ctx.rotate(i * Math.PI * 2.315 / bufferLength);
//             ctx.rotate(i * Math.PI * 4 / bufferLength);
//             // ctx.fillStyle = 'white'
//             // ctx.fillRect(0,1, barWidth, barHeight + 2)
//             // const red = i * barHeight / 10;
//             // const green = i * 4;
//             // const blue = barHeight;
//             // ctx.fillStyle = 'white';
//             const hue = i * 4;
//             // ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
//             ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)';
//             ctx.fillRect(0, 0, barWidth, barHeight);
//             x += barWidth;
//             ctx.restore();
//         }
//         this.imgLoad(canvas, this.img)
//     }

//     componentDidMount() {
//         console.log('오디오', this.audio)
//         this.context = new (window.AudioContext || window.webkitAudioContext)();
//         this.source = this.context.createMediaElementSource(this.audio);
//         this.analyser = this.context.createAnalyser();
//         this.source.connect(this.analyser);
//         this.analyser.connect(this.context.destination);
//         this.frequency_array = new Uint8Array(this.analyser.frequencyBinCount);
//     }

//     togglePlay = () => {
//         if(this.audio.paused) {
//             console.log('현재 정지상태 재생 실행')
//             this.audio.play();
//             this.rafId = requestAnimationFrame(this.tick);
//         } else {
//             this.audio.pause();
//         cancelAnimationFrame(this.rafId);
//         }
//     }

//     tick = () => {
//         this.animationLooper(this.canvas.current);
//         this.analyser.getByteFrequencyData(this.frequency_array);
//         this.rafId = requestAnimationFrame(this.tick);
//     }

//     componentWillUnmount() {
//         cancelAnimationFrame(this.rafId);
//         this.analyser.disconnect();
//         this.source.disconnect();
//         localStorage.removeItem('title');
//         localStorage.removeItem('nickName');
//         localStorage.removeItem('soundTrack');
//         localStorage.removeItem('img');
//     }

//     render() {

//         console.log(this.track.title)
//         return (
//     <div id='visualizer'>
//         <button
//         className='go-main-button' onClick={() => {
//             this.props.goMain();
//         }}
//         >Go Main
//         </button>
//         <div className='inner-circle-control'>
//         <div className='inner-circle-title'>{this.track.title}</div>
//         <div className='inner-circle-artist'>{this.track.nickName}</div>
//         <button className='inner-circle-button' onClick={() => { this.togglePlay(); }}>
//             <img src={playPause} style={{ width: '50px', height: '50px' }} alt='play/pause' />
//         </button>
//         </div>
//         <canvas
//         id='canvas'
//         ref={this.canvas}
//         />
//     </div>
//     )
//     }
// }

// export default Canvas;
