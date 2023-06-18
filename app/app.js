import bodyParser from 'body-parser';
import {config} from './config';
import cors from 'cors';
import express, { request } from 'express';
import morgan from 'morgan';
import routes from './REST/routes';
import { Mongoose } from 'mongoose';
const mongoose = require('mongoose');

const app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '2048kb'}));

mongoose.connect('mongodb+srv://jakubfik21:WvVF3jHTal3V1iz9@cluster0.y1phogb.mongodb.net/Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connection Established');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
app.use(cors());



routes(app);


app.listen(config.port, function () {
  console.info(`Server is running at ${config.port}`)
});