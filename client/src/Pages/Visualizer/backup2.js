// import React, { Component, createRef } from 'react';



// // Changing Variables
// let ctx

// // constants
// const width = window.innerWidth;
// const height = window.innerHeight;


// class CanvasTwo extends Component {
//     constructor(props) {
//         super(props)
//         this.audio = createRef();
//         this.canvas = createRef();
//     }
    
//      animationLooper(canvas) {
//         canvas.width = width;
//         canvas.height = height;

//         ctx = canvas.getContext("2d");
//         this.analyser.fftSize = 512;
//         const bufferLength = this.analyser.frequencyBinCount;
//         const dataArray = this.frequency_array;
//         const barWidth = 5;
//         let barHeight;
//         let x = 0;
//             //draw a bar
//             this.drawBar(bufferLength, x, barWidth, barHeight, dataArray, canvas);
//     }

//       drawBar(bufferLength, x, barWidth, barHeight, dataArray, canvas) {
//         for (let i = 0; i < bufferLength; i++) {
//             barHeight = dataArray[i] * 1.8 + 50;
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
//             const hue = i * 8;
//             // ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
//             ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)';
//             ctx.fillRect(0, 0, barWidth, barHeight);
//             x += barWidth;
//             ctx.restore();
//         }
//     }

//     componentDidMount() {
//         console.log(this.audio)
//         this.audio.current.src = this.props.crrentMusic.soundtrack
//         this.audio.current.volume = 0.1;
//         this.audio.current.crossOrigin = "anonymous";
//         this.audio.current.onplaying = () => {console.log('실행')}
//         this.context = new (window.AudioContext || window.webkitAudioContext)();
//         this.source = this.context.createMediaElementSource(this.audio.current);
//         this.analyser = this.context.createAnalyser();
//         this.source.connect(this.analyser);
//         this.analyser.connect(this.context.destination);
//         this.frequency_array = new Uint8Array(this.analyser.frequencyBinCount);
//     }

//      togglePlay = () => {
//         this.context.resume()
//         const audio = this.audio.current;
//         if(audio.paused) {
//             audio.play();
//             this.rafId = requestAnimationFrame(this.tick);

//          } else {
//             audio.pause();
//             // cancelAnimationFrame(this.rafId);
//          }
//     }

//     // next= () => {
//     //     const {setCrrentMusic, playList, crrentMusic} = this.props
//     //     console.log(setCrrentMusic)
//     //     setCrrentMusic(playList[playList.indexOf(crrentMusic + 1)])
//     //     this.audio.src = crrentMusic.soundtrack
//     // }

//     tick = () => {
//         this.animationLooper(this.canvas.current);
//         this.analyser.getByteFrequencyData(this.frequency_array);
//         this.rafId = requestAnimationFrame(this.tick);
//     }

//      componentWillUnmount() {
//         cancelAnimationFrame(this.rafId);
//         this.analyser.disconnect();
//         this.source.disconnect();
//     }

//     render() {
//         console.log(this.props)
        
//         return <>
//             <audio ref={this.audio}></audio>
//             <canvas ref={this.canvas}  />
//             <div className="music-controller">
//             <button onClick={this.togglePlay}>Play/Pause</button>
//             {/* <button>next</button> */}
//             </div>
            
//         </>
//     }
// }

// export default CanvasTwo;