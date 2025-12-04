import express from "express";
import "dotenv/config";
import geminiRoutes from "./src/routes/geminiRoutes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

app.use("/api/gemini", geminiRoutes);

app.listen(PORT, () => {
  console.log(`Servidor Rodando na Porta ${PORT}`);
  console.log(
    `Endpoint de Teste: PORT https://localhost:${PORT}/api/gemini/generate`
  );
});
