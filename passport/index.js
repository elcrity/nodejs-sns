const passport = require('passport')
const local = require('./localStrategy')
const kakao = require('./kakaoStrategy')
const User = require('../models/user')

module.exports = () => {
    //user를 받아서 id를 세션에 넘김, 모든 데이터를 저장하면 용량이 커지고 데이터 일관성에 문제
    //즉 사용자 정보 객체에서 id만 가져와서 저장
    passport.serializeUser((user,done) => {
        //첫번째 인수는 err, 두번재 인수는 저장할 데이터
        done(null, user.id);
    });

    //각 요청마다 실행, passport.session미들웨어가 호출함
    //받은 id를 데이터베이스에서 조회 후, 정보를 req.user에 저장
    passport.deserializeUser((id, done) => {
        User.findOne({where : { id }})
            .then(user => done(null,user))
            .catch(err => done(err))
    });

    local();
    kakao();
}