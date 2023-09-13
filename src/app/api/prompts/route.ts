export async function GET(){

    const response = await fetch(`${process.env.URL_API}/prompts`)

    return response;
}