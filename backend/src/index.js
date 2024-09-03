const express = require('express');
const CPU = require('./controllers/cpuController');

const app = express();
const cpu = new CPU();

app.get('/run', (req, res) => {
    cpu.runCycle();
    res.send('CPU cycle executed');
});

app.listen(3001, () => {
    console.log('Backend server running on http://localhost:3001');
});
