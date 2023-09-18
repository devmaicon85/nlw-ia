import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

import { openai } from '@/lib/openai';
import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';


export async function POST(req: NextRequest, res: NextApiResponse) {

    // Get formData from request
    const formData = await req.formData();

    // Get file from formData
    const file = formData.get('file');
    const prompt = formData.get('prompt')?.toString();


    if (!file) {
        return NextResponse.json({ error: 'File not found' })
    }

    const response = await openai.audio.transcriptions.create({
        file: file as unknown as File,
        model: "whisper-1",
        language: "pt",
        response_format: "json",
        temperature: 0,
        prompt,
    });


    const transcription = response.text;


    const video = await prisma.video.create({
        data: {
            name: randomUUID(),
            path: randomUUID(),
            transcription
        }
    })
    



    return NextResponse.json({ transcription,  video});

}