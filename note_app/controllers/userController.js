const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;


const userController = {
  registerUser: async (req ,res) => {

    try {
      // res.json(res.body);
      const {username, email, password} = req.body;
      const user = await Users.findOne({ email: email })
      if(user) {
        return res.status(400).json({msg: '이미 등록된 사용자 입니다.'})
      }
      let passwordHash = null;
      passwordHash = await bcrypt.hash(password, saltRounds);
      // res.json(passwordHash)
      const newUser = new Users({
        username: username,
        email: email,
        password: passwordHash,
      })
      await newUser.save();
      res.json({msg: '등록이 성공적으로 완료되었습니다.'});

    } catch (error) {
      console.log(error.message)
      return res.status(500).json({msg: error.message});
    }

  },
  loginUser: async (req, res) => {
    const {email, password} = req.body;
    try {
      const user = await Users.findOne({email});

      if(!user) return res.status(400).json({msg: '등록되지 않은 email 입니다.'});
      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) return res.status(400).json({msg: '비밀번호가 일치하지 않습니다.'});

      const payload = {id: user._id, name: user.username};
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: '2d'});


      res.json({token})

    } catch (error) {
      return res.status(500).json({msg: error.message});
    }

    // res.json({msg: 'loginUser success'})
  },
  verifiedToken: (req, res) => {
    try {
      
      const token = req.header('Authorization');
      if(!token) return res.send(false);

      jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
        if(err) return res.send(false);

        const user = await Users.findById(verified.id);
        if(!user) return res.send(false);
        return res.send(true);
      })

    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  }
};

module.exports = userController;