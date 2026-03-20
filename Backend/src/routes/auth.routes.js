const express = require('express')
const authController = require("../controllers/auth.controller")
const authMiddleware=require("../middlewares/auth.middleware")
const authRouter = express.Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access public
 */
authRouter.post('/register', authController.registerUser);

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access public
 */
authRouter.post('/login', authController.loginUser);

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in the blacklist
 * @access public
 */
authRouter.get("/logout", authController.logoutUser);

/**
 * @route GET api/auth/get-me
 * @description get the current loggedin user details
 * @access public
*/
authRouter.get("/get-me",authMiddleware.authUser,authController.getMe)

module.exports = authRouter;