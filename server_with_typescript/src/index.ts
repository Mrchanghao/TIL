import express, { Request, Response } from 'express';
import socketIO from 'socket.io';
import {router } from './route/loginRoute';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';


const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({ keys: ['lee']}))

app.use(router);

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <div>
      <h1>Hi it's Start</h1>
    </div>
  `)
});

app.listen(3000, () => console.log('listening on 3000'))