const { errorHandler } = require("../utils/error.js");
const jwt = require("jsonwebtoken");
const connection = require("../sql/db.js");

// extra function start
function getAddressId(addressValues) {
    // If any address value is undefined, set it to "N/A"
    addressValues = addressValues.map(value => value || "N/A");

    return new Promise((resolve, reject) => {
        const sqlSelectAddress = `SELECT address_id FROM addresses WHERE city = ? AND division = ? AND zip = ? AND street_address = ?`;

        connection.query(sqlSelectAddress, addressValues, (error, results) => {
            if (error) {
                console.error('Error querying data from MySQL:', error);
                reject(error);
            } else {
                if (results.length > 0) {
                    // Address already exists, retrieve the ID
                    const addressId = results[0].address_id;
                    console.log('Address already exists in MySQL with ID:', addressId);
                    resolve(addressId);
                } else {
                    // Address does not exist, insert a new record
                    const sqlCreateSchool = `INSERT INTO addresses (city, division, zip, street_address) VALUES (?, ?, ?, ?)`;

                    connection.query(sqlCreateSchool, addressValues, (error, results) => {
                        if (error) {
                            console.error('Error inserting data into MySQL:', error);
                            reject(error);
                        } else {
                            const addressId = results.insertId;
                            console.log('New address inserted into MySQL with ID:', addressId);
                            resolve(addressId);
                        }
                    });
                }
            }
        });
    });
}


function getSocialId(email, phone, facebook, linkedin, twitter) {
    // If any social value is undefined, set it to "N/A"
    const socialValues = [email || "N/A", phone || "N/A", facebook || "N/A", linkedin || "N/A", twitter || "N/A"];

    return new Promise((resolve, reject) => {
        const sqlSelectSocial = `SELECT social_id FROM socials WHERE email = ? AND phone = ? AND facebook = ? AND linkedin = ? AND twitter = ?`;

        connection.query(sqlSelectSocial, socialValues, (error, results) => {
            if (error) {
                console.error('Error querying data from MySQL:', error);
                reject(error);
            } else {
                if (results.length > 0) {
                    // Social info already exists, retrieve the ID
                    const socialId = results[0].social_id;
                    console.log('Social info already exists in MySQL with ID:', socialId);
                    resolve(socialId);
                } else {
                    // Social info does not exist, insert a new record
                    const sqlCreateSocial = `INSERT INTO socials (email, phone, facebook, linkedin, twitter) VALUES (?, ?, ?, ?, ?)`;

                    connection.query(sqlCreateSocial, socialValues, (error, results) => {
                        if (error) {
                            console.error('Error inserting data into MySQL:', error);
                            reject(error);
                        } else {
                            const socialId = results.insertId;
                            console.log('New social info inserted into MySQL with ID:', socialId);
                            resolve(socialId);
                        }
                    });
                }
            }
        });
    });
}

// extra function end

