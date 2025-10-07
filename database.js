// --- Mock Server-Side Database ---
// This script simulates a server-side database and its API endpoints.

// --- Admin-Level Mock Data ---
const mockUsers = {
    '9876543210': { password: 'password123', name: 'Arjun Kumar' },
    '9876543211': { password: 'password123', name: 'Priya Sharma' }
};

const mockAdminUsers = {
    'admin': { password: 'password' }
};

// --- Block-Level Mock Data ---
const mockBlockData = {
    'blocka': {
        password: 'password',
        managerName: 'Ravi Shankar',
        staff: [
            { id: 'BLK-A-001', name: 'Sameer Gupta', department: 'Operations', status: 'Active', image: 'https://placehold.co/40x40/93C5FD/4A5568?text=SG' },
            { id: 'BLK-A-002', name: 'Anita Desai', department: 'Sanitation', status: 'Active', image: 'https://placehold.co/40x40/FDBA74/4A5568?text=AD' },
            { id: 'BLK-A-003', name: 'Karan Singh', department: 'Security', status: 'On Leave', image: 'https://placehold.co/40x40/F9A8D4/4A5568?text=KS' },
        ],
        attendance: [
             { name: 'Sameer Gupta', time: '09:01 AM', location: 'Facility 1, Block A', status: 'On Time', image: 'https://placehold.co/40x40/93C5FD/4A5568?text=SG' },
            { name: 'Anita Desai', time: '09:25 AM', location: 'Facility 2, Block A', status: 'Late', image: 'https://placehold.co/40x40/FDBA74/4A5568?text=AD' },
            { name: 'Karan Singh', time: '08:55 AM', location: 'Facility 1, Block A', status: 'On Time', image: 'https://placehold.co/40x40/F9A8D4/4A5568?text=KS' },
        ]
    }
    // Add more blocks here e.g. 'blockb': { ... }
};


// --- Simulated Server Logic (Functions) ---

/**
 * Simulates a delay to mimic a real network request.
 * @param {number} ms - Milliseconds to delay.
 * @returns {Promise}
 */
function networkDelay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Authenticates a mobile app user.
 * @param {string} mobileNumber 
 * @param {string} password 
 * @returns {Promise<object>}
 */
async function authenticateUser(mobileNumber, password) {
    await networkDelay();
    if (mockUsers[mobileNumber] && mockUsers[mobileNumber].password === password) {
        return { success: true, name: mockUsers[mobileNumber].name };
    }
    return { success: false, message: 'Invalid mobile number or password.' };
}

/**
 * Authenticates an admin dashboard user.
 * @param {string} userId 
 * @param {string} password 
 * @returns {Promise<object>}
 */
async function authenticateAdmin(userId, password) {
    await networkDelay();
    if (mockAdminUsers[userId] && mockAdminUsers[userId].password === password) {
        return { success: true };
    }
    return { success: false, message: 'Invalid admin ID or password.' };
}

/**
 * Authenticates a block dashboard user.
 * @param {string} blockName 
 * @param {string} password 
 * @returns {Promise<object>}
 */
async function authenticateBlockManager(blockName, password) {
    await networkDelay();
    const block = mockBlockData[blockName.toLowerCase()];
    if (block && block.password === password) {
        return { success: true, blockName: blockName, managerName: block.managerName };
    }
    return { success: false, message: 'Invalid Block Name or password.' };
}

/**
 * Fetches all data for a specific block.
 * @param {string} blockName
 * @returns {Promise<object>}
 */
async function getBlockData(blockName) {
    await networkDelay();
    const block = mockBlockData[blockName.toLowerCase()];
    if (block) {
        return { success: true, staff: block.staff, attendance: block.attendance };
    }
    return { success: false, message: 'Block not found.' };
}

/**
 * Simulates saving a new staff member to a block's data.
 * @param {string} blockName
 * @param {object} staffData
 * @returns {Promise<object>}
 */
async function registerStaffInBlock(blockName, staffData) {
    await networkDelay();
    const block = mockBlockData[blockName.toLowerCase()];
    if (block) {
        block.staff.push(staffData);
        console.log(`Staff ${staffData.name} added to ${blockName}. New staff list:`, block.staff);
        return { success: true, staff: block.staff };
    }
    return { success: false, message: 'Could not add staff. Block not found.' };
}

/**
 * Simulates removing a staff member from a block's data.
 * @param {string} blockName
 * @param {string} staffId
 * @returns {Promise<object>}
 */
async function removeStaffFromBlock(blockName, staffId) {
     await networkDelay();
    const block = mockBlockData[blockName.toLowerCase()];
    if (block) {
        const initialLength = block.staff.length;
        block.staff = block.staff.filter(s => s.id !== staffId);
        if(block.staff.length < initialLength){
            console.log(`Staff with ID ${staffId} removed from ${blockName}. New staff list:`, block.staff);
            return { success: true, staff: block.staff };
        }
        return { success: false, message: 'Staff ID not found in this block.'};
    }
    return { success: false, message: 'Could not remove staff. Block not found.' };
}


/**
 * Simulates submitting attendance data.
 * @param {object} data - { name, location, imageData }
 * @returns {Promise<object>}
 */
async function submitAttendance(data) {
    await networkDelay(1000); // Longer delay for "processing"
    console.log("Attendance data received by server:", data);
    if (data.imageData) {
        return { success: true, message: `Attendance for ${data.name} marked successfully.` };
    }
    return { success: false, message: 'Failed to submit attendance. Image data missing.' };
}

// In a real application, you would use Express.js or a similar framework
// to expose these functions as API endpoints (e.g., /api/login, /api/attendance).

