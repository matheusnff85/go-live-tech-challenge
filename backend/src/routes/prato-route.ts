import { Router } from "express";
import PratoController from "../controllers/prato-controller";
import verifyToken from "../middlewares/verify-token";

const pratoRouter = Router();
const pratoController = new PratoController();

pratoRouter.use(verifyToken);

// Rota para criar um prato
pratoRouter.post("/prato", pratoController.create);
// Rota para obter todos os pratos
pratoRouter.get("/prato", pratoController.getAll);
// Rota para obter um prato específico por ID
pratoRouter.get("/prato/:id", pratoController.getById);
// Rota para atualizar um prato
pratoRouter.put("/prato/:id", pratoController.update);
// Rota para deletar um prato (soft delete)
pratoRouter.delete("/prato/:id", pratoController.delete);

export default pratoRouter;