exports.schoolView = async (req, res, next) => {
    const eiin_number = 109873;

    try {
        const sqlSelectSchool = `
            SELECT s.*, so.email, so.phone, so.facebook, so.linkedin, so.twitter, a.city, a.division, a.zip, a.street_address
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
        console.log(data);

        // Create address id
        const city = data.city;
        const division = data.division;
        const zip = data.zip;
        const street_address = data.street_address;

        const addressValues = [city, division, zip, street_address];
        const address_id = await getAddressId(addressValues);

        // Create social id
        const email = data.email;
        const phone = data.phone;
        const facebook = data.facebook;
        const linkedin = data.linkedin;
        const twitter = data.twitter || "";

        const social_id = await getSocialId(email, phone, facebook, linkedin, twitter);

        // Create school
        const school_name = data.school_name;
        const eiin_number = data.eiin_number;
        const established_at = data.established_at;
        const history = data.history;
        const logo = data.logo;

        const schoolInfo = [school_name, eiin_number, established_at, history, logo, social_id, address_id];

        const sqlInsertOrUpdateSchool = `
            INSERT INTO school (school_name, eiin_number, established_at, history, logo, social_id, address_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            school_name = VALUES(school_name),
            established_at = VALUES(established_at),
            history = VALUES(history),
            logo = VALUES(logo),
            social_id = VALUES(social_id),
            address_id = VALUES(address_id)
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
}

exports.lastTeacherId = async (req, res, next) => {
    try {
        const sql = "SELECT teacher_id FROM teaches ORDER BY teacher_id DESC LIMIT 1";
        const [rows, fields] = await connection.promise().query(sql);
        if (rows.length > 0) {
            res.status(200).json({ teacherId: rows[0].teacher_id });
        } else {
            res.status(404).json({ error: "No teacher ID found" });
        }
    } catch (error) {
        console.error("Error retrieving last teacher ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.createTeacher = async (req, res, next) => {
    try {
        const data = req.body;
        console.log(data);

        // Create address id
        const city = data.city;
        const division = data.state;
        const zip = data.zip;
        const street_address = data.streetAddress;

        const addressValues = [city, division, zip, street_address];
        const address_id = await getAddressId(addressValues);

        // Create social id
        const email = data.email;
        const phone = data.phoneNumber;
        const facebook = data.facebook;
        const linkedin = data.linkedin;
        const twitter = data.twitter || "";

        const social_id = await getSocialId(email, phone, facebook, linkedin, twitter);

        const teacher_id = data.teacherId;
        const first_name = data.firstName;
        const last_name = data.lastName;
        const joining_date = data.joiningDate;
        const position = data.position;
        const salary = data.salary;
        const date_of_birth = data.dateOfBirth;
        const profile_pic = data.profilePicture;

        const teacherInfo = [teacher_id, first_name, last_name, joining_date, position, salary, date_of_birth, profile_pic, social_id, address_id];

        const sqlInsertTeacher = `
            INSERT INTO teaches (teacher_id,first_name,last_name,joining_date,position,salary,date_of_birth,profile_pic,social_id,address_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(sqlInsertTeacher, teacherInfo, (error, results) => {
            if (error) {
                console.error('Error inserting data into MySQL:', error);
                if (error.code === 'ER_DUP_ENTRY') {
                    res.status(400).send('Duplicate entry error: The provided teacher ID already exists.');
                } else {
                    res.status(500).send('Internal Server Error');
                }
            } else {
                console.log('Data inserted successfully into MySQL:', results);
                res.status(200).json({ success: true, message: 'Data inserted successfully' });
            }
        });


    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.viewTeacher = async (req, res, next) => {
    try {
        const teacherInfoQuery = `
            SELECT t.teacher_id as teacherId,t.first_name as firstName,t.last_name as lastName,t.joining_date as joiningDate,t.position as position,t.salary as salary,t.date_of_birth as dateOfBirth,t.profile_pic as profilePicture, s.email, s.phone, s.facebook, s.linkedin, s.twitter, a.city, a.division as state, a.zip, a.street_address as streetAddress,s.phone as phoneNumber
            FROM teaches t
            LEFT JOIN socials s ON t.social_id = s.social_id
            LEFT JOIN addresses a ON t.address_id = a.address_id
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
            joiningDate,
            position,
            salary,
            dateOfBirth,
            profilePicture,
        } = data;

        // Convert joiningDate and dateOfBirth to date format
        const formattedJoiningDate = convertTimestampToDate(joiningDate);
        const formattedDateOfBirth = convertTimestampToDate(dateOfBirth);

        // Create address id
        const city = data.city;
        const division = data.state;
        const zip = data.zip;
        const street_address = data.streetAddress;
        const addressValues = [city, division, zip, street_address];
        const address_id = await getAddressId(addressValues);

        // Create social id
        const email = data.email;
        const phone = data.phoneNumber;
        const facebook = data.facebook;
        const linkedin = data.linkedin;
        const twitter = data.twitter || "";

        const social_id = await getSocialId(email, phone, facebook, linkedin, twitter);

        // Update teacher information in the database
        const sql = `UPDATE teaches 
                    SET 
                    first_name = ?,
                    last_name = ?,
                    joining_date = ?,
                    position = ?,
                    salary = ?,
                    date_of_birth = ?,
                    profile_pic = ?,
                    social_id = ?,
                    address_id = ?
                    WHERE teacher_id = ?`;

        connection.query(sql, [firstName, lastName, formattedJoiningDate, position, salary, formattedDateOfBirth, profilePicture, social_id, address_id, teacherId], (error, results) => {
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

        await connection.execute('DELETE FROM teaches WHERE teacher_id = ?', [teacher_id]);

        res.status(200).json({ message: `Teacher with ID ${teacher_id} deleted successfully` });

    } catch (error) {
        console.error('Error deleting teacher:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// staff
exports.lastStaffId = async (req, res, next) => {
    try {
        const sql = "SELECT staff_id FROM staffs ORDER BY staff_id DESC LIMIT 1";
        const [rows, fields] = await connection.promise().query(sql);
        if (rows.length > 0) {
            res.status(200).json({ staffId: rows[0].staff_id });
        } else {
            res.status(404).json({ error: "No staff ID found" });
        }
    } catch (error) {
        console.error("Error retrieving last staff ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.createStaff = async (req, res, next) => {
    try {
        const data = req.body;
        console.log(data);

        // Create address id
        const city = data.city;
        const division = data.state;
        const zip = data.zip;
        const street_address = data.streetAddress;

        const addressValues = [city, division, zip, street_address];
        const address_id = await getAddressId(addressValues);

        // Create social id
        const email = data.email;
        const phone = data.phoneNumber;
        const facebook = data.facebook;
        const linkedin = data.linkedin;

        const social_id = await getSocialId(email, phone, facebook, linkedin);

        const staff_id = data.staffId;
        const first_name = data.firstName;
        const last_name = data.lastName;
        const joining_date = data.joiningDate;
        const position = data.position;
        const salary = data.salary;
        const date_of_birth = data.dateOfBirth;
        const profile_pic = data.profilePicture;

        const staffInfo = [staff_id, first_name, last_name, joining_date, position, salary, date_of_birth, profile_pic, social_id, address_id];

        const sqlInsertStaff = `
            INSERT INTO staffs (staff_id,first_name,last_name,joining_date,position,salary,date_of_birth,profile_pic,social_id,address_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(sqlInsertStaff, staffInfo, (error, results) => {
            if (error) {
                console.error('Error inserting data into MySQL:', error);
                if (error.code === 'ER_DUP_ENTRY') {
                    res.status(400).send('Duplicate entry error: The provided staff ID already exists.');
                } else {
                    res.status(500).send('Internal Server Error');
                }
            } else {
                console.log('Data inserted successfully into MySQL:', results);
                res.status(200).json({ success: true, message: 'Data inserted successfully' });
            }
        });


    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.viewStaff = async (req, res, next) => {
    try {
        const staffInfoQuery = `
            SELECT s.staff_id as staffId, s.first_name as firstName, s.last_name as lastName, s.joining_date as joiningDate, s.position, s.salary, s.date_of_birth as dateOfBirth, s.profile_pic as profilePicture, soc.email, soc.phone as phoneNumber, soc.facebook, soc.linkedin, ad.city, ad.division as state, ad.zip, ad.street_address as streetAddress
            FROM staffs s
            LEFT JOIN socials soc ON s.social_id = soc.social_id
            LEFT JOIN addresses ad ON s.address_id = ad.address_id
        `;
        // Execute the query
        connection.query(staffInfoQuery, (error, results) => {
            if (error) {
                console.error('Error querying data from MySQL:', error);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                if (results.length > 0) {
                    // Convert timestamps to date format
                    results.forEach(staff => {
                        staff.joiningDate = convertTimestampToDate(staff.joiningDate);
                        staff.dateOfBirth = convertTimestampToDate(staff.dateOfBirth);
                    });
                    // Staff found, return their information
                    res.status(200).json(results);
                } else {
                    // No staff found
                    res.status(404).json({ error: 'No staff found' });
                }
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateStaff = async (req, res, next) => {
    try {
        const data = req.body;
        const {
            staffId,
            firstName,
            lastName,
            joiningDate,
            position,
            salary,
            dateOfBirth,
            profilePicture,
        } = data;

        // Convert joiningDate and dateOfBirth to date format
        const formattedJoiningDate = convertTimestampToDate(joiningDate);
        const formattedDateOfBirth = convertTimestampToDate(dateOfBirth);

        // Create address id
        const city = data.city;
        const division = data.state;
        const zip = data.zip;
        const street_address = data.streetAddress;
        const addressValues = [city, division, zip, street_address];
        const address_id = await getAddressId(addressValues);

        // Create social id
        const email = data.email;
        const phone = data.phoneNumber;
        const facebook = data.facebook;
        const linkedin = data.linkedin;

        const social_id = await getSocialId(email, phone, facebook, linkedin);

        // Update staff information in the database
        const sql = `UPDATE staffs 
                    SET 
                    first_name = ?,
                    last_name = ?,
                    joining_date = ?,
                    position = ?,
                    salary = ?,
                    date_of_birth = ?,
                    profile_pic = ?,
                    social_id = ?,
                    address_id = ?
                    WHERE staff_id = ?`;

        connection.query(sql, [firstName, lastName, formattedJoiningDate, position, salary, formattedDateOfBirth, profilePicture, social_id, address_id, staffId], (error, results) => {
            if (error) {
                console.error('Error updating staff information:', error);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                console.log('Staff information updated successfully:', results);
                res.status(200).json({ message: 'Staff information for ' + staffId + ' updated successfully' });
            }
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteStaff = async (req, res, next) => {
    try {
        const staff_id = req.params.staffId;

        await connection.execute('DELETE FROM staffs WHERE staff_id = ?', [staff_id]);

        res.status(200).json({ message: `Staff with ID ${staff_id} deleted successfully` });

    } catch (error) {
        console.error('Error deleting staff:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Academic

exports.createAcademic = async (req, res, next) => {
    try {
        const { classId, className, roomNumber, session, classTeacherId, classCaptainId } = req.body;

        // Convert empty strings to null for integer fields
        const classTeacherIdValue = classTeacherId === '' ? null : classTeacherId;
        const classCaptainIdValue = classCaptainId === '' ? null : classCaptainId;

        // SQL query for insert or update
        const sqlQuery = `
            INSERT INTO academics (class_id, class_name, room_number, session, class_teacher_id, class_captain_id)
            VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            class_name = VALUES(class_name),
            room_number = VALUES(room_number),
            session = VALUES(session),
            class_teacher_id = VALUES(class_teacher_id),
            class_captain_id = VALUES(class_captain_id)
        `;

        // Execute the SQL query
        connection.query(sqlQuery, [classId, className, roomNumber, session, classTeacherIdValue, classCaptainIdValue], (error, results) => {
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
                roomNumber: row.room_number
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
        const { classId, className, session, classTeacherId, classCaptainId, roomNumber } = req.body;

        console.log(req.body);

        // Perform a query to update academic data in the database
        connection.query(
            'UPDATE academics SET class_name = ?, session = ?, class_teacher_id = ?, class_captain_id = ?, room_number = ? WHERE class_id = ?',
            [className, session, classTeacherId, classCaptainId, roomNumber, classId],
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
exports.createSubject = async (req, res, next) => {
    try {
        // Extract data from request body
        const { subjectID, subjectName, classID, teacherId } = req.body;

        // Convert string inputs to integers
        const parsedSubjectID = parseInt(subjectID);
        const parsedClassID = parseInt(classID);
        const parsedTeacherId = teacherId ? parseInt(teacherId) : null; // Convert to integer only if provided

        // Insert a new subject into the database
        const query = `INSERT INTO subjects (subject_id, sub_name, class_id, teacher_id) 
                       VALUES (?, ?, ?, ?)`;
        connection.query(query, [parsedSubjectID, subjectName, parsedClassID, parsedTeacherId], (error, results, fields) => {
            if (error) {
                console.error('Error creating subject:', error);
                res.status(500).json({ message: 'Failed to create subject' });
                return;
            }
            console.log('Subject created successfully');
            res.status(201).json({ message: 'Subject created successfully' });
        });
    } catch (error) {
        // Handle any errors
        console.error('Error creating subject:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.viewSubject = async (req, res, next) => {
    try {
        // Assuming you have a MySQL connection pool set up
        connection.query('SELECT * FROM subjects', (error, results) => {
            if (error) {
                console.error('Error fetching subject data:', error);
                res.status(500).json({ error: 'Failed to fetch subject data' });
                return;
            }

            // Convert keys and send the converted data as JSON response
            const convertedResults = results.map(row => ({
                subjectId: row.subject_id,
                subjectName: row.sub_name,
                teacherId: row.teacher_id,
                classId: row.class_id
            }));

            res.status(200).json(convertedResults); // Send fetched subject data with converted keys as JSON response
        });
    } catch (error) {
        console.error('Error fetching subject data:', error);
        res.status(500).json({ error: 'Failed to fetch subject data' });
    }
};

exports.updateSubject = async (req, res, next) => {
    try {
        // Extract updated subject data from the request body
        const { subjectId, subjectName, teacherId, classId } = req.body;

        // Validate the input (if necessary)
        console.log(req.body)
        // Assuming you have a MySQL connection pool set up
        connection.query(
            'UPDATE subjects SET sub_name = ?, teacher_id = ?, class_id = ? WHERE subject_id = ?',
            [subjectName, teacherId, classId, subjectId],
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
    } catch (error) {
        console.error('Error updating subject:', error);
        res.status(500).json({ error: 'Failed to update subject' });
    }
};

exports.deleteSubject = async (req, res, next) => {
    try {
        const { subjectId } = req.params; // Extract subject ID from request parameters

        // Ensure connection is established before executing queries
        if (!connection) {
            throw new Error('Database connection is not established');
        }

        // Execute the DELETE query
        connection.query('DELETE FROM subjects WHERE subject_id = ?', [subjectId], (error, results) => {
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

exports.createStudent = async (req, res, next) => {
    try {
        // Extracting data from the request body
        const { studentId, parentId, firstName, lastName, phoneNumber, fatherName, motherName, guardianName, dateOfBirth, joiningDate, profilePicture, gender, enrollClass } = req.body;

        // Parsing the strings and constructing Date objects
        const dateOfBirth1 = new Date(dateOfBirth);
        const joiningDate1 = new Date(joiningDate);

        // Formatting the dates to MySQL date format 'YYYY-MM-DD'
        const formattedDateOfBirth = dateOfBirth1.toISOString().split('T')[0];
        const formattedJoiningDate = joiningDate1.toISOString().split('T')[0];

        // Create address id
        const city = req.body.city;
        const division = req.body.state;
        const zip = req.body.zip;
        const street_address = req.body.streetAddress;
        const addressValues = [city, division, zip, street_address];
        const address_id = await getAddressId(addressValues);

        // Create social id
        const email = req.body.email;
        const phone = req.body.phoneNumber;
        const facebook = req.body.facebook;
        const linkedin = req.body.linkedin;
        const social_id = await getSocialId(email, phone, facebook, linkedin);

        // Execute the query with data
        const query = `
            INSERT INTO students (student_id, parent_id, first_name, last_name, gender, father_name, mother_name, guardian_name, date_of_birth, admitted_date, profile_pic, class_id, social_id, address_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        connection.query(query, [studentId, parentId, firstName, lastName, gender, fatherName, motherName, guardianName, formattedDateOfBirth, formattedJoiningDate, profilePicture, enrollClass, social_id, address_id]);

        // Respond with success message
        res.status(201).json({ success: true, message: "Student created successfully" });
    } catch (error) {
        // Handle errors
        console.error("Error creating student:", error);
        res.status(500).json({ success: false, message: "Failed to create student" });
    }
};

exports.lastStudentId = async (req, res, next) => {
    try {
        const sql = "SELECT student_id FROM students ORDER BY student_id DESC LIMIT 1";
        const [rows, fields] = await connection.promise().query(sql);
        if (rows.length > 0) {
            res.status(200).json({ lastStudentId: rows[0].student_id });
        } else {
            res.status(404).json({ error: "No lastStudent ID found" });
        }
    } catch (error) {
        console.error("Error retrieving last staff ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Route handler to update a student
exports.updateStudent = async (req, res, next) => {
    try {
        const data = req.body;
        console.log(data)
        const {
            studentId,
            parentId,
            firstName,
            lastName,
            phoneNumber,
            fatherName,
            motherName,
            guardianName,
            dateOfBirth,
            admittedDate,
            profilePicture,
            gender,
            classId
        } = data;

        // Create address id
        const city = data.city;
        const division = data.state;
        const zip = data.zip;
        const street_address = data.streetAddress;
        const addressValues = [city, division, zip, street_address];
        const address_id = await getAddressId(addressValues);

        // Create social id
        const email = data.email;
        const phone = data.phoneNumber;
        const facebook = data.facebook;
        const linkedin = data.linkedin;
        const social_id = await getSocialId(email, phone, facebook, linkedin);

        // Update the student in the database
        const sql = `
            UPDATE students
            SET first_name=?, last_name=?, father_name=?, mother_name=?, guardian_name=?, date_of_birth=?, admitted_date=?, profile_pic=?, gender=?, class_id=?, social_id=?, address_id=?
            WHERE student_id=?
        `;
        connection.query(sql, [firstName, lastName, fatherName, motherName, guardianName, dateOfBirth, admittedDate, profilePicture, gender, classId, social_id, address_id, studentId]);
        console.log("Student updated successfully");
        // Send success response
        res.status(200).json({ success: true, message: "Student updated successfully" });
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ success: false, message: "Failed to update student" });
    }
};


// Route handler to delete a student
exports.deleteStudent = async (req, res, next) => {
    try {
        const studentId = req.params.studentId;

        // Delete the student from the database
        const query = `
        DELETE FROM students
        WHERE student_id=?
      `;
        connection.query(query, [studentId]);

        // Send success response
        res.status(200).json({ success: true, message: "Student deleted successfully" });
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({ success: false, message: "Failed to delete student" });
    }
};

exports.viewStudent = async (req, res, next) => {
    try {
        const studentInfoQuery = `
  SELECT
    s.student_id as studentId,
    s.parent_id as parentId,
    s.first_name as firstName,
    s.last_name as lastName,
    s.gender,
    s.father_name as fatherName,
    s.mother_name as motherName,
    s.guardian_name as guardianName,
    s.date_of_birth as dateOfBirth,
    s.admitted_date as admittedDate,
    s.profile_pic as profilePicture,
    sc.email,
    sc.phone as phoneNumber,
    sc.facebook,
    sc.linkedin,
    sc.twitter,
    a.city,
    a.division as state,
    a.zip,
    a.street_address as streetAddress,
    aa.class_id as classId
  FROM
    students s
  LEFT JOIN
    socials sc ON s.social_id = sc.social_id
  LEFT JOIN
    addresses a ON s.address_id = a.address_id
    LEFT JOIN
    academics aa ON s.class_id = aa.class_id
`;

        // Execute the query
        connection.query(studentInfoQuery, (error, results) => {
            if (error) {
                console.error('Error querying data from MySQL:', error);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                if (results.length > 0) {
                    // Convert timestamps to date format
                    results.forEach(student => {
                        student.dateOfBirth = convertTimestampToDate(student.dateOfBirth);
                        student.admittedDate = convertTimestampToDate(student.admittedDate);
                    });
                    // Students found, return their information
                    res.status(200).json(results);
                } else {
                    // No students found
                    res.status(404).json({ error: 'No students found' });
                }
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// principal






































