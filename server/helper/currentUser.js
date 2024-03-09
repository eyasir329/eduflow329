const connection = require("../api/sql/db.js");
const { getAddressData } = require("./getAddressData.js");
const {getPositionData} = require("./getPositionData.js");
const {getSocialData} = require("./getSocialData.js");
const { getUserInfo } = require("./getUserInfo.js");

async function currentUserProfile(props) {
    return new Promise((resolve, reject) => {
        const { userId, type } = props;

        if (type === "admin" || type === "staffs") {
            const staffQuery = `SELECT * FROM staffs WHERE staff_id=?`;
            const teacherQuery = `SELECT * FROM teaches WHERE teacher_id=?`;
            const query = type === "admin" ? staffQuery : teacherQuery;

            connection.query(query, [userId], async (error, results) => {
                if (error) {
                    reject({ error: 'Database error' }); // More specific error handling
                    return;
                }

                if (results.length > 0) {
                    const userData = await getUserInfo(results[0].staff_id);
                    const positionData = await getPositionData(results[0].position_id);
                    const addressData = await getAddressData(results[0].address_id);
                    const socialData = await getSocialData(results[0].social_id);
                    resolve({ userData, positionData, addressData, socialData });
                } else {
                    reject({ error: 'No data found' }); // More specific error handling
                }
            });
        } else {
            reject({ error: 'Invalid user type' }); // More specific error handling
        }
    });
}

module.exports = currentUserProfile;

