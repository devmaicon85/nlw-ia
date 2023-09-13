import { GithubIcon } from "lucide-react";
import { Logo } from "./logo";
import { ToggleTheme } from "./toggleTheme";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export function Header() {
    return (
            <div className="px-6 py-3 flex flex-col md:flex-row gap-4 items-center justify-between border-b">
                <Logo />

                <div className="gap-3 items-center flex ">
                    <span className="text-sm text-muted-foreground">
                        Desenvolvido com 💟 no NLW da Rocketseat
                    </span>

                    <Separator orientation="vertical" className="h-6" />
                    <Button variant="outline">
                        <GithubIcon className="w-4 h-4 mr-2" /> Login
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <ToggleTheme />
                </div>
            </div>
    );
}
