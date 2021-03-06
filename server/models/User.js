/*const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10; // (for 해시값 생성)

const userSchema = mongoose.Schema({ // 스키마 생성
    nickname: {
        type: String,
        maxlength: 50
    },
    id: {
        type: String,
        maxlength: 30
    },
    email: {
        type: String,
        trim: true, // space 없애줌
        unique: 1
    },
    password: {
        type: String,
        minlength: 8
    },
    role: { // 관리자/일반 유저 구분 목적
        type: Number,
        default: 0
    },
    token: { // (로그인시 생성)
        type: String
    },
    tokenExp:{ // 토큰 유효 기간 (로그아웃시 초기화)
        type: Number
    }
})

userSchema.pre('save', function(next){
    var user = this;
    
    if(user.isModified('password')){ // 비밀번호 수정시
        bcrypt.genSalt(saltRounds, function(err, salt){ // 비밀번호 암호화
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash){ // 비밀번호와 salt 이용하여 해시값 생성
                if(err) return next(err)
                user.password = hash // DB의 password에 비밀번호 대신 해시값 저장
                next()
            })
        })
    }
    else{
        next()
    }
})

// 메서드 생성
// 1. comparePassword (-> 로그인)
userSchema.methods.comparePassword = function(plainPassword, cb){

    // plainPassword와 암호화된 비밀번호 비교 (비밀번호, 해시값)
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch)
    })
}
// 2. generateToken (-> 로그인) 
userSchema.methods.generateToken = function(cb){

    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken') // 아이디와 문자열 이용하여 토큰 생성

    user.token = token // DB에 토큰값 저장
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}
// 3. findByToken (-> 로그아웃)
userSchema.statics.findByToken = function(token, cb){
    var user = this;

    // 토큰 복호화
    jwt.verify(token, 'secretToken', function (err, decoded) { // 토큰값과 문자열 이용하여 토큰 복호화 -> decoded
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)
module.exports = { User }*/