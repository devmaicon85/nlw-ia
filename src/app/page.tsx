import { MainApp } from "@/components/MainApp";
import { Header } from "@/components/header";

export default async function Home() {
   
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <MainApp />
        </div>
    );
}
