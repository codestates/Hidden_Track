import React, { useEffect } from 'react'
import { useRef } from 'react';
import './Canvas.scss'
// import song from '../audio/DPR LIVE - To Myself.mp3'

function Canvas ({crrentMusic, setCrrentMusic, playList}) {

    const audio = useRef()
    const canvas = useRef()

    const width = window.innerWidth;
    const height = window.innerHeight;

    let  context, source, analyser, ctx, frequency_array, rafId
    console.log('ff')
    useEffect(() => {
        console.log(audio.current)
        audio.current.src = crrentMusic.soundtrack
        audio.current.volume = 0.1;
        audio.current.crossOrigin = "anonymous";
        audio.current.onplaying = () => {console.log('실행')}
        context = new (window.AudioContext || window.webkitAudioContext)();
        source = source || context.createMediaElementSource(audio.current);
        analyser = context.createAnalyser();
        source.connect(analyser);
        analyser.connect(context.destination);
        frequency_array = new Uint8Array(analyser.frequencyBinCount);
        return (() => {
            console.log('실행?')
            cancelAnimationFrame(rafId);
            analyser.disconnect();
            source.disconnect();
        })
    },[])
    console.log('dd')
    function animationLooper(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx = canvas.getContext("2d");
        analyser.fftSize = 512;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = frequency_array;
        const barWidth = 5;
        let barHeight;
        let x = 0;
        //draw a bar
        drawBar(bufferLength, x, barWidth, barHeight, dataArray, canvas);
    }

    function drawBar(bufferLength, x, barWidth, barHeight, dataArray, canvas) {
        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 1.8 + 50;
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
            const hue = i * 8;
            // ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
            ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)';
            ctx.fillRect(0, 0, barWidth, barHeight);
            x += barWidth;
            ctx.restore();
        }
    }

    function tick () {
        animationLooper(canvas.current);
        analyser.getByteFrequencyData(frequency_array);
        rafId = requestAnimationFrame(tick);
    }

    function togglePlay () {
        if(audio.current.paused) {
            context.resume()
            audio.current.play();
            rafId = requestAnimationFrame(tick);

         } else {
            audio.current.pause();
            // cancelAnimationFrame(rafId);
         }
    }

    function next () {
        setCrrentMusic(playList[playList.indexOf(crrentMusic) - 1])
    }


    return (
        <div id='container' >
            <canvas id="canvas" 
            ref={canvas} 
            />
            <div>
                <button onClick={()=>{togglePlay()}}>play/pause</button>
                <button onClick={() => {next()}}>next</button>
            </div>
            <audio id="audio1" ref={audio} />

        </div>
    );
}

export default Canvas