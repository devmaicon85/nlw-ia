"use client";

import { Wand2 } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { Slider } from "./ui/slider";

import { FormEvent, useEffect, useState } from "react";
import { api } from "@/lib/axios";

type Prompt = {
    id: string;
    title: string;
    template: string;
    isLoading:boolean
};

type Props = {
    onPromptSelected: (template: string) => void;
    onTemperature: (temperature: number) => void;
    onSubmit:(e: FormEvent<HTMLFormElement>)=>void;
    isLoading:boolean
};

export function FormPrompt({ onPromptSelected, onTemperature, onSubmit, isLoading }: Props) {
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

        onPromptSelected(selectedPrompt.template);
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4 flex flex-col">
            <div className="space-y-2">
                <Label>Prompt</Label>
                <Select onValueChange={handlePromptSelected}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione um prompt..." />
                    </SelectTrigger>
                    <SelectContent>
                        {prompts.map((prompt: Prompt) => {
                            return (
                                <SelectItem value={prompt.id} key={prompt.id}>
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
                    Aumentar a temperatura resulta em respostas mais criativas,
                    porém com maior probabilidade de erros ou incoerências.
                </span>

                <Slider
                    min={0}
                    max={1}
                    step={0.1}
                    defaultValue={[0.5]}
                    onValueChange={(value) => onTemperature(value[0])}

                />
            </div>

            <Separator />

            <Button type="submit" disabled={isLoading}>
                Executar <Wand2 className="w-4 h-4 ml-2" />
            </Button>
        </form>
    );
}
