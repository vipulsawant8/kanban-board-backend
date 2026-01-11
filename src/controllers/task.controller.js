import asyncHandler from 'express-async-handler';
import { Types } from 'mongoose';

import Task from '../models/task.model.js';
import ApiError from '../utils/ApiError.js';
import ERRORS from '../constants/errors.js';

const fetchTasks = asyncHandler( async (req, res) => {

	if (process.env.NODE_ENV === "development") {

		console.log("fetchTasks controller");
	}

	const user = req.user;

	const tasks = await Task.find({ userID: user._id }).lean();

	return res.status(200).json({
		message: "Tasks fetched successfully",
		data: tasks,
		success: true
	})
} );

const createTask = asyncHandler( async (req, res) => {

	if (process.env.NODE_ENV === "development") {
	
		console.log("createList controller");
		console.log("req.body :", req.body);
	}

	const user = req.user;

	const title = req.body.title?.trim();
	const listID = req.body.listID;
	const description = req.body.description?.trim();

	if (!Types.ObjectId.isValid(listID)) throw new ApiError(400, "Unable to add task. The list could not be identified.");

	if (!title || title.length === 0) throw new ApiError(400, ERRORS.TASK_TITLE_REQUIRED);

	const count = await Task.countDocuments({ userID: user._id, listID });

	const newTask = await Task.create({ title, description, position: count, listID, userID: user._id });

	return res.status(200).json({
		message: `Task "${newTask.title}" was created`,
		data: newTask,
		success: true
	});
} );

const updateTask = asyncHandler( async (req, res) => {

	if (process.env.NODE_ENV === "development") {

		console.log("updateTask controller");
		console.log("req.body :", req.body);
		console.log('req.params :', req.params);
	}

	const user = req.user;
	const taskID = req.params.id;

	const title = req.body.title?.trim();
	const description = req.body.description?.trim();

	if (!Types.ObjectId.isValid(taskID)) throw new ApiError(400, "Unable to update task. The task could not be identified.");

	const task = await Task.findOneAndUpdate({ userID: user._id, _id: taskID }, { title, description }, { new: true }).lean();
	if (!task) throw new ApiError(404, "This task no longer exists or you don't have permission to update it.");

	return res.status(200).json({
		message: `Task "${task.title}" was updated`,
		data: task,
		success: true
	});
} );

const deleteTask = asyncHandler( async (req, res) => {

	if (process.env.NODE_ENV === "development") {

		console.log("deleteTask controller");
		console.log('req.params :', req.params);
	}

	const user = req.user;
	const taskID = req.params.id;
	
	if (!Types.ObjectId.isValid(taskID)) throw new ApiError(400, "Unable to delete task. The task could not be identified.");
	
	const task = await Task.findOneAndDelete({ _id: taskID, userID: user._id }).lean();
	if (!task) throw new ApiError(404, "This task no longer exists or you don't have permission to delete it.");

	return res.status(200).json({
		message: `Task "${task.title}" was deleted`,
		data: task,
		success: true
	});
} );

const reorderTasks = asyncHandler( async (req, res) => {

	if (process.env.NODE_ENV === "development") {

		console.log("reorderTasks controller");
		console.log("req.body :", req.body);
	}

	const user = req.user;
	const { tasksOrder } = req.body;

	if (!Array.isArray(tasksOrder)) throw new ApiError(400, "taskOrder must be an array");

	if (tasksOrder.length === 0) throw new ApiError(400, ERRORS.MISSING_FIELDS);

	for(const t of tasksOrder) {
		if (!Types.ObjectId.isValid(t._id)) throw new ApiError(400, `Invalid task ID : ${t._id}`);
		if (!Types.ObjectId.isValid(t.listID)) throw new ApiError(400, `Invalid list ID : ${t.listID}`);
		if (typeof t.position !== "number" || t.position < 0) throw new ApiError(400, `Invalid position for task ID : ${t._id}`);
	}	

	const bulk = tasksOrder.map(t => ( {
		updateOne: {
			filter: { _id: t._id, userID: user._id },
			update: {
				listID: t.listID,
				position: t.position
			},
		},
	} ))	

	if (bulk.length > 0) {
		
		await Task.bulkWrite(bulk);
	}
	
	const updatedTasks = await Task.find({ userID: user._id }).sort({ listID: 1, position: 1 }).lean();

	const response = { message: "Reordered", success: true, data: updatedTasks };

	return res.status(200).json(response);
} );

export { fetchTasks, createTask, updateTask, deleteTask, reorderTasks };