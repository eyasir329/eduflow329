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
const guestUserRoutes = require("./api/routes/user.route.js");
const schoolInfo = require("./api/routes/SchoolInfo.js");


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
app.use("/api/guest", guestUserRoutes);
// user route end

// admin panel start
app.use("/api", schoolInfo);
// admin panel end




// default
const addTeacher = {
  teacherID: Number,
  teacherName: String
};

//view
//admin page
app.get('/', (req, res) => {
  const sql = 'SELECT * FROM teacher';
  const sql2 = 'SELECT * FROM teacher WHERE teacher_id = ?';
  const sql3 = 'SELECT * FROM teacher ORDER BY teacher_id DESC LIMIT 10';

  connection.query(sql, (err, result1) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
      return;
    }

    connection.query(sql3, (err, result11) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data11');
        return;
      }

      // in serach by teacher id
      // const lastTeacherID = teacherID;
      connection.query(sql2, [teacherID], (err, result2) => {
        if (err) {
          console.error('Error fetching teacher info:', err);
          res.status(500).send('Error fetching teacher info');
          return;
        }

        connection.query(sql2, [dteacherId], (err, result3) => {
          if (err) {
            console.error('Error fetching teacher info:', err);
            res.status(500).send('Error fetching teacher info');
            return;
          }
          //console.log(Object.keys(addTeacher).length);
          // console.log(result2);
          res.render('admin', {
            addTeacher: addTeacher,
            teacher: result1,
            updateTeacher: result11,
            teacherINFO: result2,
            teacherIDD: result3
          });
        });
      });
    });
  });
});


//create teacher
app.post("/", function (req, res) {
  const teacherfName = req.body.tfName;
  const teacherlName = req.body.tlName;
  addTeacher.teacherName = teacherfName + " " + teacherlName;
  const teacherData = {
    fname: teacherfName,
    lname: teacherlName
  };
  // console.log(teacherData);
  const sql = 'INSERT INTO teacher (fname, lname) VALUES (?, ?)';
  const values = [teacherData.fname, teacherData.lname];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
      return;
    }
    addTeacher.teacherID = results.insertId;
    // console.log('Data inserted successfully -- New ID add:', results.insertId);
    res.redirect("/#addTeacher");
  });

});


var teacherID = 0;

// for update
app.post("/tupdate", function (req, res) {
  const ID = req.body.teacher_id;
  teacherID = ID;
  res.redirect("/#updateTeacher");
});

app.post("/tupdatef", function (req, res) {
  const teacher_id = teacherID;
  const fname = req.body.tufName;
  const lname = req.body.tulName;

  const updateSql = 'UPDATE teacher SET fname = ?, lname = ? WHERE teacher_id = ?';

  connection.query(updateSql, [fname, lname, teacher_id], (err, result) => {
    if (err) {
      console.error('Error updating teacher info:', err);
      res.status(500).send('Error updating teacher info');
      return;
    }

    // console.log(fname+" "+lname+" "+teacher_id);
    console.log(result);
    res.redirect("/#updateTeacher");
  });
});

//delete teacher
var dteacherId = "";
app.post("/tdelete", function (req, res) {
  dteacherId = req.body.teacher_id;
  res.redirect("/#deleteTeacher");
  // res.status(200).render("admin",{ID:ID,fullName:fullName});
});

app.post("/tdeletef", function (req, res) {
  const teacherIDToDelete = dteacherId;

  const deleteSql = 'DELETE FROM teacher WHERE teacher_id = ?';

  connection.query(deleteSql, [teacherIDToDelete], (err, result) => {
    if (err) {
      console.error('Error deleting teacher:', err);
      res.status(500).send('Error deleting teacher');
      return;
    }

    console.log('Teacher deleted successfully ID ' + teacherIDToDelete);
    res.redirect("/#deleteTeacher");
  });
});




app.listen(5000, function () {
  console.log("Node js Server started on port 5000");
});