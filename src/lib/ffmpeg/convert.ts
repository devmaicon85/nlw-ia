// imports
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import loadFfmpeg from './load';


export default async function convertVideoToAudio(video: File) {


    const ffmpeg = await loadFfmpeg();

    ffmpeg.writeFile('input.mp4', await fetchFile(video));

    // ffmpeg.on('log', log => console.log(log));

    ffmpeg.on('progress', (progress) => {
        console.log("Convert progress... ", Math.round(progress.progress * 100), "%");
    })


    await ffmpeg.exec([
        '-i', 'input.mp4', '-map', '0:a', '-b:a', '20k', '-acodec', 'libmp3lame', 'output.mp3'
    ])

    //    const audioFileBlob = new Blob([data], { type: "audio/mpeg" });
    // const audioFile = new File([audioFileBlob], 'audio.mp3', {
    //     type: 'audio/mpeg',
    // })

    const data = await ffmpeg.readFile('output.mp3');
    const audioFile = new File([data], 'audio.mp3', {
        type: 'audio/mpeg',
    });

    return audioFile;
}

