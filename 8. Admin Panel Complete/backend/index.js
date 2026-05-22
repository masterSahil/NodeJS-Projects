const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors")
const session = require("express-session");
const passport = require("./config/passport");

const connectDB = require("./config/mongodb");
const router = require("./routes/userRoutes")
const categoryRouter = require("./routes/categoryRoutes")
const subcategoryRouter = require("./routes/subcategoryRoute")
const extrasubcategoryRouter = require("./routes/extraCategory")

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, ()=>{
    console.log(`Server is Running on http://localhost:${PORT}`);
});

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use("/uploads", express.static('uploads'));
app.use(cookieParser());
app.use('/', router);
app.use('/', categoryRouter);
app.use('/', subcategoryRouter);
app.use('/', extrasubcategoryRouter);