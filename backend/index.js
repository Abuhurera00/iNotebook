const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
require('dotenv').config()


connectToMongo();
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())

app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// Root Endpoint
app.get('/', (req, res)=> {
  res.send('API WORKING')
});

app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})

