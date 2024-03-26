const { getAddressId } = require("../../helper/getAddressData.js");
const { getPositionId } = require("../../helper/getPositionData.js");
const { selectSocialIdFromUsers, updateSocialData } = require("../../helper/getSocialData.js");
const { getOrCreateSubjectID, getSubjectNameById } = require("../../helper/getSubjectId.js");
const { selectKeyFromUserStatus, updateUserInfo, updateUserStatusCreationDate } = require("../../helper/getUserInfo.js");
const connection = require("../sql/db.js");

// insert staff user status
exports.insertTeacherUserStatus = async (req, res, next) => {
    try {
        // Assuming you have a MySQL connection pool set up
        const { type, typeOption, Id, email, subjectID } = req.body;
        console.log(type, typeOption, Id, email, subjectID)

        // Insert user status data
        const userStatusSql = `
            INSERT INTO user_status (user_id, user_type)
            VALUES (?, ?)`;
        connection.query(userStatusSql, [Id, type.toLowerCase()], (error, results) => {
            if (error) {
                console.error('Error inserting staff user status:', error);
                return res.status(500).json({ error: 'Failed to insert staff user status' });
            }

            // Insert email into socials table and get social_id
            const socialSql = `
                INSERT INTO socials (email)
                VALUES (?)`;
            connection.query(socialSql, [email], (socialError, socialResults) => {
                if (socialError) {
                    console.error('Error inserting social data:', socialError);
                    return res.status(500).json({ error: 'Failed to insert social data' });
                }

                const socialId = socialResults.insertId;

                // Insert data into users table
                const updateUserSql = `
                    INSERT INTO users (user_id, social_id)
                    VALUES (?, ?)`;
                connection.query(updateUserSql, [Id, socialId], (updateUserError, updateUserResults) => {
                    if (updateUserError) {
                        console.error('Error updating users table:', updateUserError);
                        return res.status(500).json({ error: 'Failed to update users table' });
                    }

                    // Insert teacher data
                    const teacherSql = `
                        INSERT INTO teaches (teacher_id, position_id,subject_id)
                        VALUES (?, ? ,?)`;
                    connection.query(teacherSql, [Id, typeOption, subjectID], (teacherError, teacherResults) => {
                        if (teacherError) {
                            console.error('Error inserting teacher data:', teacherError);
                            return res.status(500).json({ error: 'Failed to insert teacher data' });
                        }

                        res.status(200).json({ message: 'teacher user status inserted successfully' });
                    });
                });
            });
        });
    } catch (error) {
        console.error('Error inserting teacher user status:', error);
        res.status(500).json({ error: 'Failed to insert teacher user status' });
    }
};

