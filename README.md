# Projeto de IA com Transcrição de Vídeo e Geração de Conteúdo para YouTube

Este projeto foi desenvolvido como parte da Next Level Week (NLW) da Rocketseat. O objetivo principal é permitir a transcrição de vídeos MP4 usando a API da OpenAI e gerar prompts para a criação de títulos e descrições para vídeos no YouTube. Além disso, foi feita uma melhoria significativa, migrando o projeto original para o Next.js. Foi eliminando também a necessidade de armazenar o arquivo de áudio no servidor permitindo utilizar servidores serverless sem problemas.

## Tecnologias Utilizadas

-   **Next.js** 13.4
-   **Tailwind CSS**
-   **Prisma**
-   **OpenAI API**
-   **ffmpeg** (para conversão de vídeo em áudio no navegador do usuário)

## Funcionalidades Principais

1. **Transcrição de Vídeo**:

    - Os usuários podem enviar vídeos no formato MP4.
    - A OpenAI é utilizada para transcrever o conteúdo de áudio dos vídeos.

2. **Geração de Conteúdo para YouTube**:

    - Com base na transcrição, prompts prontos são gerados para ajudar na criação de títulos e descrições para vídeos no YouTube.

3. **Conversão de Vídeo para Áudio**:
    - É realizada uma conversão para formato MP3 diretamente no navegador do usuário, utilizando a biblioteca `ffmpeg`, dispensando a necessidade de enviar e armazenar o vídeo completo no servidor.

## Melhorias Realizadas

Uma melhoria significativa foi feita na estrutura do projeto original. Agora, o projeto foi migrado para o Next.js, o que eliminou a necessidade de armazenar o arquivo de áudio no servidor. Com essa melhoria, o projeto se tornou mais eficiente e escalável.
