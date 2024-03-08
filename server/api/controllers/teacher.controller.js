// const connection = require("../sql/db.js");
// const jwt = require("jsonwebtoken");
// const User = require("../models/user.model.js");

// const getAddressId = require('../../helper/getAddressId.js');
// const getSocialId = require('../../helper/getSocialId.js')


// exports.teacherProfile = async (req, res, next) => {
//     try {
//         // Assuming req.body contains the teacher's userId
//         const { userId } = req.body;

//         // Fetch the teacher's profile from the database using their userId
//         const teacherProfile = await User.findOne({ userId: userId, role: "teacher" });


//         if (!teacherProfile) {
//             return res.status(404).json({ message: 'Teacher profile not found' });
//         } else {
//             // If the profile is found, send it in the response
//             const teacherId = teacherProfile.userId;

//             try {
//                 const teacherInfoQuery = `
//     SELECT t.teacher_id as teacherId,t.first_name as firstName,t.last_name as lastName,t.joining_date as joiningDate,t.position as position,t.salary as salary,t.date_of_birth as dateOfBirth,t.profile_pic as profilePicture, s.email, s.phone, s.facebook, s.linkedin, s.twitter, a.city, a.division as state, a.zip, a.street_address as streetAddress,s.phone as phoneNumber
//     FROM teaches t
//     LEFT JOIN socials s ON t.social_id = s.social_id
//     LEFT JOIN addresses a ON t.address_id = a.address_id
//     WHERE t.teacher_id=?
// `;

//                 connection.query(teacherInfoQuery, [teacherId], (error, results) => {
//                     if (error) {
//                         console.error('Error querying data from MySQL:', error);
//                         res.status(500).json({ error: 'Internal server error' });
//                     } else {
//                         if (results.length > 0) {
//                             // Convert timestamps to date format if needed
//                             results.forEach(teacher => {
//                                 // Convert timestamps to date format if needed
//                                 teacher.joiningDate = convertTimestampToDate(teacher.joiningDate);
//                                 teacher.dateOfBirth = convertTimestampToDate(teacher.dateOfBirth);
//                             });
//                             // Teachers found, return their information
//                             res.status(200).json(results);
//                         } else {
//                             // No teachers found
//                             res.status(404).json({ error: 'No teachers found' });
//                         }
//                     }
//                 });

//             } catch (error) {
//                 console.error('Error:', error);
//                 res.status(500).json({ error: 'Internal server error' });
//             }
//         }

//     } catch (error) {
//         // If an error occurs during database interaction, return an error response
//         console.error('Error fetching teacher profile:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// }

// function convertTimestampToDate(timestamp) {
//     const date = new Date(timestamp);
//     return date.toISOString().split('T')[0];
// }


// exports.teacherProfileUpdate = async (req, res, next) => {
//     try {
//         const data = req.body;
//         console.log(data);
//         const {
//             teacherId,
//             firstName,
//             lastName,
//             joiningDate,
//             position,
//             salary,
//             dateOfBirth,
//             profilePicture,
//         } = data;

//         // Convert joiningDate and dateOfBirth to date format
//         const formattedJoiningDate = convertTimestampToDate(joiningDate);
//         const formattedDateOfBirth = convertTimestampToDate(dateOfBirth);

//         // Create address id
//         const city = data.city;
//         const division = data.state;
//         const zip = data.zip;
//         const street_address = data.streetAddress;
//         const addressValues = [city, division, zip, street_address];

//         // Create social id
//         const email = data.email;
//         const phone = data.phoneNumber;
//         const facebook = data.facebook;
//         const linkedin = data.linkedin;
//         const twitter = data.twitter || "";

//         Promise.all([
//             getAddressId(addressValues),
//             getSocialId(email, phone, facebook, linkedin, twitter)
//         ])
//             .then(([addressId, socialId]) => {
//                 const address_id = parseInt(addressId);
//                 const social_id = parseInt(socialId);

//                 const sql = `UPDATE teaches 
//                         SET 
//                         first_name = ?,
//                         last_name = ?,
//                         joining_date = ?,
//                         position = ?,
//                         salary = ?,
//                         date_of_birth = ?,
//                         profile_pic = ?,
//                         social_id = ?,
//                         address_id = ?
//                         WHERE teacher_id = ?`;

//                 connection.query(sql, [firstName, lastName, formattedJoiningDate, position, salary, formattedDateOfBirth, profilePicture, social_id, address_id, teacherId], (error, results) => {
//                     if (error) {
//                         console.error('Error updating teacher information:', error);
//                         res.status(500).json({ error: 'Internal server error' });
//                     } else {
//                         console.log('Teacher information updated successfully:', results);
//                         res.status(200).json({ message: 'Teacher information for ' + teacherId + ' updated successfully' });
//                     }
//                 });
//             })
//             .catch(error => {
//                 console.error('Error getting address ID or social ID:', error);
//                 res.status(500).json({ error: 'Internal server error' });
//             });


//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }


// exports.studentByClassTeacher = async (req, res, next) => {
//     const teacherId = req.params.teacherId;
//     console.log(teacherId);

