const currentUserProfile = require("../../helper/currentUser.js");
const { getAddressId } = require("../../helper/getAddressData.js");
const { getPositionId } = require("../../helper/getPositionData.js");
const { getSocialUpdateId, updateOrCreateSocialData } = require("../../helper/getSocialData.js");
const { getOrCreateSubjectID, getSubjectNameById } = require("../../helper/getSubjectId.js");
const { updateUserInfo } = require("../../helper/getUserInfo.js");
const connection = require("../sql/db.js");

// admin user profile
exports.adminProfile = async (req, res, next) => {
    try {
        const { userId, type } = req.body;

        // Call currentUserProfile and await its result
        const data = await currentUserProfile({ userId, type });
        // console.log(data)
        // Send response with status 200 and the data returned by currentUserProfile
        console.log(data)
        res.status(200).json(data);
    } catch (error) {
        // If an error occurs, catch it and send an appropriate error response
        console.error('Error fetching admin profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// position create
exports.createPosition = async (req, res, next) => {
    try {
        const { positionName, salary } = req.body;

        // Check if a position with the same name exists (case-insensitive)
        const checkQuery = 'SELECT * FROM positions WHERE LOWER(position_name) = LOWER(?)';

        connection.query(checkQuery, [positionName], (error, results) => {
            if (error) {
                console.error('Error checking position:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            if (results.length > 0) {
                // Position with the same name already exists
                res.status(400).json({ error: 'Position already exists' });
            } else {
                // Prepare the SQL query to insert the new position
                const insertQuery = 'INSERT INTO positions (position_name, salary) VALUES (?, ?)';

                // Execute the SQL query to insert the new position
                connection.query(insertQuery, [positionName, salary], (error, results) => {
                    if (error) {
                        console.error('Error creating position:', error);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        // Send a success response with the inserted position
                        const newPosition = { id: results.insertId, positionName, salary };
                        res.status(201).json(newPosition);
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error creating position:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.viewPosition = async (req, res, next) => {
    try {
        // Prepare the SQL query to select all positions
        const selectQuery = 'SELECT * FROM positions';

        // Execute the SQL query to retrieve all positions
        connection.query(selectQuery, (error, results) => {
            if (error) {
                // Handle errors
                console.error('Error fetching positions:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                // Send a success response with the retrieved positions
                res.status(200).json(results);
            }
        });
    } catch (error) {
        // Handle other errors
        console.error('Error fetching positions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updatePosition = async (req, res, next) => {
    try {
        const { position_id } = req.params;
        const { positionName, salary } = req.body;

        // Prepare the SQL query
        const updateQuery = 'UPDATE positions SET position_name = ?, salary = ? WHERE position_id = ?';

        // Execute the SQL query
        connection.query(updateQuery, [positionName, salary, position_id], (error, results) => {
            if (error) {
                // Handle errors
                console.error('Error updating position:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                // Check if any rows were affected
                if (results.affectedRows === 0) {
                    res.status(404).json({ error: 'Position not found' });
                } else {
                    // Send a success response with the updated position
                    const updatedPosition = { position_id, positionName, salary };
                    res.status(200).json(updatedPosition);
                }
            }
        });
    } catch (error) {
        // Handle other errors
        console.error('Error updating position:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// delete position
exports.deletePosition = async (req, res, next) => {
    try {
        const { position_id } = req.params;

        // Prepare the SQL query
        const deleteQuery = 'DELETE FROM positions WHERE position_id = ?';

        // Execute the SQL query
        connection.query(deleteQuery, [position_id], (error, results) => {
            if (error) {
                // If there's an error, send an error response
                console.error('Error deleting position:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                // If deletion is successful, send a success response
                console.log('Position deleted successfully');
                res.status(200).json({ success: true, message: 'Position deleted successfully' });
            }
        });
    } catch (error) {
        // Handle other errors
        console.error('Error deleting position:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// school view

exports.schoolView = async (req, res, next) => {
    const eiin_number = 109873;

    try {
        const sqlSelectSchool = `
            SELECT s.*, so.email,so.phone, so.facebook, so.linkedin, so.twitter, a.city, a.division, a.zip
            FROM school s
            LEFT JOIN socials so ON s.social_id = so.social_id
            LEFT JOIN addresses a ON s.address_id = a.address_id
            WHERE s.eiin_number = ?
        `;

        // Execute the query
        connection.query(sqlSelectSchool, eiin_number, (error, results) => {
            if (error) {
                console.error('Error querying data from MySQL:', error);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                if (results.length > 0) {
                    // console.log(results)
                    // School found, return its information
                    res.status(200).json(results[0]);
                } else {
                    // School not found with the provided EIIN
                    res.status(404).json({ error: 'School not found' });
                }
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.schoolCreateOrUpdate = async (req, res, next) => {
    try {
        const data = req.body;
        // console.log(data)
        // Validate input data here

        // Create address
        const addressData = {
            city: data.city,
            division: data.division,
            zip: data.zip,
        };
        const address_id = await getAddressId(addressData);

        // Create or update social media record
        const socialData = {
            email: data.email,
            phone: data.phone,
            facebook: data.facebook,
            linkedin: data.linkedin,
            twitter: data.twitter || ""
        };

        const social_id = await updateOrCreateSocialData(data.social_id, socialData);

        // Prepare school information
        const { school_name, eiin_number, established_at, history, logo, street_address } = data;

        const schoolInfo = [eiin_number, school_name, established_at, history, logo, social_id, address_id, street_address];

        // Insert or update school record in the database
        const sqlInsertOrUpdateSchool = `
            INSERT INTO school (eiin_number, school_name, established_at, history, logo, social_id, address_id,street_address)
            VALUES (?, ?, ?, ?, ?, ?, ?,?)
            ON DUPLICATE KEY UPDATE
            school_name = VALUES(school_name),
            established_at = VALUES(established_at),
            history = VALUES(history),
            logo = VALUES(logo),
            social_id = VALUES(social_id),
            address_id = VALUES(address_id),
            street_address=VALUES(street_address)
        `;

        connection.query(sqlInsertOrUpdateSchool, schoolInfo, (error, results) => {
            if (error) {
                console.error('Error inserting or updating data into MySQL:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('Data inserted or updated successfully into MySQL:', results);
                res.status(200).json({ success: true, message: 'Data inserted or updated successfully' });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// notice board section

// Function to view all notices
exports.viewNotice = (req, res, next) => {
    // Query the database to retrieve all notices ordered by updated_at in descending order
    const sql = 'SELECT * FROM notice_board ORDER BY created_at DESC';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Error retrieving notices:", error);
            res.status(500).json({ success: false, message: "Failed to retrieve notices" });
        } else {
            res.status(200).json({ success: true, notices: results });
        }
    });
};

// Function to create a new notice
exports.createNotice = (req, res, next) => {
    console.log(req.body)

    const { title, category, user_id, text_message, link } = req.body;
    // Insert the new notice into the database
    const sql = 'INSERT INTO notice_board (user_id,title, category, text_message, link) VALUES ( ?, ?, ?, ?, ?)';
    connection.query(sql, [user_id, title, category, text_message, link], (error, result) => {
        if (error) {
            console.error("Error creating notice:", error);
            res.status(500).json({ success: false, message: "Failed to create notice" });
        } else {
            res.status(201).json({ success: true, message: "Notice created successfully", noticeId: result.insertId });
        }
    });
};

// Function to update an existing notice
exports.updateNotice = (req, res, next) => {
    const { noticeId } = req.params;
    const { title, category, text_message, link } = req.body;

    console.log(req.body)

    // Update the notice in the database
    const sql = 'UPDATE notice_board SET title=?, category=?, text_message=?, link=? WHERE notice_id=?';
    connection.query(sql, [title, category, text_message, link, noticeId], (error, result) => {
        if (error) {
            console.error("Error updating notice:", error);
            res.status(500).json({ success: false, message: "Failed to update notice" });
        } else {
            res.status(200).json({ success: true, message: "Notice updated successfully" });
        }
    });
};

// Function to delete a notice
exports.deleteNotice = (req, res, next) => {
    const { noticeId } = req.params;

    // Delete the notice from the database
    const sql = 'DELETE FROM notice_board WHERE notice_id=?';
    connection.query(sql, [noticeId], (error, result) => {
        if (error) {
            console.error("Error deleting notice:", error);
            res.status(500).json({ success: false, message: "Failed to delete notice" });
        } else {
            res.status(200).json({ success: true, message: "Notice deleted successfully" });
        }
    });
};


// view staff user_status
exports.viewStaffUserStatus = async (req, res, next) => {
    try {
        // Assuming you have a MySQL connection pool set up
        const sql = `
            SELECT us.user_id, us.status, us.created_at, us.key, 
                   s.email, 
                   p.position_name 
            FROM user_status AS us
            LEFT JOIN users AS u ON us.user_id = u.user_id
            LEFT JOIN socials AS s ON u.social_id = s.social_id
            LEFT JOIN staffs AS st ON u.user_id = st.staff_id
            LEFT JOIN positions AS p ON st.position_id = p.position_id
            ORDER BY us.created_at DESC;`;

        connection.query(sql, (error, results) => {
            if (error) {
                console.error('Error fetching user status:', error);
                res.status(500).json({ error: 'Failed to fetch user status' });
                return;
            }

            // Add the user_type field to each result object
            const resultsWithUserType = results.map(result => ({ ...result, user_type: "staff" }));

            // Send fetched user status data as JSON response with additional field
            res.status(200).json(resultsWithUserType);
        });
    } catch (error) {
        console.error('Error fetching user status:', error);
        res.status(500).json({ error: 'Failed to fetch user status' });
    }
};


// insert staff user status
exports.insertStaffUserStatus = async (req, res, next) => {
    try {
        // Assuming you have a MySQL connection pool set up
        const { type, typeOption, Id, email } = req.body;

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

                    // Insert staff data
                    const staffSql = `
                        INSERT INTO staffs (staff_id, position_id)
                        VALUES (?, ?)`;
                    connection.query(staffSql, [Id, typeOption], (staffError, staffResults) => {
                        if (staffError) {
                            console.error('Error inserting staff data:', staffError);
                            return res.status(500).json({ error: 'Failed to insert staff data' });
                        }

                        res.status(200).json({ message: 'Staff user status inserted successfully' });
                    });
                });
            });
        });
    } catch (error) {
        console.error('Error inserting staff user status:', error);
        res.status(500).json({ error: 'Failed to insert staff user status' });
    }
};











// create user 
// exports.createTeacher = async (req, res, next) => {
//     try {
//         const data = req.body;
//         console.log(data);

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
//         const twitter = data.twitter || "";

//         const social_id = await getSocialId(email, phone, facebook, linkedin, twitter);

//         const teacher_id = data.teacherId;
//         const first_name = data.firstName;
//         const last_name = data.lastName;
//         const joining_date = data.joiningDate;
//         const position = data.position;
//         const salary = data.salary;
//         const date_of_birth = data.dateOfBirth;
//         const profile_pic = data.profilePicture;

//         const teacherInfo = [teacher_id, first_name, last_name, joining_date, position, salary, date_of_birth, profile_pic, social_id, address_id];

//         const sqlInsertTeacher = `
//             INSERT INTO teaches (teacher_id,first_name,last_name,joining_date,position,salary,date_of_birth,profile_pic,social_id,address_id)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `;

//         connection.query(sqlInsertTeacher, teacherInfo, (error, results) => {
//             if (error) {
//                 console.error('Error inserting data into MySQL:', error);
//                 if (error.code === 'ER_DUP_ENTRY') {
//                     res.status(400).send('Duplicate entry error: The provided teacher ID already exists.');
//                 } else {
//                     res.status(500).send('Internal Server Error');
//                 }
//             } else {
//                 console.log('Data inserted successfully into MySQL:', results);
//                 res.status(200).json({ success: true, message: 'Data inserted successfully' });
//             }
//         });


//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

exports.viewTeacher = async (req, res, next) => {
    try {
        const teacherInfoQuery = `
            SELECT t.teacher_id as teacherId,u.first_name as firstName,u.last_name as lastName,u.created_at as joiningDate,p.position_name as position,p.salary as salary,u.date_of_birth as dateOfBirth,u.profile_pic as profilePicture,u.nid_no as nidNum,u.birth_cirtificate_no as birthCirtificate, us.email, s.phone, s.facebook, s.linkedin, a.city, a.division as state, a.zip, a.street_address as streetAddress,s.phone as phoneNumber,sub.sub_name as subjectName
            FROM teaches t
            LEFT JOIN users u on t.teacher_id = u.user_id
            LEFT JOIN user_status us on t.teacher_id = us.user_id
            LEFT JOIN socials s ON t.social_id = s.social_id
            LEFT JOIN addresses a ON t.address_id = a.address_id
            LEFT JOIN positions p ON p.position_id = t.position_id
            LEFT JOIN subject sub ON sub.subject_id=t.subject_id
        `;
        // Execute the query
        connection.query(teacherInfoQuery, (error, results) => {
            if (error) {
                console.error('Error querying data from MySQL:', error);
                res.status(500).json({ error: 'Internal server error' });
            } else {
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
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

function convertTimestampToDate(timestamp) {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
}

exports.updateTeacher = async (req, res, next) => {
    try {
        const data = req.body;
        const {
            teacherId,
            firstName,
            lastName,
            position,
            dateOfBirth,
            nidNum,
            birthCirtificate,
            profilePicture,
            facebook,
            linkedin,
            city,
            state,
            zip,
            streetAddress,
            phoneNumber,
            subjectName
        } = data;

        const userData = {
            first_name: firstName,
            last_name: lastName,
            profile_pic: profilePicture,
            date_of_birth: dateOfBirth,
            birth_cirtificate_no: birthCirtificate,
            nid_no: nidNum
        };

        // Update user information
        await updateUserInfo(teacherId, userData);

        // Get or create position ID
        const positionId = await getPositionId(position);

        // Get or create subject ID
        const subjectId = await getOrCreateSubjectID(subjectName);

        // Prepare social data
        const socialData = {
            phone: phoneNumber,
            facebook: facebook,
            linkedin: linkedin,
        };

        // Get or insert social ID
        const social = await getSocialUpdateId(teacherId, "teacher", socialData);
        const socialId = social.socialId

        // Prepare address data
        const addressData = {
            city: city,
            division: state,
            street_address: streetAddress,
            zip: zip
        };

        // Get or insert address ID
        const addressId = await getAddressId(addressData);

        // Update teacher information in the database
        const sql = `UPDATE teaches 
                    SET 
                    position_id = ?,
                    subject_id = ?,
                    social_id = ?,
                    address_id = ?
                    WHERE teacher_id = ?`;

        connection.query(sql, [positionId, subjectId, socialId, addressId, teacherId], (error, results) => {
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
        await connection.execute('DELETE FROM teaches WHERE teacher_id = ?', [teacher_id]);

        res.status(200).json({ message: `Teacher with ID ${teacher_id} deleted successfully` });

    } catch (error) {
        console.error('Error deleting teacher:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// staff

// exports.createStaff = async (req, res, next) => {
//     try {
//         const data = req.body;
//         console.log(data);

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

//         const staff_id = data.staffId;
//         const first_name = data.firstName;
//         const last_name = data.lastName;
//         const joining_date = data.joiningDate;
//         const position = data.position;
//         const salary = data.salary;
//         const date_of_birth = data.dateOfBirth;
//         const profile_pic = data.profilePicture;

//         const staffInfo = [staff_id, first_name, last_name, joining_date, position, salary, date_of_birth, profile_pic, social_id, address_id];

//         const sqlInsertStaff = `
//             INSERT INTO staffs (staff_id,first_name,last_name,joining_date,position,salary,date_of_birth,profile_pic,social_id,address_id)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `;

//         connection.query(sqlInsertStaff, staffInfo, (error, results) => {
//             if (error) {
//                 console.error('Error inserting data into MySQL:', error);
//                 if (error.code === 'ER_DUP_ENTRY') {
//                     res.status(400).send('Duplicate entry error: The provided staff ID already exists.');
//                 } else {
//                     res.status(500).send('Internal Server Error');
//                 }
//             } else {
//                 console.log('Data inserted successfully into MySQL:', results);
//                 res.status(200).json({ success: true, message: 'Data inserted successfully' });
//             }
//         });


//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// exports.viewStaff = async (req, res, next) => {
//     try {
//         const staffInfoQuery = `
//             SELECT s.staff_id as staffId, s.first_name as firstName, s.last_name as lastName, s.joining_date as joiningDate, s.position, s.salary, s.date_of_birth as dateOfBirth, s.profile_pic as profilePicture, soc.email, soc.phone as phoneNumber, soc.facebook, soc.linkedin, ad.city, ad.division as state, ad.zip, ad.street_address as streetAddress
//             FROM staffs s
//             LEFT JOIN socials soc ON s.social_id = soc.social_id
//             LEFT JOIN addresses ad ON s.address_id = ad.address_id
//         `;
//         // Execute the query
//         connection.query(staffInfoQuery, (error, results) => {
//             if (error) {
//                 console.error('Error querying data from MySQL:', error);
//                 res.status(500).json({ error: 'Internal server error' });
//             } else {
//                 if (results.length > 0) {
//                     // Convert timestamps to date format
//                     results.forEach(staff => {
//                         staff.joiningDate = convertTimestampToDate(staff.joiningDate);
//                         staff.dateOfBirth = convertTimestampToDate(staff.dateOfBirth);
//                     });
//                     // Staff found, return their information
//                     res.status(200).json(results);
//                 } else {
//                     // No staff found
//                     res.status(404).json({ error: 'No staff found' });
//                 }
//             }
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// exports.updateStaff = async (req, res, next) => {
//     try {
//         const data = req.body;
//         const {
//             staffId,
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
//         const address_id = await getAddressId(addressValues);

//         // Create social id
//         const email = data.email;
//         const phone = data.phoneNumber;
//         const facebook = data.facebook;
//         const linkedin = data.linkedin;

//         const social_id = await getSocialId(email, phone, facebook, linkedin);

//         // Update staff information in the database
//         const sql = `UPDATE staffs 
//                     SET 
//                     first_name = ?,
//                     last_name = ?,
//                     joining_date = ?,
//                     position = ?,
//                     salary = ?,
//                     date_of_birth = ?,
//                     profile_pic = ?,
//                     social_id = ?,
//                     address_id = ?
//                     WHERE staff_id = ?`;

//         connection.query(sql, [firstName, lastName, formattedJoiningDate, position, salary, formattedDateOfBirth, profilePicture, social_id, address_id, staffId], (error, results) => {
//             if (error) {
//                 console.error('Error updating staff information:', error);
//                 res.status(500).json({ error: 'Internal server error' });
//             } else {
//                 console.log('Staff information updated successfully:', results);
//                 res.status(200).json({ message: 'Staff information for ' + staffId + ' updated successfully' });
//             }
//         });

//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// exports.deleteStaff = async (req, res, next) => {
//     try {
//         const staff_id = req.params.staffId;

//         await connection.execute('DELETE FROM staffs WHERE staff_id = ?', [staff_id]);

//         res.status(200).json({ message: `Staff with ID ${staff_id} deleted successfully` });

//     } catch (error) {
//         console.error('Error deleting staff:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };


// Academic

exports.createAcademic = async (req, res, next) => {
    try {
        const { classId, className, roomNumber, session, classTeacherId, classCaptainId, syllabus } = req.body;

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
        connection.query(sqlQuery, [classId, className, roomNumber, session, classTeacherIdValue, classCaptainIdValue, syllabus], (error, results) => {
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

// subject
exports.createClassSubject = async (req, res, next) => {
    const { classSubjectID, subjectName, classID, teacherId, syllabus, book } = req.body;

    try {
        // Get or create the subject ID
        const subjectId = await getOrCreateSubjectID(subjectName);

        // Convert string inputs to integers
        const parsedClassSubjectID = parseInt(classSubjectID);
        const parsedClassID = parseInt(classID);
        const parsedTeacherId = teacherId ? parseInt(teacherId) : null; // Convert to integer only if provided

        // Insert a new subject into the database
        const query = `INSERT INTO class_subjects (class_subject_id,subject_id, class_id, teacher_id, syllabus, book) 
                       VALUES (?,?, ?, ?, ?, ?)`;
        connection.query(query, [parsedClassSubjectID, subjectId, parsedClassID, parsedTeacherId, syllabus, book], (error, results, fields) => {
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
                        syllabus: row.syllabus,
                        book: row.book
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
        const { classSubjectId, subjectName, teacherId, syllabus, book } = req.body;

        // Validate the input (if necessary)
        console.log(req.body);

        try {
            // Get or create the subject ID asynchronously
            const subjectId = await getOrCreateSubjectID(subjectName);

            // Assuming you have a MySQL connection pool set up
            connection.query(
                'UPDATE class_subjects SET subject_id = ?, teacher_id = ?, syllabus = ?, book = ? WHERE class_subject_id = ?',
                [subjectId, teacherId, syllabus, book, classSubjectId],
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

//   student

// exports.createStudent = async (req, res, next) => {
//     try {
//         // Extracting data from the request body
//         const { studentId, parentId, firstName, lastName, phoneNumber, fatherName, motherName, guardianName, dateOfBirth, joiningDate, profilePicture, gender, enrollClass } = req.body;

//         // Parsing the strings and constructing Date objects
//         const dateOfBirth1 = new Date(dateOfBirth);
//         const joiningDate1 = new Date(joiningDate);

//         // Formatting the dates to MySQL date format 'YYYY-MM-DD'
//         const formattedDateOfBirth = dateOfBirth1.toISOString().split('T')[0];
//         const formattedJoiningDate = joiningDate1.toISOString().split('T')[0];

//         // Create address id
//         const city = req.body.city;
//         const division = req.body.state;
//         const zip = req.body.zip;
//         const street_address = req.body.streetAddress;
//         const addressValues = [city, division, zip, street_address];
//         const address_id = await getAddressId(addressValues);

//         // Create social id
//         const email = req.body.email;
//         const phone = req.body.phoneNumber;
//         const facebook = req.body.facebook;
//         const linkedin = req.body.linkedin;
//         const social_id = await getSocialId(email, phone, facebook, linkedin);

//         // Execute the query with data
//         const query = `
//             INSERT INTO students (student_id, parent_id, first_name, last_name, gender, father_name, mother_name, guardian_name, date_of_birth, admitted_date, profile_pic, class_id, social_id, address_id)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `;
//         connection.query(query, [studentId, parentId, firstName, lastName, gender, fatherName, motherName, guardianName, formattedDateOfBirth, formattedJoiningDate, profilePicture, enrollClass, social_id, address_id]);

//         // Respond with success message
//         res.status(201).json({ success: true, message: "Student created successfully" });
//     } catch (error) {
//         // Handle errors
//         console.error("Error creating student:", error);
//         res.status(500).json({ success: false, message: "Failed to create student" });
//     }
// };



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



// // principal

// const formatDateForBackend = (dateString) => {
//     const [month, day, year] = dateString.split('/');
//     return `${year}-${month}-${day}`;
// };

// exports.createOrUpdatePrincipal = (req, res, next) => {
//     const data = req.body;
//     const { teacherid, speech, joiningDate, endingDate } = data;

//     // Format the dates for the backend
//     const formattedJoiningDate = formatDateForBackend(joiningDate);
//     const formattedEndingDate = formatDateForBackend(endingDate);

//     // Check if the principal already exists in the database
//     connection.query('SELECT * FROM principals WHERE teacher_id = ?', [teacherid], (err, results) => {
//         if (err) {
//             console.error("Error querying principal:", err);
//             res.status(500).json({ success: false, message: "Failed to query principal" });
//             return;
//         }

//         if (results.length === 0) {
//             // If the principal doesn't exist, insert a new record
//             const insertQuery = `
//                 INSERT INTO principals (teacher_id, principal_speech, joining_date, ending_date)
//                 VALUES (?, ?, ?, ?)
//             `;
//             connection.query(insertQuery, [teacherid, speech, formattedJoiningDate, formattedEndingDate], (err) => {
//                 if (err) {
//                     console.error("Error creating principal:", err);
//                     res.status(500).json({ success: false, message: "Failed to create principal" });
//                 } else {
//                     res.status(200).json({ success: true, message: "Principal created successfully" });
//                 }
//             });
//         } else {
//             // If the principal already exists, update the existing record
//             const updateQuery = `
//                 UPDATE principals
//                 SET principal_speech=?, joining_date=?, ending_date=?
//                 WHERE teacher_id=?
//             `;
//             connection.query(updateQuery, [speech, formattedJoiningDate, formattedEndingDate, teacherid], (err) => {
//                 if (err) {
//                     console.error("Error updating principal:", err);
//                     res.status(500).json({ success: false, message: "Failed to update principal" });
//                 } else {
//                     res.status(200).json({ success: true, message: "Principal updated successfully" });
//                 }
//             });
//         }
//     });
// };


// exports.viewPrincipal = (req, res, next) => {
//     // Query the database to get the principal with the most recent joining date
//     const sql = 'SELECT * FROM principals ORDER BY joining_date DESC LIMIT 1';
//     connection.query(sql, (error, results) => {
//         if (error) {
//             console.error("Error retrieving principal:", error);
//             res.status(500).json({ success: false, message: "Failed to retrieve principal" });
//         } else {
//             if (results.length === 0) {
//                 res.status(404).json({ success: false, message: "Principal not found" });
//             } else {
//                 const principal = results[0];
//                 // Format the joining date (assuming it's in YYYY-MM-DD format)
//                 principal.joining_date = formatDate(principal.joining_date);
//                 principal.ending_date = formatDate(principal.ending_date);
//                 res.status(200).json({ success: true, principal });
//             }
//         }
//     });
// };

// // Function to format date in YYYY-MM-DD to MM/DD/YYYY format
// function formatDate(dateString) {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${month}/${day}/${year}`;
// }














































