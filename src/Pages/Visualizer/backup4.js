// import React, { useEffect } from 'react'
// import { useRef } from 'react';
// import './visualizer.css'
// // import song from '../audio/DPR LIVE - To Myself.mp3'
// const song = 'https://take-closet-bucket.s3.ap-northeast-2.amazonaws.com/%EC%9D%8C%EC%95%85/05.+%EB%B0%94%EB%9E%8C%EC%9D%B4%EB%82%98+%EC%A2%80+%EC%90%90+(Feat.+MIWOO).mp3'
// function Visualizer2 () {
//     let ctx, canvas
//     const audio1 = new Audio();
//     const audioRef = useRef(audio1)
//     audioRef.current.src = song;
//     audioRef.current.crossOrigin = "anonymous";
//     console.log(audioRef)
//     const audioCtx = new AudioContext()
//     const audioSource = audioCtx.createMediaElementSource(audioRef.current);
//     const analyser = audioCtx.createAnalyser();

//     // const audio1 = useRef()
//     // const audioRef = useRef(null)
//     console.log(audioRef)

//     // console.log(audioCtx)
//     const canvasRef = useRef(null);
//     console.log(canvasRef)
//     // canvas.width = window.innerWidth;
//     // canvas.height = window.innerHeight;
//     // const ctx = canvasRef.getContext('2d')

//     useEffect(()=>{
//         // audioCtx.resume();
//         console.log(audioRef)
//         canvas = canvasRef.current;
//         console.log(canvas)
//         //canvas 높이 넓이 조정
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//         // getContext 메서드를 이용해서, 랜더링 컨텍스트와 (렌더링 컨텍스트의) 그리기 함수들을 사용할 수 있습니다.
//         ctx = canvas.getContext('2d')

//     },[])

//     // 값을 받아 canvas에 시각화 해주는 함수
//     function drawVisualizer (bufferLength, x, barWidth, barHeight, dataArray) {
//         for(let i = 0; i< bufferLength; i++){
//             console.log('dd')
//             barHeight = dataArray[i] * 2 + 150;
//             ctx.save();
//             ctx.translate(canvas.width/2, canvas.height/2);
//             // ctx.rotate(i * Math.PI * 2.315 / bufferLength);
//             ctx.rotate(i * Math.PI * 4 / bufferLength);
//             // ctx.fillStyle = 'white'
//             // ctx.fillRect(0,1, barWidth, barHeight + 2)
//                         const red = i * barHeight/10;
//                     const green = i * 4;
//             const blue = barHeight;
//             ctx.fillStyle = 'white'
//             const hue = i * 8;
//             // ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
//             ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)';
//             ctx.fillRect(0,0, barWidth, barHeight)
//             x += barWidth;
//             ctx.restore();
//         }
//         // for(let i = 0; i< bufferLength; i++){
//         //     barHeight = dataArray[i]*2;
//         //     const red = i * barHeight/10;
//         //     const green = i * 4;
//         //     const blue = barHeight;
//         //     ctx.fillStyle = 'white'
//         //     ctx.fillRect(canvas.width/2-x, canvas.height - barHeight - 10, barWidth, 5)
//         //     ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
//         //     ctx.fillRect(canvas.width/2-x, canvas.height - barHeight, barWidth, barHeight)
//         //     x = x + barWidth;
//         // }
//         // for(let i = 0; i< bufferLength; i++){
//         //     barHeight = dataArray[i]*2;
//         //     const red = i * barHeight;
//         //     const green = i * 8;
//         //     const blue = barHeight/3;
//         //     ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
//         //     ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
//         //     x = x + barWidth;
//         // }
//     }

//     function click () {
//         console.log('click')
//         if(audioRef.current.paused){
//             audioCtx.resume();
//             console.log(audioCtx)
//             audioRef.current.play()
//             console.log('여기는 실행')
//         }else {
//             audioRef.current.pause()
//             console.log('여기는 정지')
//         }
//         // audioRef.current.volume = 0.1;

//         // audioRef.current.onplaying = function () {
//         //     console.log('실행')
//         // }
//         // audioRef.current.onended = function () {
//         //     console.log('멈춤')
//         // }

//         audioSource.connect(analyser);
//         analyser.connect(audioCtx.destination)
//         console.log('@@@@@',audioSource)
//         analyser.fftSize = 512;
//         const bufferLength = analyser.frequencyBinCount;
//         const dataArray = new Uint8Array(bufferLength);
//         console.log(analyser)
//         // const barWidth = (canvas.width/2)/bufferLength;
//         const barWidth = 5;
//         let barHeight;
//         let x = 0
//         function animate(){
//             x = 0;
//             ctx.clearRect(0,0,canvas.width, canvas.height);
//             analyser.getByteFrequencyData(dataArray);
//             drawVisualizer (bufferLength, x, barWidth, barHeight, dataArray)
//             requestAnimationFrame(animate)
//         }
//         animate();
//     }

//     // function click2 () {
//     //     console.log('click2')
//     //     audio1.pause()
//     // }

//     // function click3 () {
//     //     console.log('click3')
//     //     const oscillator = audioCtx.createOscillator();
//     //     oscillator.connect(audioCtx.destination)
//     //     console.log(audioCtx,oscillator)
//     //     oscillator.type = 'triangle';
//     //     oscillator.start();
//     //     setTimeout(()=>{
//     //         oscillator.stop()
//     //     },1000)
//     // }

//     return (
//         <div id='container' onClick={()=>{click()}}>
//             <canvas id="canvas"
//             ref={canvasRef}
//             />
//             {/* <audio id="audio1" ref={audioRef} controls autoPlay/> */}

//         </div>
//     );
// }

// export default Visualizer2
