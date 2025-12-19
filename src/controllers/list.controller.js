import asyncHandler from 'express-async-handler';
import { Types } from 'mongoose';

import List from '../models/list.model.js';
import ApiError from '../utils/ApiError.js';
import Task from '../models/task.model.js';
import ERRORS from '../constants/errors.js';

const fetchLists = asyncHandler( async (req, res) => {

	if (process.env.NODE_ENV === "development") {
	
		console.log("fetchLists controller");
		console.log("req.body :", req.body);
	}

	const user = req.user;
	const lists = await List.find({ userID: user._id }).sort({ position: 1 }).lean();

	return res.status(200).json({ message: "Lits fetched successfully", data: lists, success: true });
} );

const createList = asyncHandler( async (req, res) => {

	if (process.env.NODE_ENV === "development") {
		console.log("createList controller");
		console.log("req.body :", req.body);
	}

	const user = req.user;
	const title = req.body.title?.trim();

	if (!title || title.length === 0) throw new ApiError(400, ERRORS.LIST_TITLE_REQUIRED);

	const count = await List.countDocuments({ userID: user._id });

	const newList = await List.create({ userID: user._id, title, position: count });

	return res.status(200).json({ message: "List created successfully", data: newList, success: true });
} );

const updateList = asyncHandler( async (req, res) => {

	if (process.env.NODE_ENV === "development") {

		console.log('updateList controller');
		console.log('req.body :', req.body);
		console.log('req.params :', req.params);
	}

	const user = req.user;
	const listID = req.params.id;

	const title = req.body.title?.trim();

	if (!Types.ObjectId.isValid(listID)) throw new ApiError(400, ERRORS.INVALID_ID);
	
	const list = await List.findOneAndUpdate({ _id: listID, userID: user._id }, { title }, { new: true, runValidators: true });
	if (!list) throw new ApiError(404, ERRORS.LIST_NOT_FOUND);

	return res.status(200).json({
		message: "List updated successful",
		data: list,
		success: true
	});
} );

const deleteList = asyncHandler( async (req, res) => {

	if (process.env.NODE_ENV === "development") {

		console.log('deleteList controller');
		console.log('req.body :', req.body);
		console.log('req.params :', req.params);
	}

	const user = req.user;
	const listID = req.params.id;
	
	if (!Types.ObjectId.isValid(listID)) throw new ApiError(400, ERRORS.INVALID_ID);

	const list = await List.findOneAndDelete({ _id: listID, userID: user._id });
	if (!list) throw new ApiError(404, ERRORS.LIST_NOT_FOUND);
	
	await Task.deleteMany({ listID: list._id, userID: user._id });
	
	return res.status(200).json({
		message: "List deleted successful",
		data: list,
		success: true
	});
} );

const reorderLists = asyncHandler( async (req, res) => {

	if (process.env.NODE_ENV === "development") {

		console.log("reorderLists controller");
		console.log("req.body :", req.body);const user = req.user;
	}

	const { listsOrder } = req.body;

	if (!Array.isArray(listsOrder)) throw new ApiError(400, 'Lists order must be an array');

	if (listsOrder.length === 0) throw new ApiError(400, ERRORS.MISSING_FIELDS);

	for(const l of listsOrder) {
		if (!Types.ObjectId.isValid(l._id)) throw new ApiError(400, `Invalid list ID : ${l._id}`);
		if (typeof l.position !== "number" || l.position < 0) throw new ApiError(400, `Invalid position for list ID : ${l._id}`);
	}

	const bulk = listsOrder.map(l => ( {
		updateOne: {
			filter: { _id: l._id, userID: user._id },
			update: {
				position: l.position
			},
		},
	} ));

	if (bulk.length > 0) {
		
		await List.bulkWrite(bulk);
	}

	const updatedLists = await List.find({ userID: user._id }).sort({ position: 1 }).lean();

	const response = { message: "Reordered", success: true, data: updatedLists };

	return res.status(200).json(response);
});

export { fetchLists, createList, updateList, deleteList, reorderLists };