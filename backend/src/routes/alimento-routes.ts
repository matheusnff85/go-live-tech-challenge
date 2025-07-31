import { Router } from "express";
import AlimentoController from "../controllers/alimento-controller";
import verifyToken from "../middlewares/verify-token";

const alimentoRoutes = Router();
const alimentoController = new AlimentoController();

alimentoRoutes.use(verifyToken); // Middleware para verificar o token

// Rota de criação de alimento
alimentoRoutes.post("/alimento", alimentoController.create);
// Rota para buscar todos os alimentos
alimentoRoutes.get("/alimento", alimentoController.getAll);
// Rota para buscar um alimento específico
alimentoRoutes.get("/alimento/:id", alimentoController.getById);
// Rota para atualizar um alimento
alimentoRoutes.put("/alimento/:id", alimentoController.update);
// Rota para deletar um alimento
alimentoRoutes.delete("/alimento/:id", alimentoController.delete);

export default alimentoRoutes;
