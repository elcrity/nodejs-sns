const express = require('express')
const passport = require('passport');
const { isNotLoggedIn, isLoggedIn } = require('../middlewares');
const { join, login, logout } = require('../controllers/auth')

const router = express.Router();

//Post /auth/join
//Post /auth/login
//Post /auth/logout

//router의 post에 /join 이벤트를 추가, isNotLoggedIn 미들웨어를 통해 검사하여, 성공하면 controller의 join 메소드가 작동.
router.post('/join', isNotLoggedIn, join);

router.post('/login', isNotLoggedIn, login);

router.get('/logout', isLoggedIn, logout);

//해당 라우터에서 로그인 전략을 카카오로 로그인 시도, 
// 성공시 callbackURl인 '/kakao/callback'로 accessToken, refreshToken, profile을 보냄
router.get('/kakao', passport.authenticate('kakao'));

//카카오 로그인은 로그인 성공시 내부적으로 req.login을 호출하므로 직접 호출 해줄 필요 x
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect : '/?error=카카오로그인 실패',
}),(req,res) => {
    res.redirect('/');
})

module.exports = router;