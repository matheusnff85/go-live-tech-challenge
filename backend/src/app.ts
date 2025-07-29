import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/error-handler";
import authRoutes from "./routes/auth-route";

class App {
  public server: express.Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();

    //Rota de testes
    this.server.get("/teste", (_req, res) => res.json({ ok: true }));
  }

  private middlewares() {
    this.server.use(express.json()); // Habilita o uso de JSON no corpo das requisições
    this.server.use(cors());
  }

  private routes() {
    this.server.use(authRoutes);
  }

  private exceptionHandler() {
    this.server.use(errorHandler);
  }
}

export default new App().server;
