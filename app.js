// app.js

import express from 'express';
import characterRouter from './routes/characters.router.js';
import itemRouter from './routes/item.router.js';
import connect from './schemas/index.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json()); //Express에서 req.body에 접근하여 body.
app.use(express.urlencoded( {extended : false } ));

connect(); //mongodb연결하기위한 커넥트

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api',[characterRouter]);
app.use('/api',[itemRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});