import app from './app';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});

export default server;
