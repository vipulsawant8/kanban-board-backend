import './loadEnv.js';

import app from './app.js';
import connectDB from './db/connectDB.js';

const initiateServer = async () => {
	
	try {
		
		console.log("Server Initiated");
		console.log("process.env.NODE_ENV :", process.env.NODE_ENV);
		await connectDB();

		const PORT = process.env.PORT;
		app.listen(PORT, () => {

			console.log(`Server running successfully on port ${PORT}`);
		});
	} catch (error) {
		
		console.error(error.message);
		console.log("Error :", error);	
	}
};

initiateServer();