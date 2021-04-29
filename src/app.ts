import express, { json, urlencoded } from 'express';

import { parseNumber, isPhoneNumberValid } from './lib/phone-number-parser';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/parse', (req, res) => {
	const { phoneNumber } = req.body;

	if (!phoneNumber) {
		return res.status(400).send();
	}

	if (!isPhoneNumberValid(phoneNumber)) {
		return res.status(400).json({ message: 'Phone number has an invalid format' });
	}

	try {
		const result = parseNumber(phoneNumber);

		return res.json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

export default app;
