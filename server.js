const express = require('express');
const app = express();
const cors = require('cors');
// const bodyParser = require('body-parser');
const PORT = 8008;
// const morgan = require('morgan');
const { Client } = require('pg');
const config = require('./config.json')[process.env.NODE_ENV||"dev"];
const client = new Client({
    connectionString: config.connectionString,
})
client.connect();

app.use(express.static('public'));
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());
// app.use(morgan('tiny'));
app.use(express.json());
app.use(cors())

app.get('/', (req, res)=>{
    res.send('Welcome to our page of Cars')
})

app.get('/api/cars/models', (req, res)=>{
    client.query('SELECT * FROM models')
    .then(result =>{
            res.send(result.rows);
    })
});

app.get('/api/cars/manufacturer', (req, res)=>{
    client.query('SELECT * FROM manufacturer')
    .then(result =>{
            res.send(result.rows);
    })
});

// app.get('/api/cars/:id', (req, res)=>{

// });

app.post('/api/cars/models', (req, res)=>{
    let newModel = req.body;
    console.log('Model req.body: ', newModel)
    client.query('INSERT INTO models (model_name, base_price, electric) VALUES ($1, $2, $3) RETURNING *', 
    [newModel.model_name, newModel.base_price, newModel.electric])
    .then(result => {
        res.send(result.rows);
    })
});

app.post('/api/cars/manufacturer', (req, res)=>{
    let newManufac = req.body;
    console.log('Manufac req.body: ', newManufac);
    client.query('INSERT INTO manufacturer (man_name, domestic) VALUES ($1, $2) RETURNING *', 
    [newManufac.man_name, newManufac.domestic])
    .then(result => {
        res.send(result.rows);
    })
}); 

// app.patch('/api/cars', (req, res)=>{

// });

// app.put('/api/cars', (req, res)=>{

// });

// app.delete('/api/cars', (req, res)=>{

// });

app.use((req, res, next)=>{
    res.status(404).send('Not found')
});
app.listen(PORT, ()=>{
    console.log('Server running. Listening on port: ', PORT)
});
