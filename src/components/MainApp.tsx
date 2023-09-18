"use client";

import { useEffect, useRef, useState } from "react";
import { FormUploadVideo } from "./form-upload-video";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";

import { useCompletion } from "ai/react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Wand2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { api } from "@/lib/axios";

type Prompt = {
    id: string;
    title: string;
    template: string;
    isLoading: boolean;
};

export function MainApp() {
    const [temperature, setTemperature] = useState(0.5);
    const [transcription, setTranscription] = useState("");

    const {
        input,
        setInput,
        handleInputChange,
        handleSubmit,
        completion,
        isLoading,
    } = useCompletion({
        api: `${process.env.NEXT_PUBLIC_API_URL}/ai`,
        body: {
            transcription,
            temperature,
        },
        headers: {
            "Content-Type": "application/json",
        },
    });

    const [prompts, setPrompts] = useState<Prompt[]>([]);

    useEffect(() => {
        api.get("/prompts").then((response) => {
            setPrompts(response.data);
        });
    }, []);

    function handlePromptSelected(promptId: string) {
        const selectedPrompt = prompts?.find(
            (prompt: Prompt) => prompt.id === promptId
        );

        if (!selectedPrompt) {
            return;
        }

        // onPromptSelected(selectedPrompt.template);
        setInput(selectedPrompt.template);
    }

    return (
        <main className="flex flex-col md:flex-row gap-6 p-6 flex-1">
            <div className="flex flex-col flex-1  gap-4">
                <div className="gap-4 grid grid-rows-3 h-full">
                    <Textarea
                        className="p-5 leading-relaxed"
                        placeholder="Transcrição do vídeo..."
                        value={transcription}
                        onChange={(e) => setTranscription(e.target.value)}
                    />

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
                <FormUploadVideo onTranscription={setTranscription} />

                <Separator />

                {/* <FormPrompt
                    onPromptSelected={setInput}
                    onTemperature={setTemperature}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                /> */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 flex flex-col"
                >
                    <div className="space-y-2">
                        <Label>Prompt</Label>
                        <Select onValueChange={handlePromptSelected}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione um prompt..." />
                            </SelectTrigger>
                            <SelectContent>
                                {prompts.map((prompt: Prompt) => {
                                    return (
                                        <SelectItem
                                            value={prompt.id}
                                            key={prompt.id}
                                        >
                                            {prompt.title}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Modelo</Label>
                        <Select defaultValue="gpt3.5" disabled>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="gpt3.5">
                                    GPT 3.5-turbo 16k
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="block text-sm text-muted-foreground italic">
                            Você poderá customizar essa opção em breve
                        </span>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <Label>Temperatura</Label>
                        <span className="block text-sm text-muted-foreground italic">
                            Aumentar a temperatura resulta em respostas mais
                            criativas, porém com maior probabilidade de erros ou
                            incoerências.
                        </span>

                        <Slider
                            min={0}
                            max={1}
                            step={0.1}
                            defaultValue={[0.5]}
                            onValueChange={(value) => setTemperature(value[0])}
                        />
                    </div>

                    <Separator />

                    <Button type="submit" disabled={isLoading}>
                        Executar <Wand2 className="w-4 h-4 ml-2" />
                    </Button>
                </form>
            </aside>
        </main>
    );
}
