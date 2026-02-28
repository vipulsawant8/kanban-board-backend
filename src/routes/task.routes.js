import { Router } from "express";

import { burstLimiter, createOrModifyResourceLimiter } from "../middlewares/limiters/setLimiters.js";
import { validate } from "../middlewares/validate/validate.middleware.js";
import verifyLogin from "../middlewares/auth/verifyLogin.js";

import { createTaskSchema, updateTaskSchema, deleteTaskSchema, reorderTasksSchema } from "../validations/task.schema.js";
import { fetchTasks, createTask, updateTask, deleteTask, reorderTasks } from "../controllers/task.controller.js";

const router = Router();

router.get('/', fetchTasks);
router.post('/', burstLimiter, createOrModifyResourceLimiter, verifyLogin, validate(createTaskSchema), createTask);

router.patch('/reorder', verifyLogin, validate(reorderTasksSchema), reorderTasks);

router.patch('/:id', burstLimiter, createOrModifyResourceLimiter, verifyLogin, validate(updateTaskSchema), updateTask);
router.delete('/:id', burstLimiter, createOrModifyResourceLimiter, verifyLogin, validate(deleteTaskSchema), deleteTask);

export default router;