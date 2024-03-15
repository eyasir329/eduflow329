const connection = require("../api/sql/db.js");

function viewTeacherData(req, res) {
    const query = `
        SELECT t.teacher_id, CONCAT(u.first_name, ' ', u.last_name) AS teacher_name, t.subject_id 
        FROM teaches t
        JOIN users u ON t.teacher_id = u.user_id
    `;
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error viewing position data:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        } else {
            console.log(results)
            res.status(200).json({ success: true, positions: results });
        }
    });
}


module.exports = {viewTeacherData};
