const currentUserProfile = require("../../helper/currentUser.js");
const { getAddressId } = require("../../helper/getAddressData.js");
const { getPositionId } = require("../../helper/getPositionData.js");
const { getSocialUpdateId, updateOrCreateSocialData, selectSocialIdFromUsers, updateSocialData } = require("../../helper/getSocialData.js");
const { getOrCreateSubjectID, getSubjectNameById } = require("../../helper/getSubjectId.js");
const { updateUserInfo, selectKeyFromUserStatus, updateUserStatusCreationDate } = require("../../helper/getUserInfo.js");
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
            SELECT us.user_id, us.status,us.user_type, us.created_at, us.key, 
                   s.email, 
                   p.position_name 
            FROM user_status AS us
            JOIN users AS u ON us.user_id = u.user_id
            LEFT JOIN socials AS s ON u.social_id = s.social_id
            JOIN staffs AS st ON u.user_id = st.staff_id
            LEFT JOIN positions AS p ON st.position_id = p.position_id
            ORDER BY us.created_at DESC;`;

        connection.query(sql, (error, results) => {
            if (error) {
                console.error('Error fetching user status:', error);
                res.status(500).json({ error: 'Failed to fetch user status' });
                return;
            }

            // Add the user_type field to each result object
            // const resultsWithUserType = results.map(result => ({ ...result, user_type: "staff" }));

            // Send fetched user status data as JSON response with additional field
            res.status(200).json(results);
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

// staff
exports.createStaff = async (req, res, next) => {
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

            res.status(200).json({ message: 'Staff created successfully' });
        } else {
            res.status(401).json({ error: 'Invalid key' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// view staff
exports.viewStaff = async (req, res, next) => {
    const staffInfoQuery = `
        SELECT s.staff_id as staffId, 
        u.first_name as firstName, u.last_name as lastName,  u.date_of_birth as dateOfBirth, u.profile_pic as profilePicture,u.street_address as streetAddress
        ,us.created_at as joiningDate, 
        p.position_name as position, p.salary,
        soc.email, soc.phone as phoneNumber, soc.facebook, soc.linkedin, 
        ad.city, ad.division as state, ad.zip 
        FROM staffs s
        left JOIN users as u on u.user_id=s.staff_id
        left JOIN user_status as us on u.user_id = us.user_id
        LEFT JOIN positions p ON s.position_id = p.position_id 
        LEFT JOIN socials soc ON u.social_id = soc.social_id
        LEFT JOIN addresses ad ON u.address_id = ad.address_id
    `;
    // Execute the query
    connection.query(staffInfoQuery, (error, results) => {
        if (error) {
            console.error('Error querying data from MySQL:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length > 0) {
            // Convert timestamps to date format
            results.forEach(staff => {
                staff.joiningDate = convertTimestampToDate(staff.joiningDate);
                staff.dateOfBirth = convertTimestampToDate(staff.dateOfBirth);
            });
            // Staff found, return their information
            return res.status(200).json(results);
        } else {
            // No staff found
            return res.status(404).json({ error: 'No staff found' });
        }
    });
};

// update staff
exports.updateStaff = async (req, res, next) => {
    try {
        const data = req.body;
        const {
            staffId,
            firstName,
            lastName,
            dateOfBirth,
            streetAddress,
            profilePicture,
            facebook,
            linkedin,
            phoneNumber,
            city,
            state,
            zip,
            joiningDate,
        } = data;

        // Convert joiningDate and dateOfBirth to date format
        const formattedJoiningDate = convertTimestampToDate(joiningDate);
        const formattedDateOfBirth = convertTimestampToDate(dateOfBirth);

        // Create address
        const addressData = {
            city: city,
            division: state,
            zip: zip,
        };
        const address_id = await getAddressId(addressData);

        // Create or update social media record
        const socialData = {
            phone: phoneNumber,
            facebook: facebook,
            linkedin: linkedin,
            twitter: data.twitter || "", // Ensure 'twitter' is handled correctly
        };

        const socialIdResult = await selectSocialIdFromUsers(staffId);
        await updateSocialData(socialIdResult.social_id, socialData);

        // Update the user's information
        const userData = {
            first_name: firstName,
            last_name: lastName,
            profile_pic: profilePicture,
            date_of_birth: formattedDateOfBirth,
            street_address: streetAddress,
            address_id: address_id
        };

        await updateUserInfo(staffId, userData);

        // Update the user status with the new creation date
        await updateUserStatusCreationDate(staffId, formattedJoiningDate);

        res.status(200).json({ message: 'Staff information updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.deleteStaff = async (req, res, next) => {
    try {
        const user_id = req.params.staffId;

        const socialIdResult = await selectSocialIdFromUsers(user_id);

        await connection.execute('DELETE FROM socials WHERE social_id = ?', [socialIdResult.social_id]);

        await connection.execute('DELETE FROM user_status WHERE user_id = ?', [user_id]);

        res.status(200).json({ message: `Staff with ID ${user_id} deleted successfully` });

    } catch (error) {
        console.error('Error deleting staff:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


function convertTimestampToDate(timestamp) {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
}



// principal
const formatDateForBackend = (dateString) => {
    const [month, day, year] = dateString.split('/');
    const formattedYear = year.padStart(4, '0'); // Ensure year is four digits
    const formattedMonth = month.padStart(2, '0'); // Ensure month is two digits
    const formattedDay = day.padStart(2, '0'); // Ensure day is two digits
    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
};

exports.createOrUpdatePrincipal = (req, res, next) => {
    const data = req.body;
    const { teacherid, speech, joiningDate, endingDate } = data;

    // Format the dates for the backend
    const formattedJoiningDate = formatDateForBackend(joiningDate);
    const formattedEndingDate = formatDateForBackend(endingDate);

    console.log(formattedEndingDate,formattedJoiningDate)

    // Check if the principal already exists in the database
    connection.query('SELECT * FROM principals WHERE teacher_id = ?', [teacherid], (err, results) => {
        if (err) {
            console.error("Error querying principal:", err);
            res.status(500).json({ success: false, message: "Failed to query principal" });
            return;
        }

        if (results.length === 0) {
            // If the principal doesn't exist, insert a new record
            const insertQuery = `
                INSERT INTO principals (teacher_id, principal_speech, joining_date, ending_date)
                VALUES (?, ?, ?, ?)
            `;
            connection.query(insertQuery, [teacherid, speech, formattedJoiningDate, formattedEndingDate], (err) => {
                if (err) {
                    console.error("Error creating principal:", err);
                    res.status(500).json({ success: false, message: "Failed to create principal" });
                } else {
                    res.status(200).json({ success: true, message: "Principal created successfully" });
                }
            });
        } else {
            // If the principal already exists, update the existing record
            const updateQuery = `
                UPDATE principals
                SET principal_speech=?, joining_date=?, ending_date=?
                WHERE teacher_id=?
            `;
            connection.query(updateQuery, [speech, formattedJoiningDate, formattedEndingDate, teacherid], (err) => {
                if (err) {
                    console.error("Error updating principal:", err);
                    res.status(500).json({ success: false, message: "Failed to update principal" });
                } else {
                    res.status(200).json({ success: true, message: "Principal updated successfully" });
                }
            });
        }
    });
};

exports.viewPrincipal = (req, res, next) => {
    // Query the database to get the principal with the most recent joining date
    const sql = 'SELECT * FROM principals ORDER BY joining_date DESC LIMIT 1';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Error retrieving principal:", error);
            res.status(500).json({ success: false, message: "Failed to retrieve principal" });
        } else {
            if (results.length === 0) {
                res.status(404).json({ success: false, message: "Principal not found" });
            } else {
                const principal = results[0];
                // Format the joining date (assuming it's in YYYY-MM-DD format)
                principal.joining_date = formatDate(principal.joining_date);
                principal.ending_date = formatDate(principal.ending_date);
                res.status(200).json({ success: true, principal });
            }
        }
    });
};

// Function to format date in YYYY-MM-DD to MM/DD/YYYY format
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
}














































