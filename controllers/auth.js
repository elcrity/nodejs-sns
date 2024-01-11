const bcrypt = require('bcrypt')
const passport = require('passport')
const User = require('../models/user')

exports.join = async (req, res, next) =>{
    const {email, nick, password} = req.body;
    try {
        const exUser = await User.findOne({ where : {email}})
        if(exUser){
            return res.redirect('/join?error=exist')
        }
        //비밀번호 암호화, 12이상 추천, 단지 높아질수록 암호화에 시간이 더 걸림
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password : hash
        });
        return res.redirect('/')
    } catch (err) {
        console.error(err);
        return next(err);
        
    }
}
exports.login = (req, res, next) =>{
    //첫번째 인수로 준 전략을 수행, 실패하면 첫번재 인수로 authErr값이 있게됨, 성공하면 user 자리에 값이 있게됨
    //done으로 반환한 값이 들어감
    passport.authenticate('local', (authErr, user, info) => {
        if(authErr) {
            console.error(authErr);
            next(authErr);
        }
        if(!user){
            return res.redirect(`/?error=${info.message}`)
        }
        //passport는 req객체에 login, logout객체를 추가하며, req.login은 passport.serializeUser를 호출함
        // login메서드에 제공되는 user 객체가 serializeUser에 넘어가게 되고 이때 connect.sid세션 쿠키가 브라우저에 전송
        return req.login(user, (loginErr) => {
            if(loginErr){
                console.error(loginErr);
                return next(loginErr);
            }
            return res.redirect('/')
        })
    })(req,res, next);
}
exports.logout = (req, res) =>{
    //logout메서드는 req.user와 req.session객체를 ㅔ거함
    req.logout(() => {
        res.redirect('/')
    })

}