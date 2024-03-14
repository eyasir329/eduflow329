const connection = require("../api/sql/db.js");

function viewAcademicData(req, res) {
    const query = 'SELECT class_id, class_name FROM academics';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error viewing position data:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        } else {
            // console.log(results)
            res.status(200).json({ success: true, positions: results });
        }
    });
}

function viewSubjectData(req, res) {
    const query = 'SELECT subject_id, sub_name FROM subject';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error viewing position data:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        } else {
            res.status(200).json({ success: true, subjects: results });
        }
    });
}



module.exports = {viewAcademicData,viewSubjectData};
