import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

import { openai } from '@/lib/openai';
import { prisma } from '@/lib/prisma';


export async function POST(req: NextRequest, res: NextApiResponse) {

    // Get formData from request
    const formData = await req.formData();

    // Get file from formData
    const file = formData.get('file');
    const keywords = formData.get('keywords')?.toString();


    if (!file) {
        return NextResponse.json({ error: 'File not found' })
    }

    if (!keywords) {
        return NextResponse.json({ error: 'Keywords not found' })
    }

    try {
        const response = await openai.audio.transcriptions.create({
            file: file as unknown as File,
            model: "whisper-1",
            language: "pt",
            response_format: "json",
            temperature: 0,
            prompt: keywords,
        });


        const transcription = response.text;

        const video = await prisma.video.create({
            data: {
                keywords,
                transcription,
            }
        })

        return NextResponse.json({ transcription, video });

    } catch (error) {
        console.log("🚀 ~ file: route.ts:49 ~ POST ~ error:", error)
        return NextResponse.json({ error })

    }


}