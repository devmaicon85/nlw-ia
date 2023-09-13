"use client";

import { FileVideo2, Upload } from "lucide-react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
// import "@uploadthing/react/styles.css";


export function FormUploadVideo() {
    const [file, setFile] = useState<File>();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;

        try {
            const data = new FormData();
            data.set("file", file);

            const res = await fetch("/api/videos", {
                method: "POST",
                body: data,
            });

            console.log(
                "🚀 ~ file: formUploadVideo.tsx:27 ~ onSubmit ~ res:",
                res
            );
            // handle the error
            if (!res.ok) throw Error(await res.text());
        } catch (error: any) {
            console.error(
                "🚀 ~ file: formUploadVideo.tsx:32 ~ onSubmit ~ error:",
                error
            );
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6 flex flex-col">
            <label
                htmlFor="video"
                className="border w-full rounded-md aspect-video justify-center items-center flex cursor-pointer border-dashed text-sm gap-2 text-muted-foreground hover:bg-primary-foreground"
            >
                <FileVideo2 className="w-4 h-4" />
                Selecione um vídeo
            </label>
            <input
                type="file"
                id="video"
                accept="video/mp4"
                className="sr-only"
            />

          

            <div className="space-y-2">
                <Label htmlFor="transcription_prompt">
                    Prompt de transcrição
                </Label>
                <Textarea
                    id="transcription_prompt"
                    className="h-20 leading-relaxed"
                    placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
                />
            </div>

            <Button type="submit" className="w-full">
                Carregar vídeo <Upload className="w-4 h-4 ml-2" />
            </Button>
        </form>
    );
}
