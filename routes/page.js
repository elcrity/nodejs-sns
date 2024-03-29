// commonjs
const express = require('express');
const { renderProfile, renderJoin, renderMain, renderHashtag } = require('../controllers/page');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

const router = express.Router();

router.use((req, res, next) => {
  console.log(`route에서 req 객체 : ${req}`);
  res.locals.user = req.user;
  res.locals.followerCount = req.user?.Followers?.length || 0;
  res.locals.followingCount = req.user?.Followings?.length || 0;
  res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
  next();
});

//Get /profile
//Get /join
//Get /
router.get('/profile', isLoggedIn ,renderProfile);

router.get('/join', isNotLoggedIn, renderJoin);

router.get('/join', isNotLoggedIn, renderHashtag);

router.get('/', renderMain);

module.exports = router;
// import e from "express";
// import {renderProfile, renderJoin, renderMain} from '../controllers/page.js'

// const router = e.Router();

// router.use((req, res, next) => {
//     res.locals.user = null;
//     res.locals.followerCount = 0;
//     res.locals.followingCount = 0;
//     res.locals.followingIdListt = [];
//     next();
// })

// router.get('/profile', renderProfile);

// router.get('/join',renderJoin);

// router.get('/', renderMain);

// export default router;
