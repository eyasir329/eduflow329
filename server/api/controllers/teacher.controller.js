const { getAddressId } = require("../../helper/getAddressData.js");
const { selectSocialIdFromUsers, updateSocialData } = require("../../helper/getSocialData.js");
const { generateUser, selectKeyFromUserStatus, updateUserInfo } = require("../../helper/getUserInfo.js");
const connection = require("../sql/db.js");

// Function to replace a character at a specific index in a string and return an integer
function replaceAndReturnInteger(str, index, replacement) {
    const chars = str.split('');
    chars[index] = replacement.toString();
    return parseInt(chars.join(''), 10);
}

// Endpoint to insert student user status
// Endpoint to insert student user status
exports.insertStudentUserStatus = (req, res, next) => {
    const { Id, email, academicID, fatherEmail, motherEmail, guardianEmail, gender } = req.body;
    const studentId = Id;
    const fatherId = replaceAndReturnInteger(studentId, 2, 3);
    const motherId = replaceAndReturnInteger(studentId, 2, 4);
    const guardianId = replaceAndReturnInteger(studentId, 2, 5);

    // Generate user data for parents and student
    Promise.all([
        generateUser("parent", fatherId, fatherEmail),
        generateUser("parent", motherId, motherEmail),
        generateUser("parent", guardianId, guardianEmail),
        generateUser("student", studentId, email)
    ]).then(([fatherParentId, motherParentId, guardianParentId, studentUserId]) => {
        // Insert parent data into the parents table
        const parentSql = `
            INSERT INTO parents (father_user_id, mother_user_id, guardian_user_id)
            VALUES (?, ?, ?)`;
        connection.query(parentSql, [fatherId, motherId, guardianId], (parentError, parentResults) => {
            if (parentError) {
                console.error('Error inserting parent data:', parentError);
                res.status(500).json({ error: 'Failed to insert parent data' });
                return;
            }
            const parentId = parentResults.insertId;

            // Insert student data
            const studentSql = `
                INSERT INTO students (student_id, parent_id, gender, class_id)
                VALUES (?, ?, ?, ?)`;
            connection.query(studentSql, [studentId, parentId, gender, academicID], (studentError, studentResults) => {
                if (studentError) {
                    console.error('Error inserting student data:', studentError);
                    res.status(500).json({ error: 'Failed to insert student data' });
                    return;
                }
                res.status(200).json({ message: 'Student user status inserted successfully' });
            });
        });
    }).catch(error => {
        console.error('Error generating user data:', error);
        res.status(500).json({ error: 'Failed to generate user data' });
    });
};

