/** CONFERENCE+ API - Por: Luiz Carlos dos Santos Júnior
 *
 * Aplicação desenvolvida com Express.js para a avaliação
 * de Interação com APIs, que ocorrerá dos dias 12/08/2024
 * à 16/08/2024.
 *
 **/

// Dependências:
import "dotenv/config";
import express from "express";
import path from "node:path";

// Importação de modelos de dados (entidades):
import "./models/speakerModel.js";

// Importação de roteadores:
import speakerRouter from "./routes/speakerRoutes.js";

// Gerando constantes do servidor:
const PORT = process.env.PORT;
const app = express();

// Middlewares globais:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ao iniciar o servidor:
app.listen(PORT, () => {
  console.clear();
  console.log("=:=:=:= BEM VINDO À CONFERENCE+ API! =:=:=:=");
  console.log("Sua melhor aliada na organização de eventos!");
  console.log(`Servidor no PORT: ${PORT} 🚀 \nVersão: 1.0.0 🔧 \n`);
});

// Rotas utilizadas:
app.use("/eventos/palestrantes", speakerRouter);

// Rota não encontrada:
app.use((request, response) => {
  response.status(404).json({
    message: "Rota não encontrada.",
    tip: "Certifique-se de que você digitou a URL corretamente.",
  });
});
