import React, { useEffect } from 'react'
import { useRef } from 'react';
import './Canvas.scss'
// import song from '../audio/DPR LIVE - To Myself.mp3'

function Canvas ({crrentMusic}) {

    const song = crrentMusic.soundtrack
    
    let audioCtx,audioSource, analyser, ctx, canvas, bufferLength, dataArray
    // let audio1 = new Audio();
    // const audio1 = useRef()
    const audioRef = useRef(null) 
    console.log(audioRef)
    
    // console.log(audioCtx)
    const canvasRef = useRef(null);
    console.log(canvasRef)
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // const ctx = canvasRef.getContext('2d')

    useEffect(()=>{
        // audioCtx.resume();
        console.log(audioRef)
        audioCtx = new AudioContext()
        audioRef.current.src = song;
        audioRef.current.volume = 0.1;
        audioRef.current.crossOrigin = "anonymous";
        audioRef.current.onplaying = function () {
            console.log('실행')
        }
        audioRef.current.onended = function () {
            console.log('멈춤')
        }
        audioSource = audioCtx.createMediaElementSource(audioRef.current);
        analyser = audioCtx.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioCtx.destination)
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        canvas = canvasRef.current;
        console.log(canvas)
        //canvas 높이 넓이 조정
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // getContext 메서드를 이용해서, 랜더링 컨텍스트와 (렌더링 컨텍스트의) 그리기 함수들을 사용할 수 있습니다.
        ctx = canvas.getContext('2d')

        return (() => {
            analyser.disconnect();
            audioSource.disconnect();
        })
    },[])

    // 값을 받아 canvas에 시각화 해주는 함수
    function drawVisualizer (bufferLength, x, barWidth, barHeight, dataArray) {
        for(let i = 0; i< bufferLength; i++){
            barHeight = dataArray[i] * 2 + 150;
            ctx.save();
            ctx.translate(canvas.width/2, canvas.height/2);
            // ctx.rotate(i * Math.PI * 2.315 / bufferLength);
            ctx.rotate(i * Math.PI * 4 / bufferLength);
            // ctx.fillStyle = 'white'
            // ctx.fillRect(0,1, barWidth, barHeight + 2)
                        const red = i * barHeight/10;
                    const green = i * 4;
            const blue = barHeight;
            ctx.fillStyle = 'white'
            const hue = i * 4;
            // ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
            ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)';
            ctx.fillRect(0,0, barWidth, barHeight)
            x += barWidth;
            ctx.restore();
        }
    }

    function animate(bufferLength, x, barWidth, barHeight, dataArray ){
        x = 0;
        ctx.clearRect(0,0,canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        drawVisualizer (bufferLength, x, barWidth, barHeight)
        requestAnimationFrame(animate)
    }

    function click () {
        console.log('click')
        audioCtx.resume();
        if(audioRef.current.paused){
            audioRef.current.play()
            analyser.fftSize = 512;
        console.log(analyser)
        // const barWidth = (canvas.width/2)/bufferLength;
        const barWidth = 5;
        let barHeight;
        let x = 0

        animate(bufferLength, x, barWidth, barHeight, dataArray );
        }else {
            audioRef.current.pause()
            console.log('끝')
        }
        
    }

    return (
        <div id='container' >
            <canvas id="canvas" 
            ref={canvasRef} 
            />
            <div>
                <button onClick={()=>{click()}}>play/pause</button>
            </div>
            <audio id="audio1" ref={audioRef} />

        </div>
    );
}

export default Canvas