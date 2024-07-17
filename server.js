const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

let results = {};

// Serve static files from the public directory
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Submit winner
app.post('/submit-winner', (req, res) => {
    const winner = req.body.winner;

    // Increment the winner count
    if (results[winner]) {
        results[winner]++;
    } else {
        results[winner] = 1; // Initialize the count
    }

    res.send('Winner recorded');
});

// Get results
app.get('/results', (req, res) => {
    res.json(results);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});