//Config
import express from 'express'
import morgan from 'morgan';
import cors from 'cors';
import {PORT} from './src/config/config.js'


const corsOptions = {
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowHeaders:
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MDS. Content-Type, Date, X-Api-Version",
    credentials: true,
  };

//Rout Index
import routerIndex from './src/routes/routerIndex.js'

const app = express()


app.use(express.json());
app.use(cors(corsOptions));
app.use('/', routerIndex);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Servidor para el desarrollo')
})

