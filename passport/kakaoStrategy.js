const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user')

module.exports = () => {
    passport.use(new KakaoStrategy({
        //카카오에서 발급해주는 아이디
        clientID: process.env.KAKAO_ID,
        //카카오로부터 인증 결과를 받을 라우터 주소
        callbackURL: '/auth/kakao/callback',
        // /auth/kakao에서 여기까지 작동, 인증 결과를 발급받아 다시 해당 url로 실행,
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        try {
            //이미 가입된 회원 체크
            const exUser = await User.findOne({
                where: { snsId: profile.id, provider: 'kakao' },
            });
            if(exUser){
                done(null, exUser)
            }else{
                const newUser = await User.create({
                    email : profile._json?.kakao_account?.email,
                    nick : profile.displayName,
                    snsId: profile.id,
                    provider : 'kakao',
                });
                done(null, newUser);
            }
            //인증후 callbackURL에 적힌 주소로 accessToken, refreshToken, profile을 보냄
        } catch (err) {
            console.error(err);
            done(err);
        }
    }
    ))
}