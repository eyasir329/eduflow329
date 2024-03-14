const connection = require("../api/sql/db.js");

// Function to extract the last three digits of an ID
function getLastThreeDigits(id) {
    const idString = String(id); // Convert to string
    return idString.slice(-3);
}

exports.lastStaffId = async (req, res, next) => {
    try {
        const sql = "SELECT staff_id FROM staffs ORDER BY CAST(RIGHT(staff_id, 3) AS UNSIGNED) DESC LIMIT 1";
        const [rows, fields] = await connection.promise().query(sql);
        if (rows.length > 0) {
            const staffId = rows[0].staff_id;
            const lastThreeDigits = getLastThreeDigits(staffId);
            res.status(200).json({ lastThreeDigits });
        } else {
            // Send a default value if no staff ID is found
            res.status(200).json({ lastThreeDigits: '000' });
        }
    } catch (error) {
        console.error("Error retrieving last staff ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.lastTeacherId = async (req, res, next) => {
    try {
        const sql = "SELECT teacher_id FROM teaches ORDER BY CAST(RIGHT(teacher_id, 3) AS UNSIGNED) DESC LIMIT 1";
        const [rows, fields] = await connection.promise().query(sql);
        if (rows.length > 0) {
            const teacherId = rows[0].teacher_id;
            const lastThreeDigits = getLastThreeDigits(teacherId);
            res.status(200).json({ lastThreeDigits });
        } else {
            // Send a default value if no teacher ID is found
            res.status(200).json({ lastThreeDigits: '000' });
        }
    } catch (error) {
        console.error("Error retrieving last teacher ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.lastStudentId = async (req, res, next) => {
    try {
        const sql = "SELECT student_id FROM students ORDER BY CAST(RIGHT(student_id, 3) AS UNSIGNED) DESC LIMIT 1";
        const [rows, fields] = await connection.promise().query(sql);
        if (rows.length > 0) {
            const studentId = rows[0].student_id;
            const lastThreeDigits = getLastThreeDigits(studentId);
            res.status(200).json({ lastThreeDigits });
        } else {
            // Send a default value if no student ID is found
            res.status(200).json({ lastThreeDigits: '000' });
        }
    } catch (error) {
        console.error("Error retrieving last student ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

