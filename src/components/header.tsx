import { GithubIcon } from "lucide-react";
import { Logo } from "./logo";
import { ToggleTheme } from "./toggle-theme";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export function Header() {
    return (
        <div className="px-6 py-3 flex flex-col md:flex-row gap-4 items-center justify-between border-b">
            <Logo />

            <div className="gap-3 items-center flex flex-col md:flex-row ">
                <span className="text-xs text-muted-foreground">
                    Desenvolvido na NLW da Rocketseat 🚀
                </span>

                <Separator
                    orientation="vertical"
                    className="h-6 hidden md:block"
                />

                <div className="flex gap-2">
                    <Button variant="outline">
                        <GithubIcon className="w-4 h-4 mr-2" /> Login
                    </Button>
                    <Separator
                        orientation="vertical"
                        className="h-6 hidden md:block"
                    />
                    <ToggleTheme />
                </div>
            </div>
        </div>
    );
}
