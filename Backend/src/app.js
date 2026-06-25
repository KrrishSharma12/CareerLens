const express = require("express")
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')

const allowedOrigins = [
    "http://localhost:5173",
    "https://career-lens-bykrish.vercel.app"
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// require all the routes here


const authRouter = require("./routes/auth.routes")
const interviewRouter=require("./routes/interview.routes")

app.get("/", (req, res) => {
    res.send("Welcome to CareerLens API")
})

//using all the routes here
app.use('/api/auth', authRouter)
app.use('/api/interview',interviewRouter)


module.exports = app;