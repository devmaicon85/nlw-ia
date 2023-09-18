import { openai } from "@/lib/openai"
import { NextRequest } from "next/server"
import { z } from 'zod'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { NextApiResponse } from "next"


export const runtime = 'edge'

export async function POST(request: NextRequest, response: NextApiResponse) {

    const bodySchema = z.object({
        prompt: z.string(),
        temperature: z.number().min(0).max(1).default(0.5),
        transcription: z.string()
    })

    const { prompt, temperature, transcription } = bodySchema.parse(await request.json())

    const promptMessage = prompt.replace('{transcription}', transcription)

    const opeanAiComplete = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-16k',
        temperature,
        messages: [{
            role: 'user', content: promptMessage
        }],
        stream: true
    })

    const stream = OpenAIStream(opeanAiComplete)

    return new StreamingTextResponse(stream)

 
}