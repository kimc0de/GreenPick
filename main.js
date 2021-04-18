const port = 3000,
    express = require('express'),
    app = express();

app.get('/', (req, res) => {
    res.send('Hello universe!');
})
    .listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
