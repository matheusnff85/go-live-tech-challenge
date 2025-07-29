import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/error-handler";

class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();

    //Rota de testes
    this.server.get("/teste", (_req, res) => res.json({ ok: true }));
  }

  private middlewares() {
    this.server.use(express.json()); // Habilita o uso de JSON no corpo das requisições
    this.server.use(cors());
    this.server.use(errorHandler);
  }

  private routes() {
    //this.server.use(routes);
  }
}

export default new App().server;
