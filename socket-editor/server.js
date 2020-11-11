const log = console.log 


const http = require('http').createServer();
const io = require('socket.io')(http);
const port = 3000;

http.listen(port, () => log(`server is running on port ${port}`));

io.on('connection', (socket) => {
  log('connected');
  socket.on('message', (evt) => {
    log(evt);
    socket.broadcast.emit('message', evt);
  })
})

io.on('disconnect', (evt) => {
  log('떠나 부렸으');
});


