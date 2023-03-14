import { Router } from "express";
import { delete_users, get_users, patch_users, post_users, put_users } from "../controllers/userController.js";
const router = Router();

router.route('/')
    .get(get_users)
    .post(post_users)
    .delete(delete_users)
    .patch(patch_users)

router.route('/:id')
    .put(put_users)



export default router;