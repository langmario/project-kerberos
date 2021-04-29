import express, { json, urlencoded } from 'express';

import { parseNumber } from './lib/phone-number-parser';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.post('/parse', (req, res) => {
	const { phoneNumber } = req.body;

	if (!phoneNumber) {
		return res.sendStatus(400);
	}

	try {
		const result = parseNumber(phoneNumber);

		return res.json(result);
	} catch (error) {
		console.error(error);
		res.status(400).json({ error: error.message });
	}

});

export default app;
