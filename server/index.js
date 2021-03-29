const express = require('express');
const cors = require('cors');
const { findClosestOutlet } = require('./controller/geolocator');

const PORT = 5100;
const app = express();
app.use(cors());
app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.get('/api/outlet/nearest', async (req, res, next) => {
    let address = req.query.address;
    let result = await findClosestOutlet(address);
    if (result !== 'not found') {
        return res.json({
            status: 200,
            outlet: result
        })
    } else {
        return res.json({
            status: 200,
            message: "No nearby outlet",
            outlet: result
        })
    }
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

