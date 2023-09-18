"use client";

import { CheckIcon, FileVideo2, Upload } from "lucide-react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
    ChangeEvent,
    FormEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { api } from "@/lib/axios";
import { convertVideoToAudio } from "@/lib/ffmpeg/convert";

type Status = "waiting" | "converting" | "uploading" | "generating" | "success";

const statusMessages = {
    waiting: "Carregar vídeo",
    converting: "Convertendo...",
    uploading: "Enviando...",
    generating: "Transcrevendo...",
    success: "Sucesso!",
};

type Props = {
    onTranscription: (transcription: string) => void;
};

export function FormUploadVideo({ onTranscription }: Props) {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const keywordsInputRef = useRef<HTMLTextAreaElement>(null);
    const [status, setStatus] = useState<Status>("waiting");

    async function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
        const { files } = event.currentTarget;

        if (!files) {
            return;
        }

        const selectedFile = files.item(0);
        setVideoFile(selectedFile);
    }

    async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const keywords = keywordsInputRef.current?.value;

        if (!videoFile) {
            return;
        }

        if (!keywords) {
            alert("informe algumas palavras chaves que tenha no vídeo");
            return;
        }

        setStatus("converting");
        const audioFile = await convertVideoToAudio(videoFile);

        setStatus("generating");

        const data = new FormData();
        data.append("file", audioFile);
        data.append("keywords", keywords);

        const response = await api.post("/videos", data);
        const transcription = response.data.video.transcription;

        setStatus("success");

        onTranscription(transcription);
    }

    const previewURL = useMemo(() => {
        return videoFile ? URL.createObjectURL(videoFile) : null;
    }, [videoFile]);

    return (
        <form onSubmit={handleUploadVideo} className="space-y-6 flex flex-col">
            <label
                htmlFor="video"
                className=" border w-full rounded-md aspect-video justify-center items-center flex cursor-pointer border-dashed text-sm gap-2 text-muted-foreground hover:bg-primary-foreground"
            >
                {previewURL ? (
                    <video
                        src={previewURL}
                        controls={false}
                        className="pointer-events-none"
                    />
                ) : (
                    <>
                        <FileVideo2 className="w-4 h-4" />
                        Selecione um vídeo
                    </>
                )}
            </label>
            <input
                type="file"
                id="video"
                accept="video/mp4"
                className="sr-only"
                onChange={handleFileSelected}
            />

            <div className="space-y-2">
                <Label htmlFor="transcription_keywords">
                    Palavras chaves da transcrição
                </Label>
                <Textarea
                    id="transcription_keywords"
                    disabled={status !== "waiting"}
                    ref={keywordsInputRef}
                    className="h-20 leading-relaxed"
                    placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
                />
            </div>

            <Button
                data-success={status === "success"}
                disabled={status !== "waiting"}
                type="submit"
                className={`w-full data-[success=true]:bg-emerald-400`}
            >
                {status === "success" && <CheckIcon className="h-5 w-5 mr-2" />}

                {statusMessages[status]}

                {status === "waiting" && <Upload className="w-4 h-4 ml-2" />}
            </Button>
        </form>
    );
}
