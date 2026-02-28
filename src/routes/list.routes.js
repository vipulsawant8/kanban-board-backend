import { Router } from "express";

import { burstLimiter, createOrModifyResourceLimiter } from "../middlewares/limiters/setLimiters.js";
import { validate } from "../middlewares/validate/validate.middleware.js";
import verifyLogin from "../middlewares/auth/verifyLogin.js";

import { createListSchema, updateListSchema, deleteListSchema, reorderListsSchema } from "../validations/list.schema.js";
import { fetchLists, createList, updateList, deleteList, reorderLists } from "../controllers/list.controller.js";

const router = Router();

router.get('/', verifyLogin, fetchLists);
router.post('/', burstLimiter, createOrModifyResourceLimiter, verifyLogin, validate(createListSchema), createList);

router.patch('/reorder', verifyLogin, validate(reorderListsSchema), reorderLists);

router.patch('/:id', burstLimiter, createOrModifyResourceLimiter, verifyLogin, validate(updateListSchema), updateList);
router.delete('/:id', burstLimiter, createOrModifyResourceLimiter, verifyLogin, validate(deleteListSchema), deleteList);

export default router;