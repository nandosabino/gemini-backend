import { sendStructuredRecipe } from "../services/geminiService.js";

export async function handleGenerate(req, res) {
  const { sessionId, dish } = req.body;

  if (
    !sessionId ||
    typeof sessionId !== "string" ||
    !dish ||
    typeof dish !== "string"
  ) {
    return res.status(400).json({
      error: "O campo 'sessionId' e 'dish' são obrigatórios.",
    });
  }

  try {
    const recipeObject = await sendStructuredRecipe(sessionId, dish);

    res.status(200).json(recipeObject);
  } catch (error) {
    console.error("Erro no Controller (JSON):", error.message);

    res.status(500).json({
      error: "Falha ao processar a receita.",
      details: error.message,
    });
  }
}