//     const classIdsQuery = `
//         SELECT class_id 
//         FROM academics
//         WHERE class_teacher_id = ?
//         LIMIT 1`; // Add LIMIT 1 to limit the result to one row

//     try {
//         // Assuming you have a database connection named 'connection'
//         connection.query(classIdsQuery, [teacherId], (error, classIds) => {
//             if (error) {
//                 console.error('Error fetching class ID:', error);
//                 return res.status(500).json({ error: 'Failed to fetch class ID' });
//             } else {
//                 if (classIds.length === 0) {
//                     // If no class ID found for the teacher, return empty response
//                     return res.status(200).json([]);
//                 }
//                 const classId = classIds[0].class_id; // Take the first class ID
//                 const studentQuery = `
//                     SELECT
//                         s.student_id as studentId,
//                         s.parent_id as parentId,
//                         s.first_name as firstName,
//                         s.last_name as lastName,
//                         s.gender,
//                         s.father_name as fatherName,
//                         s.mother_name as motherName,
//                         s.guardian_name as guardianName,
//                         s.date_of_birth as dateOfBirth,
//                         s.admitted_date as admittedDate,
//                         s.profile_pic as profilePicture,
//                         sc.email,
//                         sc.phone as phoneNumber,
//                         sc.facebook,
//                         sc.linkedin,
//                         sc.twitter,
//                         a.city,
//                         a.division as state,
//                         a.zip,
//                         a.street_address as streetAddress,
//                         aa.class_id as classId
//                     FROM
//                         students s
//                     LEFT JOIN
//                         socials sc ON s.social_id = sc.social_id
//                     LEFT JOIN
//                         addresses a ON s.address_id = a.address_id
//                     LEFT JOIN
//                         academics aa ON s.class_id = aa.class_id
//                     WHERE s.class_id = ?`; // Directly pass class ID to IN clause

//                 connection.query(studentQuery, [classId], (error, students) => {
//                     if (error) {
//                         console.error('Error fetching students:', error);
//                         return res.status(500).json({ error: 'Failed to fetch students' });
//                     } else {
//                         return res.status(200).json(students);
//                     }
//                 });
//             }
//         });
//     } catch (error) {
//         console.error('Error executing SQL query:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };



// exports.updateStudentByClassTeacher = async (req, res, next) => {
//     try {
//         const data = req.body;
//         console.log(data);
//         const {
//             studentId,
//             parentId,
//             firstName,
//             lastName,
//             phoneNumber,
//             fatherName,
//             motherName,
//             guardianName,
//             dateOfBirth,
//             admittedDate,
//             profilePicture,
//             gender,
//             classId
//         } = data;

//         // Create address id
//         const city = data.city;
//         const division = data.state;
//         const zip = data.zip;
//         const street_address = data.streetAddress;
//         const addressValues = [city, division, zip, street_address];

//         // Create social id
//         const email = data.email;
//         const phone = data.phoneNumber;
//         const facebook = data.facebook;
//         const linkedin = data.linkedin;
//         const twitter = data.twitter || "";

//         Promise.all([
//             getAddressId(addressValues),
//             getSocialId(email, phone, facebook, linkedin, twitter)
//         ])
//         .then(([addressId, socialId]) => {
//             const address_id = parseInt(addressId);
//             const social_id = parseInt(socialId);

//             // Convert date strings to MySQL format
//             const formattedDateOfBirth = new Date(dateOfBirth).toISOString().slice(0, 19).replace('T', ' ');
//             const formattedAdmittedDate = new Date(admittedDate).toISOString().slice(0, 19).replace('T', ' ');

//             // Update the student in the database
//             const sql = `
//                 UPDATE students
//                 SET first_name=?, last_name=?, father_name=?, mother_name=?, guardian_name=?, date_of_birth=?, admitted_date=?, profile_pic=?, gender=?, class_id=?, social_id=?, address_id=?
//                 WHERE student_id=?
//             `;
//             connection.query(sql, [firstName, lastName, fatherName, motherName, guardianName, formattedDateOfBirth, formattedAdmittedDate, profilePicture, gender, classId, social_id, address_id, studentId], (error, results) => {
//                 if (error) {
//                     console.error('Error updating student information:', error);
//                     res.status(500).json({ error: 'Internal server error' });
//                 } else {
//                     console.log('Student information updated successfully:', results);
//                     res.status(200).json({ message: 'Student information for ' + studentId + ' updated successfully' });
//                 }
//             });
//         })
//         .catch(error => {
//             console.error('Error getting address ID or social ID:', error);
//             res.status(500).json({ error: 'Internal server error' });
//         });
//     } catch (error) {
//         console.error('Error updating student:', error);
//         res.status(500).json({ success: false, message: "Failed to update student" });
//     }
// }

// exports.deleteStudentByClassTeacher = async (req, res, next) => {
//     try {
//         const studentId = req.params.studentId;
//         console.log(studentId)
//         // Delete the student from the database
//         const query = `
//         DELETE FROM students
//         WHERE student_id=?
//       `;
//         connection.query(query, [studentId]);

//         // Send success response
//         res.status(200).json({ success: true, message: "Student deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting student:", error);
//         res.status(500).json({ success: false, message: "Failed to delete student" });
//     }
// };


// // attendance





