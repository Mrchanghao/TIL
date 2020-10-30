import http from 'http';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import cluster from 'cluster';

// import { setRouter } from './route'

const app = express();

let workers = [];

/*
setup number of worker process to share port which will be defined while setting up server 

*/

const setupWorkerProcess = () => {
  let numCores = require('os').cpus().length;

  console.log('Master cluster setting up with ' + numCores + ' workers')

  for (let i = 0; i < numCores; i++) {
    workers.push(cluster.fork());

    workers[i].on('message', (message) => {
      console.log('message ', message);
    })
  }

  cluster.on('online', (worker) => {
    console.log(`worker ${worker.process.pid} is 활동중`)
  })

  

}