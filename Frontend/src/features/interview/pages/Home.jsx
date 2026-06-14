import '../style/home.scss';
import '../style/interview.scss'
import React, { useState } from 'react'
import { useInterview } from '../hooks/useInterview';
import Navbar from '../../auth/components/Navbar';
import { useNavigate } from 'react-router';


import { RiUser3Line } from "react-icons/ri";
import { PiSuitcaseBold } from "react-icons/pi";
import { LuCloudUpload } from "react-icons/lu";
import { SiGooglegemini } from "react-icons/si";


const Home = () => {
    const { loading, generateReport, reports } = useInterview()
    const navigate = useNavigate()

    const [fileName, setFileName] = useState("")
    const [error, setError] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [resume, setResume] = useState()
    const maxSize = 5 * 1024 * 1024;

    /**
     * @arguments selfDescription jobDescription resumeFile
     * @returns created generatedReport
     */

    const handleSubmit = async () => {
        try {
            if (!fileName) {
                setError("Resume is required!");
                return;
            }

            if (!jobDescription.trim()) {
                setError("Job description is required!");
                return;
            }
            if (!selfDescription.trim()) {
                setError("Self description is required!")
                return
            }

            if (!resume) {
                setError("Please upload your resume before submitting.");
                return;
            }

            setError("");
            const data = await generateReport({ jobDescription, selfDescription, resumeFile: resume });
            if (!data) {
                setError("Unable to generate report. Please try again.");
                return;
            }

            console.log(data);
            navigate(`/interview/${data._id}`)
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || "An unexpected error occurred.";
            setError(message);
        }
    }

    if (loading) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan ...</h1>
            </main>
        )
    }

    const validateFile = (file) => {
        if (!file) return;

        if (file.type !== "application/pdf") {
            setError("Only PDF files are allowed.");
            return;
        }

        if (file.size > maxSize) {
            setError("File size must be less than 5MB.");
            return;
        }

        setError("");
        setResume(file)

        setFileName(file.name);
    };


    const handleDragOver = (e) => {
        e.preventDefault();
    }



    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if (file && file.type === "application/pdf") {
            setFileName(file.name);
            setResume(file);
            setError("");
        } else {
            alert("Please upload a PDF file");
        }
    }


    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        validateFile(file);
    }


    return (

        <>
            <Navbar />
            <div className="headings">
                <h1 className='heading'>Create Your Custom <p> Interview Plan</p></h1>
                <small className='sub-heading'>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</small>
            </div>

            <main className="dashboard">
                <div className="left">
                    <div className="upper">
                        <label className='jobDescription' htmlFor="jobDescription"><PiSuitcaseBold className='icon' color='#e1034d' size={18} />Target Job Description</label>
                        <p>REQUIRED</p>
                    </div>
                    <div className="lower">
                        <textarea name="jobDescription" id="jobDescription" placeholder="Paste the full job descripton here...         e.g.'Senior Frontend Engineer at Google requires proficiency in React,TypeScript, and large-scale system design...'" maxLength={5000}
                            onChange={(e) => setJobDescription(e.target.value)}>

                        </textarea>
                    </div>
                </div>

                <div className="right">
                    <div className="top">
                        <RiUser3Line color='#e1034d' size={15} />
                        <p>Your Profile</p>
                    </div>
                    <div className="upload-resume">
                        <span>Upload Resume</span>
                        <p>Best Results</p>
                    </div>
                    <div className="input-resume" onDrop={handleDrop} onDragOver={handleDragOver}>
                        <LuCloudUpload color='#e1034d' size={28} />
                        <label htmlFor="upload-resume">Click to upload or drag & drop</label>
                        <input type="file" hidden accept='.pdf' name='resume-input' id='upload-resume' required onChange={handleFileSelect} />
                        <small>PDF (Max 5MB)</small>
                        {fileName && <p>Uploaded: {fileName}</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>
                    <p className="dividor">
                        <span>AND</span>
                    </p>
                    <div className="selfDescription">
                        <label htmlFor="selfDescription"> Quick Self-Description</label>
                        <textarea className='self-Description' name="self-Description" id="selfDescription" onChange={(e) => setSelfDescription(e.target.value)}
                            placeholder='Breifly describe your experience , key skills , and years of experience ...'></textarea>
                    </div>
                </div>

            </main>

            <div className="bottom">
                <small>AI-Powered Strategy Generation . Approx 30s</small>
                <button type='submit' className='generate-btn ' onClick={handleSubmit}><SiGooglegemini />Generate My Interview Strategy
                </button>

            </div>

            {reports.length > 0 && (
                <section id='recent-reports' className="recent-reports">
                    <h2>My Recent Interview Plans</h2>
                    <ul className="reports-list">
                        {reports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3>{report.title || 'Untitled Position'}</h3>
                                <div className="details">
                                    <p className="report-mets">Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                    <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score-mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            )}


            <footer className="page-footer">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Help Center</a>
            </footer>

        </>
    )
}

export default Home
