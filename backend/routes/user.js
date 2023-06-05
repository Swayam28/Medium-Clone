const express = require('express');
const { createUser, loginUser, isLoggedIn, followUser, unfollowUser, getUser, getAllUsers, getSingleUser } = require('../handlers/user');

const userRouter = express.Router();

userRouter.post('/createUser', createUser);
userRouter.post('/loginUser', loginUser);
userRouter.post('/isLoggedIn', isLoggedIn);
userRouter.post('/followUser/:userId', followUser);
userRouter.post('/unfollowUser/:userId', unfollowUser);
userRouter.get('/getUser', getUser);
userRouter.get('/getAllUsers', getAllUsers);
userRouter.get('/getSingleUser/:userId', getSingleUser);

module.exports = {userRouter};