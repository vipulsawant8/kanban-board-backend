import { Router } from "express";

import { fetchTasks, createTask, updateTask, deleteTask, reorderTasks } from "../controllers/task.controller.js";
import verifyLogin from "../middlewares/auth/verifyLogin.js";

const router = Router();

router.use(verifyLogin);

router.get('/', fetchTasks);
router.post('/', createTask);

router.patch('/reorder', reorderTasks);

router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);


export default router;