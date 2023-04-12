import { Router } from "express";
import { find } from "../controllers/buscarController.js";

const routerFind = Router();

routerFind.route('/:coleccion/:termino')
    .get(find)


export default routerFind;