const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const interviewController = require('../controllers/interview.controller')
const upload = require('../middlewares/file.middleware')
const interviewRouter = express.Router()

/**
 * @route POST /api/interview/
 * @description  generate a new interview report on the basis of user self description,resume pdf and job description
 * @access private
 */


interviewRouter.post('/', authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController)

/**
 * @route Get /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
interviewRouter.get('/report/:interviewId', authMiddleware.authUser, interviewController.generateInterviewReportById)

/**
 * @route Get /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */

interviewRouter.get('/', authMiddleware.authUser, interviewController.getAllInterviewReportsController)

/**
 * @route Get /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self Description ,resume and job description.
 * @access private
 */
interviewRouter.post('/resume/pdf/:interviewReportId', authMiddleware.authUser, interviewController.generateResumePdfController)

module.exports = interviewRouter;