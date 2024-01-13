const { Post, Hashtag } = require('../models')

exports.afterUploadImage = (req, res) =>{
    console.log('이미지 업로드 ' + req.file);
    res.json({url : `/img/${req.file.filename}`})
}

exports.uploadPost = async (req, res, next) =>{
    try {
        const post = await Post.create({
            content: req.body.content,
            img : req.body.url,
            UserId : req.user.id
        });
        //주어진 문자열에서 #으로 시작하는 해시태그를 모두 추출하여 hashtags 배열에 저장
        const hashtags = req.body.content.match(/#[^\s#]*/g);
        if(hashtags){
            const result = await Promise.all(
                hashtags.map(tag => {
                    //해시태그 배열을 돌며 해당 태그가 존재하면 가져오고 없으면 생성 후 가져옴,
                    // 결과값으로 [모델, 생성여부]를 반환하므로 해시테그 모델만 r[0]으로 추출 후, 게시글과 연결
                    return Hashtag.findOrCreate({
                        where : { title : tag.slice(1).toLowerCase() },
                    })
                }),
                //post객체에 해쉬태그 추가
            )
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
}