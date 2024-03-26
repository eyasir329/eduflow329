require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql2');
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const _ = require("lodash");


// routes
const authRoutes = require("./api/routes/auth.route.js");
const userRoutes = require("./api/routes/user.route.js");
const adminRoutes = require("./api/routes/admin.route.js");
const registerRoutes = require("./api/routes/register.route.js");
const teacherRoutes = require("./api/routes/teacher.route.js");
const publicRoutes = require("./api/routes/public.route.js");


const app = express();

// app.set('view engine', 'ejs');

app.use(cors({
  origin: 'http://localhost:3000',  // Adjust this to your client's actual origin
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Your existing headers middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// app.use(express.static("public"));

// mongodb connection start
mongoose.connect(process.env.mongoSchoolUser)
  .then(() => {
    console.log("Connected to MongoDB School User DBMS Server");
  })
  .catch((err) => {
    console.log(err);
  });
// mongodb connection end

// mysql connection start
const connection = require("./api/sql/db.js");

connection.getConnection((err, conn) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL School DBMS Server');
});

//mysql connection end

// user route
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
// user route end

// admin panel start
app.use("/api/admin", adminRoutes);
// admin panel end

// register
app.use("/api/register", registerRoutes);

// teacher panel start
app.use("/api/teacher", teacherRoutes);
// teacher panel end

// public panel start
app.use("/api/public", publicRoutes);
// public panel end



app.listen(5000, function () {
  console.log("Node js Server started on port 5000");
});