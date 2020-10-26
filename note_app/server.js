require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const useRouter = require('./routes/userRouter');
const noteRouter = require('./routes/noteRouter');

const app = express();
app.use(express.json())
app.use(cors());

app.use('/users', useRouter);
app.use('/api/notes', noteRouter);




// db connect
const DBURI = process.env.MONGODB_URL;

mongoose.connect(DBURI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, err => {
  if (err) {
    console.log('DB 연결에 문제가 발생하였습니다. ')
  }
  console.log('DB에 연결되었습니다.')
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server is running on port 5000');
})


// 
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

