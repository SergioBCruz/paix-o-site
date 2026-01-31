<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1mKQ13jE52_fu32zrjtbJFu7WaR0XEHaU

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Como rodar com buscas reais (Skyscanner via proxy)

Para desativar chamadas reais e usar apenas o mock/local, defina no `.env.local` (ou no ambiente):

```
VITE_USE_REAL_API=false
```

Com `false` (padrão), o frontend não chama o proxy RapidAPI e usa os dados mock/local. Para reativar chamadas reais, use `VITE_USE_REAL_API=true`.

1. Crie um arquivo `.env` na raiz com sua chave do RapidAPI:

   ```
   SKYSCANNER_API_KEY=SUAS_CHAVES_RAPIDAPI
   PORT=8788
   ```

2. Suba o proxy local (protege a chave e evita CORS):

   ```
   node server.cjs
   ```

3. Em outro terminal, rode o frontend:

   ```
   npm run dev
   ```

   Acesse http://localhost:5173 (o Vite já faz proxy de `/api` para `http://localhost:8788`).

4. No formulário, escolha moeda, tipo de viagem (ida/volta/multitrecho) e busque. Se a API responder, você verá tarifas reais; em falha, o mock assume.

Observações:
- A resposta do Skyscanner pode variar por plano/endpoint. Se o formato mudar, compartilhe o payload para ajustarmos o parser em `mapSkyscannerToFlights`.
- Não exponha a chave no frontend; o proxy já a protege.
