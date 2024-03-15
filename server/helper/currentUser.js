const connection = require("../api/sql/db.js");
const { getAddressData } = require("./getAddressData.js");
const {getPositionData} = require("./getPositionData.js");
const {getSocialData} = require("./getSocialData.js");
const { getUserInfo } = require("./getUserInfo.js");

async function currentUserProfile(props) {
    return new Promise((resolve, reject) => {
        const { userId, type } = props;

        console.log(userId,type);

        if (type === "staff") {
            const staffQuery = `SELECT * FROM staffs WHERE staff_id=?`;

            connection.query(staffQuery, [userId], async (error, results) => {
                if (error) {
                    reject({ error: 'Database error while fetching staff data' });
                    return;
                }
                console.log(results)
                if (results.length > 0) {
                    try {
                        
                        const userData = await getUserInfo(results[0].staff_id);
                        const positionData = await getPositionData(results[0].position_id);
                        resolve({ userData, positionData });
                    } catch (err) {
                        reject({ error: 'Error while fetching additional data', details: err });
                    }
                } else {
                    reject({ error: 'No staff data found' });
                }
            });
        } else 
        if (type === "teacher") {
            const teacherQuery = `SELECT * FROM teaches WHERE teacher_id=?`;

            connection.query(teacherQuery, [userId], async (error, results) => {
                if (error) {
                    reject({ error: 'Database error while fetching staff data' });
                    return;
                }
                console.log(results)

                if (results.length > 0) {
                    try {
                        
                        const userData = await getUserInfo(results[0].teacher_id);
                        const positionData = await getPositionData(results[0].position_id);
                        resolve({ userData, positionData });
                    } catch (err) {
                        reject({ error: 'Error while fetching additional data', details: err });
                    }
                } else {
                    reject({ error: 'No Teacher data found' });
                }
            });
        } else {
            reject({ error: 'Invalid user type' });
        }
    });
}


module.exports = currentUserProfile;

