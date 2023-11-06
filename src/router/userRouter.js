const express = require('express');
const { LoginAuth, validateOthers } = require('../controller/middleware');
const { userController } = require('../controller');
const userRouter = express.Router();

userRouter.post('/signup',validateOthers,userController.userSignup);
userRouter.post('/login',LoginAuth,userController.userLogin);
userRouter.get('/list',LoginAuth,userController.userList);
userRouter.get('/leaderboard',LoginAuth,userController.userLeaderboard);

module.exports=userRouter;