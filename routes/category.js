import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos.js";

import { get_categories, get_category, post_createCategory } from "../controllers/categoriesController.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const routerCategory = Router();

// Obtener todas las categorias - Publico
routerCategory.route('/')
    .get(get_categories)

// Obtener una categoria por id - Publico

routerCategory.route('/:id')
    .get(get_category)

// Crear categoria - privado - cualquier persona con un token válido
routerCategory.route('/')
    .post([
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],post_createCategory)

// Actualizar una categoria -privado - cualquier persona con un token válido
routerCategory.route('/:id')
    .put()

// Borrar Categoria - solo un admin
routerCategory.route('/:id')
    .delete()

export default routerCategory;