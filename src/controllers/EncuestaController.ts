//Author: Geardo Rios

import { Response, Request } from "express";
import AbstractController from "./AbstractController";
import EncuestaModel from "../modelsNoSQL/Encuesta";

class EncuestaController extends AbstractController {
  private static _instance: EncuestaController;

  public static get instance(): AbstractController {
    if (!this._instance) {
      this._instance = new this("EncuestaModel");
    }
    return this._instance;
  }

  protected initRoutes(): void {
    this.router.post("/postEncuesta", this.postEncuesta.bind(this));
    this.router.get("/getEncuesta", this.getEncuesta.bind(this));
    
  }


  private async getEncuesta(req: Request, res: Response) {
    try {
      const encuesta = await EncuestaModel.scan().exec().promise();
      console.log(encuesta);
      res.status(200).send(encuesta[0].Items);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error " + error);
    }
  }

  private async postEncuesta(req: Request, res: Response) {
    try {
      console.log(req.body);
      await EncuestaModel.create(req.body); 
      console.log("Encuesta Creada");
      res.status(200).send("<h1>Encuesta Creada</h1>");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error " + error);
    }
  }
}
  export default EncuestaController;