exports.viewStudentUserStatus = async (req, res, next) => {
    try {
        // Assuming you have a MySQL connection pool set up
        const sql = `
            SELECT us.user_id, us.status,us.user_type, us.created_at, us.key, 
                   s.email
            FROM user_status AS us
            JOIN users AS u ON us.user_id = u.user_id
            LEFT JOIN socials AS s ON u.social_id = s.social_id
            ORDER BY us.created_at DESC`;

        connection.query(sql, (error, results) => {
            if (error) {
                console.error('Error fetching user status:', error);
                return res.status(500).json({ error: 'Failed to fetch user status' });
            }

            // Send fetched user status data as JSON response
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error fetching user status:', error);
        res.status(500).json({ error: 'Failed to fetch user status' });
    }
};


//   student

exports.createStudent = async (req, res, next) => {
    try {
        const data = req.body;
        console.log(data);

        const { userId,
            firstName,
            lastName,
            dateOfBirth,
            nidNum,
            birthCirtificate,
            phoneNumber,
            facebook,
            linkedin,
            streetAddress,
            city,
            state,
            zip,
            profilePicture,
            key } = data;

        console.log(birthCirtificate)

        // Check if the provided key matches the stored key for the user
        const validKeyResult = await selectKeyFromUserStatus(userId);

        // If the provided key matches the stored key
        if (validKeyResult && validKeyResult.key === key) {
            // Update the user's social information
            const socialIdResult = await selectSocialIdFromUsers(userId);

            const socialData = {
                phone: phoneNumber,
                facebook: facebook,
                linkedin: linkedin
            };

            await updateSocialData(socialIdResult.social_id, socialData);

            // Update the user's address information
            const addressData = {
                city: city,
                division: state,
                zip: zip,
            };
            const addressId = await getAddressId(addressData);

            // Update the user's information
            const userData = {
                first_name: firstName,
                last_name: lastName,
                profile_pic: profilePicture,
                date_of_birth: dateOfBirth,
                birth_cirtificate_no: birthCirtificate,
                nid_no: nidNum,
                street_address: streetAddress,
                address_id: addressId
            };

            await updateUserInfo(userId, userData);

            res.status(200).json({ message: 'Student created successfully' });
        } else {
            res.status(401).json({ error: 'Invalid key' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



// // Route handler to update a student
// exports.updateStudent = async (req, res, next) => {
//     try {
//         const data = req.body;
//         console.log(data)
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
//         const address_id = await getAddressId(addressValues);

//         // Create social id
//         const email = data.email;
//         const phone = data.phoneNumber;
//         const facebook = data.facebook;
//         const linkedin = data.linkedin;
//         const social_id = await getSocialId(email, phone, facebook, linkedin);

//         // Update the student in the database
//         const sql = `
//             UPDATE students
//             SET first_name=?, last_name=?, father_name=?, mother_name=?, guardian_name=?, date_of_birth=?, admitted_date=?, profile_pic=?, gender=?, class_id=?, social_id=?, address_id=?
//             WHERE student_id=?
//         `;
//         connection.query(sql, [firstName, lastName, fatherName, motherName, guardianName, dateOfBirth, admittedDate, profilePicture, gender, classId, social_id, address_id, studentId]);
//         console.log("Student updated successfully");
//         // Send success response
//         res.status(200).json({ success: true, message: "Student updated successfully" });
//     } catch (error) {
//         console.error("Error updating student:", error);
//         res.status(500).json({ success: false, message: "Failed to update student" });
//     }
// };


// // Route handler to delete a student
// exports.deleteStudent = async (req, res, next) => {
//     try {
//         const studentId = req.params.studentId;

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

// exports.viewStudent = async (req, res, next) => {
//     try {
//         const studentInfoQuery = `
//   SELECT
//     s.student_id as studentId,
//     s.parent_id as parentId,
//     s.first_name as firstName,
//     s.last_name as lastName,
//     s.gender,
//     s.father_name as fatherName,
//     s.mother_name as motherName,
//     s.guardian_name as guardianName,
//     s.date_of_birth as dateOfBirth,
//     s.admitted_date as admittedDate,
//     s.profile_pic as profilePicture,
//     sc.email,
//     sc.phone as phoneNumber,
//     sc.facebook,
//     sc.linkedin,
//     sc.twitter,
//     a.city,
//     a.division as state,
//     a.zip,
//     a.street_address as streetAddress,
//     aa.class_id as classId
//   FROM
//     students s
//   LEFT JOIN
//     socials sc ON s.social_id = sc.social_id
//   LEFT JOIN
//     addresses a ON s.address_id = a.address_id
//     LEFT JOIN
//     academics aa ON s.class_id = aa.class_id
// `;

//         // Execute the query
//         connection.query(studentInfoQuery, (error, results) => {
//             if (error) {
//                 console.error('Error querying data from MySQL:', error);
//                 res.status(500).json({ error: 'Internal server error' });
//             } else {
//                 if (results.length > 0) {
//                     // Convert timestamps to date format
//                     results.forEach(student => {
//                         student.dateOfBirth = convertTimestampToDate(student.dateOfBirth);
//                         student.admittedDate = convertTimestampToDate(student.admittedDate);
//                     });
//                     // Students found, return their information
//                     res.status(200).json(results);
//                 } else {
//                     // No students found
//                     res.status(404).json({ error: 'No students found' });
//                 }
//             }
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };







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









