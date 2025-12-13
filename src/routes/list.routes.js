import { Router } from "express";

import { fetchLists, createList, updateList, deleteList, reorderLists } from "../controllers/list.controller.js";
import verifyLogin from "../middlewares/auth/verifyLogin.js";

const router = Router();

router.use(verifyLogin);

router.get('/', fetchLists);
router.post('/', createList);

router.patch('/reorder', reorderLists);

router.patch('/:id', updateList);
router.delete('/:id', deleteList);


export default router;