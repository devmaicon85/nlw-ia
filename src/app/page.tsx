import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

import { FileVideo2, Upload, Wand2 } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex gap-6 p-6 flex-1">
                <div className="flex flex-col flex-1  gap-4">
                    <div className="grid grid-rows-2 gap-4 flex-1">
                        <Textarea
                            className="resize-none p-5 leading-relaxed"
                            placeholder="Inclua o prompt para a IA..."
                        />
                        <Textarea
                            className="resize-none p-5 leading-relaxed"
                            readOnly
                            placeholder="Resultado gerado pela IA..."
                        />
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Lembre-se: você pode utilizar a variável{" "}
                        <code className="text-violet-400">
                            {" "}
                            {`{transcription}`}{" "}
                        </code>
                        no seu prompt para adicionar a transcrição do vídeo
                        selecionado
                    </p>
                </div>

                <aside className="w-80 space-y-6">
                    <form className="space-y-6 flex flex-col">
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

                    <Separator />

                    <form className="space-y-4 flex flex-col">
                        <div className="space-y-2">
                            <Label>Prompt</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um prompt..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="title">
                                        Título do Youtube
                                    </SelectItem>
                                    <SelectItem value="description">
                                        Descrição do Youtube
                                    </SelectItem>
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
                                criativas, porém com maior probabilidade de
                                erros ou incoerências.
                            </span>

                            <Slider
                                min={0}
                                max={1}
                                step={0.1}
                                defaultValue={[0.4]}
                            />
                        </div>

                        <Separator />

                        <Button type="submit">
                            Executar <Wand2 className="w-4 h-4 ml-2" />
                        </Button>
                    </form>
                </aside>
            </main>
        </div>
    );
}
