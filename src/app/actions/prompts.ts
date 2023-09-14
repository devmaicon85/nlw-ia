'use server'

export async function prompts(){
    const fetchPrompt = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/prompts`,
        { next: { revalidate: 60 } }
    );
    const prompts = await fetchPrompt.json();

    return prompts;
}