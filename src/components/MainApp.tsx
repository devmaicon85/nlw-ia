"use client";

import { useRef, useState } from "react";
import { FormPrompt } from "./form-prompt";
import { FormUploadVideo } from "./form-upload-video";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";

import { useCompletion } from "ai/react";

export function MainApp() {
    const [temperature, setTemperature] = useState(0.5);
    const [videoId, setVideoId] = useState<String | null>(null);

    const {
        input,
        setInput,
        handleInputChange,
        handleSubmit,
        completion,
        isLoading,
    } = useCompletion({
        api: `${process.env.NEXT_PUBLIC_API_URL}/ai/complete`,
        body: {
            videoId,
            temperature,
        },
        headers: {
            "Content-Type": "application/json",
        },
    });

    return (
        <main className="flex flex-col md:flex-row gap-6 p-6 flex-1">
            <div className="flex flex-col flex-1  gap-4">
                <div className="grid grid-rows-2 gap-4 flex-1">
                    <Textarea
                        className="resize-none p-5 leading-relaxed"
                        placeholder="Inclua o prompt para a IA..."
                        value={input}
                        onChange={handleInputChange}
                    />
                    <Textarea
                        className="resize-none p-5 leading-relaxed"
                        readOnly
                        placeholder="Resultado gerado pela IA..."
                        value={completion}
                    />
                </div>
                <p className="text-sm text-muted-foreground">
                    Lembre-se: você pode utilizar a variável
                    <code className="text-violet-400">
                        {` {transcription} `}
                    </code>
                    no seu prompt para adicionar a transcrição do vídeo
                    selecionado
                </p>
            </div>

            <aside className="md:w-80 space-y-6">
                <FormUploadVideo onVideoId={setVideoId} />

                <Separator />

                <FormPrompt
                    onPromptSelected={setInput}
                    onTemperature={setTemperature}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </aside>
        </main>
    );
}
