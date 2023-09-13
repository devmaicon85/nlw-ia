import { UploadCloudIcon } from "lucide-react";

export function Logo() {
    return (
        <div className="text-xl font-bold flex gap-2 items-center select-none ">
            <UploadCloudIcon className="w-10 h-10 text-primary" />{" "}
            <span className="-ml-1">video.</span>
            <span className=" -ml-2 text-2xl">
                <code>IA</code>
            </span>
        </div>
    );
}
