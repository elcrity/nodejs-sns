// commonJs
const { hash } = require('bcrypt');
const {User,Post, Hashtag} = require('../models')

exports.renderProfile = (req, res) => {
    res.render('profile', { title: '내 정보 - NodeBird' });
};

exports.renderJoin = (req, res) => {
    res.render('join', { title: '회원가입 - NodeBird' });
};

exports.renderMain = async(req, res, next) => {
    console.log('qeury? : ' + req.query);
    try {
        const posts = await Post.findAll({
            //모든 Post를 User id와 nick을 join하여 추가, 생성 날짜의 역순으로 정렬
            include : {
                model : User,
                attributes : ['id', 'nick']
            },
            order : [['createdAt', 'DESC']]
        });
        res.render('main', {
            title: 'NodeBird',
            twits : posts,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
    
};

exports.renderHashtag = async(req, res, next) => {
    const query = req.query.hashtag;
    if(!query){
        return res.rediret('/');
    }
    try {
        const hashtag = await Hashtag.findOne({where : { title : query }});
        let posts = [];
        if(hashtag){
            posts = await hashtag.getPosts({ include : [{ model : User}]})
        }
        res.render('main',{
            title : `${query} | NodeBird`,
            twits : posts,
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// const renderProfile = (req, res) => {
//     res.render('profile',{title:'내 정보 - nodebird'})
// } 
// const renderJoin = (req, res) => {
//     res.render('join',{title:'회원 가입 - nodebird'})
// } 
// const renderMain = (req, res,next) => {
//     const twits = [];
//     res.render('main',{
//         title:'nodebird',
//         twits
//     })
// }

// export { renderJoin, renderMain, renderProfile };