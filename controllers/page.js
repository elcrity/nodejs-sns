// commonJs
exports.renderProfile = (req, res) => {
    res.render('profile', { title: '내 정보 - NodeBird' });
};

exports.renderJoin = (req, res) => {
    res.render('join', { title: '회원가입 - NodeBird' });
};

exports.renderMain = (req, res, next) => {
    const twits = [];
    res.render('main', {
        title: 'NodeBird',
        twits,
    });
};

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