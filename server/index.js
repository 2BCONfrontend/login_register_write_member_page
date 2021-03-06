/*const express = require('express') // (노드 js 프레임워크)
const app = express() // 앱 생성
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = 5500 // 포트번호 설정
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');
const config = require('./config/key');

app.use(bodyParser.urlencoded({ extended: true })); // (application/x-www-form-urlencoded 분석하기 위함)
app.use(bodyParser.json()); // (application/json 분석하기 위함)
app.use(cookieParser());

// 몽고 DB 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

// 1. 회원가입
app.post('/api/users/register', (req, res) => {
  // 회원 가입할 때 필요한 정보들을 client에서 가져오면 데이터베이스에 넣어준다.
  console.log(res.body); //
  const user = new User(req.body)
  user.save((err, userInfo) => {
      if(err) return res.json({ success:false, err })
      return res.status(200).json({ success: true })
  })
})

// 2. 로그인
app.post('/api/users/login', (req, res) => {

  // 2-1. 요청된 아이디가 데이터베이스에서 있는지
  User.findOne({ id: req.body.id }, (err, user) => {
    if(!user) { // 사용자가 없는 경우
      return res.json({
        loginSuccess: false,
        message: "제공된 아이디에 해당하는 유저가 없습니다."
      })
    }

    // 2-2. 요청된 아이디가 데이터베이스에 있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) // 비밀번호 불일치
        return res.json({ 
          loginSuccess: false, 
          message: "비밀번호가 틀렸습니다." })
    })

    // 2-3. 비밀번호가 일치한다면 토큰 생성
    user.generateToken((err, user) => {
      if(err) return res.status(400).send(err);
      // 토큰 저장 -> 쿠키
      res.cookie("x_auth", user.token)  // (cookies.x_auth에 token 들어있음)
      .status(200)
      .json({ loginSuccess: true, userId: user._id })
    })
  })
})

// 3. 인증
app.get('/api/users/auth', auth, (req, res) => {
  // authentication 완료ple
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, // 0 일반유저
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
  })
})

// 4. 로그아웃
app.get('/api/users/logout', auth, (req, res) => {
  // 토큰 비우기
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).send({ success: true })
  })
})

// 5. 중복 확인
// 5-1. 닉네임 중복확인
app.post('/api/users/checkNickname', (req, res) => {
  // 같은 닉네임이 데이터베이스에 존재하는지
  User.findOne({ nickname: req.body.nickname }, (err, user) => {
    if(!user) { // 사용자가 없는 경우
      return res.json({
        permit: true,
        message: "사용할 수 있는 닉네임입니다."
      })
    } else {
      return res.json({
        permit: false,
        message: "사용할 수 없는 닉네임입니다."
      })
    }
  })
})
// 5-2. 아이디 중복확인
app.post('/api/users/checkId', (req, res) => {
  // 같은 아이디가 데이터베이스에 존재하는지
  User.findOne({ id: req.body.id }, (err, user) => {
    if(!user) { // 사용자가 없는 경우
      return res.json({
        permit: true,
        message: "사용할 수 있는 아이디입니다."
      })
    } else {
      return res.json({
        permit: false,
        message: "사용할 수 없는 아이디입니다."
      })
    }
  })
})
// 5-3. 이메일 중복확인
app.post('/api/users/checkEmail', (req, res) => {
  // 같은 이메일이 데이터베이스에 존재하는지
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) { // 사용자가 없는 경우
      return res.json({
        permit: true,
        message: "사용할 수 있는 이메일입니다."
      })
    } else {
      return res.json({
        permit: false,
        message: "사용할 수 없는 이메일입니다."
      })
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})*/