// view teacher user status
exports.viewTeacherUserStatus = async (req, res, next) => {
    try {
        // Assuming you have a MySQL connection pool set up
        const sql = `
            SELECT us.user_id, us.status, us.created_at,us.user_type, us.key, 
                   s.email, 
                   p.position_name,
                   t.subject_id 
            FROM user_status AS us
            JOIN users AS u ON us.user_id = u.user_id
            LEFT JOIN socials AS s ON u.social_id = s.social_id
            JOIN teaches AS t ON u.user_id = t.teacher_id
            LEFT JOIN positions AS p ON t.position_id = p.position_id
            ORDER BY us.created_at DESC;`;

        connection.query(sql, (error, results) => {
            if (error) {
                console.error('Error fetching user status:', error);
                res.status(500).json({ error: 'Failed to fetch user status' });
                return;
            }


            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error fetching user status:', error);
        res.status(500).json({ error: 'Failed to fetch user status' });
    }
};

// create user 
exports.createTeacher = async (req, res, next) => {
    try {
        const data = req.body;
        // console.log(data);

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

        // console.log(birthCirtificate)

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

            res.status(200).json({ message: 'Teacher created successfully' });
        } else {
            res.status(401).json({ error: 'Invalid key' });
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// view teacher info
exports.viewTeacher = async (req, res, next) => {
    try {
        const teacherInfoQuery = `
            SELECT 
                t.teacher_id as teacherId,
                u.first_name as firstName,
                u.last_name as lastName,
                u.date_of_birth as dateOfBirth,
                u.profile_pic as profilePicture,
                u.nid_no as nidNum,
                u.birth_cirtificate_no as birthCertificate,
                u.street_address as streetAddress,
                us.created_at as joiningDate,
                p.position_name as position,
                p.salary as salary,
                s.email,
                s.phone as phoneNumber,
                s.facebook,
                s.linkedin,
                a.city,
                a.division as state,
                a.zip,
                sub.sub_name as subjectName
            FROM 
                teaches t
                JOIN users u ON t.teacher_id = u.user_id
                JOIN user_status us ON t.teacher_id = us.user_id
                LEFT JOIN socials s ON u.social_id = s.social_id
                LEFT JOIN addresses a ON u.address_id = a.address_id
                LEFT JOIN positions p ON p.position_id = t.position_id
                LEFT JOIN subject sub ON sub.subject_id = t.subject_id
        `;

        // Execute the query
        connection.query(teacherInfoQuery, (error, results) => {
            if (error) {
                console.error('Error querying data from MySQL:', error);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (results.length > 0) {
                // Convert timestamps to date format
                results.forEach(teacher => {
                    teacher.joiningDate = convertTimestampToDate(teacher.joiningDate);
                    teacher.dateOfBirth = convertTimestampToDate(teacher.dateOfBirth);
                });

                // Teachers found, return their information
                res.status(200).json(results);
            } else {
                // No teachers found
                res.status(404).json({ error: 'No teachers found' });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


function convertTimestampToDate(timestamp) {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
}

exports.updateTeacher = async (req, res, next) => {
    try {
        const data = req.body;
        console.log(data)
        const {
            teacherId,
            firstName,
            lastName,
            position,
            dateOfBirth,
            nidNum,
            birthCertificate,
            profilePicture,
            facebook,
            linkedin,
            city,
            state,
            zip,
            streetAddress,
            joiningDate,
            phoneNumber,
            subjectName
        } = data;

        console.log(teacherId,
            firstName,
            lastName,
            position,
            dateOfBirth,
            nidNum,
            birthCertificate,
            profilePicture,
            facebook,
            linkedin,
            city,
            state,
            zip,
            streetAddress,
            joiningDate,
            phoneNumber,
            subjectName)

        const formattedJoiningDate = convertTimestampToDate(joiningDate);
        const formattedDateOfBirth = convertTimestampToDate(dateOfBirth);

        // Get or create position ID
        const positionId = await getPositionId(position);

        // Get or create subject ID
        const subjectId = await getOrCreateSubjectID(subjectName);

        const socialData = {
            phone: phoneNumber,
            facebook: facebook,
            linkedin: linkedin,
        };

        const socialIdResult = await selectSocialIdFromUsers(teacherId);
        await updateSocialData(socialIdResult.social_id, socialData);

        // Prepare address data
        const addressData = {
            city: city,
            division: state,
            zip: zip
        };

        // Get or insert address ID
        const addressId = await getAddressId(addressData);

        const userData = {
            first_name: firstName,
            last_name: lastName,
            profile_pic: profilePicture,
            date_of_birth: formattedDateOfBirth,
            birth_cirtificate_no: birthCertificate,
            nid_no: nidNum,
            street_address: streetAddress,
            address_id: addressId
        };

        // Update user information
        await updateUserInfo(teacherId, userData);

        await updateUserStatusCreationDate(teacherId, formattedJoiningDate);

        // Update teacher information in the database
        const sql = `UPDATE teaches 
                    SET 
                    position_id = ?,
                    subject_id = ?
                    WHERE teacher_id = ?`;

        connection.query(sql, [positionId, subjectId, teacherId], (error, results) => {
            if (error) {
                console.error('Error updating teacher information:', error);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                console.log('Teacher information updated successfully:', results);
                res.status(200).json({ message: 'Teacher information for ' + teacherId + ' updated successfully' });
            }
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.deleteTeacher = async (req, res, next) => {
    try {
        const teacher_id = req.params.teacherId;
        console.log(teacher_id)

        const socialIdResult = await selectSocialIdFromUsers(teacher_id);

        await connection.execute('DELETE FROM socials WHERE social_id = ?', [socialIdResult.social_id]);

        await connection.execute('DELETE FROM user_status WHERE user_id = ?', [teacher_id]);

        res.status(200).json({ message: `Teacher with ID ${teacher_id} deleted successfully` });

    } catch (error) {
        console.error('Error deleting teacher:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// Academic Section

exports.createAcademic = async (req, res, next) => {
    try {
        const { classId, className, roomNumber, session, classTeacherId, classCaptainId, syllabus } = req.body;

        console.log(classId, className, roomNumber, session, classTeacherId, classCaptainId, syllabus)
        // Parse roomNumber as integer
        const roomNumberValue = parseInt(roomNumber);
        // Convert empty strings to null for integer fields
        const classTeacherIdValue = classTeacherId === '' ? null : classTeacherId;
        const classCaptainIdValue = classCaptainId === '' ? null : classCaptainId;

        // SQL query for insert or update
        const sqlQuery = `
            INSERT INTO academics (class_id, class_name, room_number, session, class_teacher_id, class_captain_id,syllabus)
            VALUES (?, ?, ?, ?, ?, ?,?)
            ON DUPLICATE KEY UPDATE
            class_name = VALUES(class_name),
            room_number = VALUES(room_number),
            session = VALUES(session),
            class_teacher_id = VALUES(class_teacher_id),
            class_captain_id = VALUES(class_captain_id),
            syllabus = VALUES(syllabus)
        `;

        // Execute the SQL query
        connection.query(sqlQuery, [classId, className, roomNumberValue, session, classTeacherIdValue, classCaptainIdValue, syllabus], (error, results) => {
            if (error) {
                throw error;
            }

            // Respond with the ID of the newly created or updated academic record
            res.status(201).json({ message: "classId " + classId + " create or updated successfully" });
        });
    } catch (error) {
        // If an error occurs, pass it to the error handling middleware
        next(error);
    }
};

exports.viewAcademic = async (req, res, next) => {
    try {
        // Perform a query to fetch academic data from the database
        connection.query('SELECT * FROM academics', (error, results, fields) => {
            if (error) {
                throw error;
            }

            // Transform the keys in the results
            const transformedResults = results.map(row => ({
                classId: row.class_id,
                className: row.class_name,
                session: row.session,
                classTeacherId: row.class_teacher_id,
                classCaptainId: row.class_captain_id,
                roomNumber: row.room_number,
                syllabus: row.syllabus
            }));

            // Send the transformed data as a response
            res.status(200).json(transformedResults);
        });
    } catch (error) {
        // If an error occurs, pass it to the error handling middleware
        next(error);
    }
};

exports.updateAcademic = async (req, res, next) => {
    try {
        const { classId, className, session, classTeacherId, classCaptainId, roomNumber, syllabus } = req.body;

        console.log(req.body);

        // Perform a query to update academic data in the database
        connection.query(
            'UPDATE academics SET class_name = ?, session = ?, class_teacher_id = ?, class_captain_id = ?, room_number = ? ,syllabus = ? WHERE class_id = ?',
            [className, session, classTeacherId, classCaptainId, roomNumber, syllabus, classId],
            (error, results, fields) => {
                if (error) {
                    throw error;
                }

                // Send success response
                res.status(200).json({ message: 'Academic data updated successfully' });
            }
        );
    } catch (error) {
        // If an error occurs, pass it to the error handling middleware
        next(error);
    }
};

exports.deleteAcademic = async (req, res, next) => {
    try {
        const { classId } = req.body;

        // Perform a query to delete academic data from the database
        connection.query('DELETE FROM academics WHERE class_id = ?', [classId], (error, results) => {
            if (error) {
                throw error;
            }

            // Check if any rows were affected by the delete operation
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Academic data not found" });
            }

            // Send a success response
            res.status(200).json({ message: "Academic data deleted successfully" });
        });
    } catch (error) {
        // If an error occurs, pass it to the error handling middleware
        next(error);
    }
};

// general subject section
exports.createSubject = async (req, res, next) => {
    try {
        const { subjectName } = req.body;

        console.log(subjectName)

        // Check if a subject with the same name exists (case-insensitive)
        const checkQuery = 'SELECT * FROM subject WHERE LOWER(sub_name) = LOWER(?)';

        connection.query(checkQuery, [subjectName], (error, results) => {
            if (error) {
                console.error('Error checking subject:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            if (results.length > 0) {
                // Subject with the same name already exists
                res.status(400).json({ error: 'Subject already exists' });
            } else {
                // Prepare the SQL query to insert the new subject
                const insertQuery = 'INSERT INTO subject (sub_name) VALUES (?)';

                // Execute the SQL query to insert the new subject
                connection.query(insertQuery, [subjectName], (error, results) => {
                    if (error) {
                        console.error('Error creating subject:', error);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        // Send a success response with the inserted subject
                        const newSubject = { id: results.insertId, subjectName };
                        res.status(201).json(newSubject);
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error creating subject:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.viewSubject = async (req, res, next) => {
    try {
        // Prepare the SQL query to select all subjects
        const selectQuery = 'SELECT * FROM subject';

        // Execute the SQL query to retrieve all subjects
        connection.query(selectQuery, (error, results) => {
            if (error) {
                // Handle errors
                console.error('Error fetching subjects:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                // Send a success response with the retrieved subjects
                res.status(200).json(results);
            }
        });
    } catch (error) {
        // Handle other errors
        console.error('Error fetching subjects:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.updateSubject = async (req, res, next) => {
    try {
        const { subject_id } = req.params;
        const { subjectName } = req.body;

        // Prepare the SQL query
        const updateQuery = 'UPDATE subject SET sub_name = ? WHERE subject_id = ?';

        // Execute the SQL query
        connection.query(updateQuery, [subjectName, subject_id], (error, results) => {
            if (error) {
                // Handle errors
                console.error('Error updating subject:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                // Check if any rows were affected
                if (results.affectedRows === 0) {
                    res.status(404).json({ error: 'Subject not found' });
                } else {
                    // Send a success response with the updated subject
                    const updatedSubject = { subject_id, subjectName };
                    res.status(200).json(updatedSubject);
                }
            }
        });
    } catch (error) {
        // Handle other errors
        console.error('Error updating subject:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete Subject
exports.deleteSubject = async (req, res, next) => {
    try {
        const { subject_id } = req.params;

        // Prepare the SQL query
        const deleteQuery = 'DELETE FROM subject WHERE subject_id = ?';

        // Execute the SQL query
        connection.query(deleteQuery, [subject_id], (error, results) => {
            if (error) {
                // If there's an error, send an error response
                console.error('Error deleting subject:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                // If deletion is successful, send a success response
                console.log('Subject deleted successfully');
                res.status(200).json({ success: true, message: 'Subject deleted successfully' });
            }
        });
    } catch (error) {
        // Handle other errors
        console.error('Error deleting subject:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// class subject

exports.createClassSubject = async (req, res, next) => {
    const { classSubjectID, subjectName, classID, teacherId, syllabus } = req.body;

    console.log(req.body)

    try {
        // Get or create the subject ID
        const subjectId = subjectName;

        // Convert string inputs to integers
        const parsedClassSubjectID = parseInt(classSubjectID);
        const parsedClassID = parseInt(classID);
        const parsedTeacherId =  parseInt(teacherId); // Convert to integer only if provided\

        // Insert a new subject into the database
        const query = `INSERT INTO class_subjects (class_subject_id,subject_id, class_id, teacher_id, syllabus) 
                       VALUES (?,?, ?, ?, ?)`;
        connection.query(query, [parsedClassSubjectID, subjectId, parsedClassID, parsedTeacherId, syllabus], (error, results, fields) => {
            if (error) {
                console.error('Error creating subject:', error);
                return res.status(500).json({ message: 'Failed to create subject' });
            }
            console.log('Subject created successfully');
            res.status(201).json({ message: 'Subject created successfully' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to create subject' });
    }
};

exports.viewClassSubject = async (req, res, next) => {
    try {
        // Assuming you have a MySQL connection pool set up
        connection.query('SELECT * FROM class_subjects', async (error, results) => {
            if (error) {
                console.error('Error fetching subject data:', error);
                res.status(500).json({ error: 'Failed to fetch subject data' });
                return;
            }

            try {
                // Map over each row and fetch subject name asynchronously
                const convertedResults = await Promise.all(results.map(async (row) => {
                    const subjectName = await getSubjectNameById(row.subject_id);
                    return {
                        classSubjectId: row.class_subject_id,
                        subjectName: subjectName,
                        teacherId: row.teacher_id,
                        classId: row.class_id,
                        syllabus: row.syllabus
                    };
                }));
                res.status(200).json(convertedResults); // Send fetched subject data with converted keys as JSON response
            } catch (err) {
                console.error('Error fetching subject name:', err);
                res.status(500).json({ error: 'Failed to fetch subject name' });
            }
        });
    } catch (error) {
        console.error('Error fetching subject data:', error);
        res.status(500).json({ error: 'Failed to fetch subject data' });
    }
};


exports.updateClassSubject = async (req, res, next) => {
    try {
        // Extract updated subject data from the request body
        const { classSubjectId, subjectName, teacherId, syllabus } = req.body;

        // Validate the input (if necessary)
        console.log(req.body);

        try {
            // Get or create the subject ID asynchronously
            const subjectId = await getOrCreateSubjectID(subjectName);

            // Assuming you have a MySQL connection pool set up
            connection.query(
                'UPDATE class_subjects SET subject_id = ?, teacher_id = ?, syllabus = ? WHERE class_subject_id = ?',
                [subjectId, teacherId, syllabus, classSubjectId],
                (error, results) => {
                    if (error) {
                        console.error('Error updating subject:', error);
                        res.status(500).json({ error: 'Failed to update subject' });
                        return;
                    }

                    // Check if the subject was updated successfully
                    if (results.affectedRows === 0) {
                        res.status(404).json({ error: 'Subject not found' });
                        return;
                    }

                    // Subject updated successfully
                    res.status(200).json({ message: 'Subject updated successfully' });
                }
            );
        } catch (err) {
            console.error('Error getting or creating subject ID:', err);
            res.status(500).json({ error: 'Failed to get or create subject ID' });
        }
    } catch (error) {
        console.error('Error updating subject:', error);
        res.status(500).json({ error: 'Failed to update subject' });
    }
};


exports.deleteClassSubject = async (req, res, next) => {
    try {
        const { classSubjectId } = req.params;
        // Execute the DELETE query
        connection.query('DELETE FROM class_subjects WHERE class_subject_id = ?', [classSubjectId], (error, results) => {
            if (error) {
                console.error('Error deleting subject:', error);
                // Send an error response
                res.status(500).json({ error: 'Failed to delete subject' });
                return;
            }

            // Check if any row was affected
            if (results.affectedRows === 0) {
                // If no row was affected, it means subject with provided ID doesn't exist
                res.status(404).json({ error: 'Subject not found' });
                return;
            }

            // Send a success response
            res.status(200).json({ message: 'Subject deleted successfully' });
        });
    } catch (error) {
        console.error('Error deleting subject:', error);
        // Send an error response
        res.status(500).json({ error: 'Failed to delete subject' });
    }
};




