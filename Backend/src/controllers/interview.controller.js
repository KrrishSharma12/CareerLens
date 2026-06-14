const pdfParse = require('pdf-parse');
const { generateInterviewReport, generateResumePdf } = require('../services/ai.service')
const interviewReportModel = require("../models/interviewReport.model")

/**
 * @description Controller to generate interview report based on user self description,resume and job description
 */
async function generateInterviewReportController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Resume file is required.' })
        }

        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
        const { selfDescription, jobDescription } = req.body

        if (!jobDescription || !selfDescription) {
            return res.status(400).json({ message: 'Job description and self description are required.' })
        }

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        })

        const interViewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        })

        res.status(201).json({
            message: 'Interview report generated successfully',
            interviewReport: interViewReport
        })
    } catch (error) {
        console.error('Error generating interview report:', error)
        res.status(500).json({
            message: 'Failed to generate interview report.',
            error: error.message
        })
    }
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function generateInterviewReportById(req, res) {
    const { interviewId } = req.params
    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })
    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview Report not found"
        })
    }
    res.status(200).json({
        message: "Interview Report fetched successfully.",
        interviewReport
    })
}

/**
 * @description Controller to get all interview reports of loggedin user.
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).
        select("-resume -selfDescription -jobDescription -_v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched Successfully",
        interviewReports
    })
}

/**
 * @description Controller to generate resume pdf based on user self description , resume and job description.
 */

async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)
    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview Report not found."
        })
    }

    const { resume, selfDescription, jobDescription } = interviewReport
    const pdfBuffer = await generateResumePdf({ resume, selfDescription, jobDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })
    res.send(pdfBuffer)
}

module.exports = {
    generateInterviewReportController,
    generateInterviewReportById,
    getAllInterviewReportsController,
    generateResumePdfController
}