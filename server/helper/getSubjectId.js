const connection = require("../api/sql/db.js");

function getOrCreateSubjectID(subjectName) {
  // Check if subjectName is a string
  console.log(subjectName)
  if (typeof subjectName !== 'string') {
    return Promise.reject("Subject name must be a string");
  }

  const normalizedSubjectName = subjectName.toLowerCase(); // Convert to lowercase

  return new Promise((resolve, reject) => {
    const sqlSelect = 'SELECT subject_id FROM subject WHERE LOWER(sub_name) = ?'; // Compare in lowercase
    connection.query(sqlSelect, [normalizedSubjectName], (error, result) => {
      if (error) {
        console.error("Error retrieving subject ID:", error);
        return reject("Error retrieving subject ID");
      }

      if (result.length > 0) {
        return resolve(result[0].subject_id);
      } else {
        const sqlInsert = 'INSERT INTO subject (sub_name) VALUES (?)';
        connection.query(sqlInsert, [subjectName], (insertError, insertResult) => {
          if (insertError) {
            console.error("Error creating new subject:", insertError);
            return reject("Error creating new subject");
          }
          resolve(insertResult.insertId);
        });
      }
    });
  });
}



function getSubjectNameById(subjectId) {
    return new Promise((resolve, reject) => {
      const sqlSelect = 'SELECT sub_name FROM subject WHERE subject_id = ?';
      connection.query(sqlSelect, [subjectId], (error, result) => {
        if (error) {
          console.error("Error retrieving subject name:", error);
          return reject("Error retrieving subject name");
        }
  
        if (result.length > 0) {
          return resolve(result[0].sub_name);
        } else {
          return reject("Subject not found");
        }
      });
    });
  }
  
  module.exports = { getOrCreateSubjectID, getSubjectNameById };
  
