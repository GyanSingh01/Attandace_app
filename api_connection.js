// --- Client-Side API Connection ---
// This script simulates the mobile app's connection to the backend.
// It calls functions from the `database.js` file.

/**
 * Attempts to log in a user via the API.
 * @param {string} mobileNumber 
 * @param {string} password 
 * @returns {Promise<object>} - A promise that resolves with the server's response.
 */
async function loginUser(mobileNumber, password) {
    console.log(`Attempting to log in user ${mobileNumber}...`);
    // In a real app, this would be a fetch() call to your server endpoint.
    // e.g., const response = await fetch('/api/login', { method: 'POST', ... });
    const response = await authenticateUser(mobileNumber, password);
    console.log("Server response:", response);
    return response;
}

/**
 * Attempts to log in an admin via the API.
 * @param {string} userId
 * @param {string} password
 * @returns {Promise<object>}
 */
async function loginAdmin(userId, password) {
    console.log(`Attempting to log in admin ${userId}...`);
    
    // This is the new way, using a real network request
    const apiResponse = await fetch('/wp-json/fieldforce/v1/login/admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: userId, password: password })
    });

    const data = await apiResponse.json();
    console.log("Server response:", data);
    return data;
}

/**
 * Attempts to log in a block manager via the API.
 * @param {string} blockName
 * @param {string} password
 * @returns {Promise<object>}
 */
async function loginBlockManager(blockName, password) {
    console.log(`Attempting to log in manager for ${blockName}...`);
    const response = await authenticateBlockManager(blockName, password);
    console.log("Server response:", response);
    return response;
}

/**
 * Submits the captured attendance data to the server.
 * @param {object} attendanceData - { name, location, imageData }
 * @returns {Promise<object>} - A promise that resolves with the server's response.
 */
async function sendAttendanceData(attendanceData) {
    console.log("Sending attendance data to server...");
    const response = await submitAttendance(attendanceData);
    console.log("Server response:", response);
    return response;
}

/**
 * Fetches all relevant data for a specific block.
 * @param {string} blockName 
 * @returns {Promise<object>}
 */
 
async function fetchBlockData(blockName) {
    console.log(`Fetching data for ${blockName}...`);
    const response = await getBlockData(blockName);
    console.log("Server response for block data:", response);
    return response;
}

/**
 * Sends new staff registration data to the server for a specific block.
 * @param {string} blockName
 * @param {object} staffData
 * @returns {Promise<object>}
 */
async function registerStaff(blockName, staffData) {
    console.log(`Registering new staff in ${blockName}...`);
    const response = await registerStaffInBlock(blockName, staffData);
    console.log("Server response for staff registration:", response);
    return response;
}

/**
 * Sends a request to remove a staff member from a block.
 * @param {string} blockName
 * @param {string} staffId
 * @returns {Promise<object>}
 */
async function removeStaff(blockName, staffId) {
    console.log(`Requesting removal of staff ID ${staffId} from ${blockName}...`);
    const response = await removeStaffFromBlock(blockName, staffId);
    console.log("Server response for staff removal:", response);
    return response;
}

