// Programming
// Traffic Flow Analysis Project for College Students

// The government has launched a smart city initiative, inviting college students to develop innovative solutions for managing busy roads. As part of this student project, you are required to create a program that analyzes real-time vehicle movement at traffic signals and suggests improvements to keep traffic moving smoothly.

// Each traffic signal is monitored by sensors that record:

// The number of vehicles currently waiting at the signal.

// The usual number of vehicles based on past data.

// Your task is to develop a traffic signal control system that:

// Compare real-time vehicle count with past records:

// If the difference is more than 10%, the signal needs adjustment.

// Otherwise, no changes are needed.

// How Adjustments Are Made:

// If traffic is higher than usual, → Increase red light duration to slow incoming traffic.

// If traffic is lower than usual, → Increase green light duration to allow vehicles to move faster.

// If everything is already balanced → No changes are required.

// Input Format:

// An integer N → Number of traffic signals.

// N space-separated integers → Current number of vehicles waiting at each signal.

// N space-separated integers → Usual number of vehicles waiting at each signal based on past data.

// Output Format:

// A list of updated signal timings (longer red light, longer green light, or no change).

// A list of adjusted vehicle counts after managing the waiting time.

// If everything is already well-managed, print "Traffic is moving smoothly".

// Sample Test Case:

// Sample Input:

// 3
// 90 65 113
// 60 75 100
// Expected Output:

// Updated Signal Timings: [ 'Red Light Longer', 'Green Light Longer', 'Red Light Longer' ]
// Adjusted Vehicle Counts: [ 85, 69, 107 ]





// const fs = require('fs');
// // Read input from stdin (file descriptor 0)
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

// // Parse the number of traffic signals
// const N = parseInt(input[0].trim());
// // Parse the current number of vehicles at each signal
// const currentTraffic = input[1].split(' ').map(Number);
// // Parse the usual (historical) number of vehicles at each signal
// const historicalTraffic = input[2].split(' ').map(Number);

// /**
//  * Analyzes traffic data and suggests adjustments.
//  * @param {number[]} current - Array of current vehicle counts.
//  * @param {number[]} history - Array of historical vehicle counts.
//  * @param {number} numSignals - The number of signals (N).
//  * @returns {object} An object containing updated timings, adjusted counts, and a flag indicating if any adjustment was needed.
//  */
// function adjustTrafficFlow(current, history, numSignals) {
//     const updatedTimings = [];
//     const adjustedCounts = [];
//     let needsAdjustment = false; // Flag to track if any signal needs changes

//     for (let i = 0; i < numSignals; i++) {
//         const currentCount = current[i];
//         const historicalCount = history[i];

//         // Avoid division by zero if historical data is 0
//         if (historicalCount === 0) {
//              // If current is also 0, no change. If current > 0, treat as significantly higher.
//             if (currentCount > 0) {
//                 updatedTimings.push('Red Light Longer');
//                  // Apply a standard adjustment or handle as a special case
//                 adjustedCounts.push(Math.floor(currentCount * 0.95)); // Example adjustment
//                 needsAdjustment = true;
//             } else {
//                 updatedTimings.push('No change');
//                 adjustedCounts.push(currentCount);
//             }
//             continue; // Move to the next signal
//         }

//         const difference = currentCount - historicalCount;
//         const percentageDifference = (difference / historicalCount) * 100;

//         // Check if the absolute difference is more than 10%
//         if (Math.abs(percentageDifference) > 10) {
//             needsAdjustment = true; // An adjustment is needed
//             if (difference > 0) {
//                 // Traffic is higher than usual
//                 updatedTimings.push('Red Light Longer');
//                 // Simulate adjustment: slightly decrease count (e.g., by 5%)
//                 // Use floor to match sample output behavior for reduction
//                 adjustedCounts.push(Math.floor(currentCount * 0.95));
//             } else {
//                 // Traffic is lower than usual
//                 updatedTimings.push('Green Light Longer');
//                 // Simulate adjustment: slightly increase count (e.g., by 5%)
//                  // Use ceil to match sample output behavior for increase
//                 adjustedCounts.push(Math.ceil(currentCount * 1.05));
//             }
//         } else {
//             // Difference is within 10%, no changes needed
//             updatedTimings.push('No change');
//             adjustedCounts.push(currentCount); // Count remains the same
//         }
//     }

//     return {
//         timings: updatedTimings,
//         counts: adjustedCounts,
//         adjustmentNeeded: needsAdjustment
//     };
// }

// // Call the function to get the results
// const results = adjustTrafficFlow(currentTraffic, historicalTraffic, N);

// // Check if any adjustments were made
// if (!results.adjustmentNeeded) {
//     console.log("Traffic is moving smoothly");
// } else {
//     // Format the output exactly as required
//     // Using template literals and mapping for the timings array to include quotes
//     const timingsOutput = `[ ${results.timings.map(t => `'${t}'`).join(', ')} ]`;
//     // Using template literals and join for the counts array
//     const countsOutput = `[ ${results.counts.join(', ')} ]`;

//     console.log(`Updated Signal Timings: ${timingsOutput}`);
//     console.log(`Adjusted Vehicle Counts: ${countsOutput}`);
// }


// Explanation:

// Input Reading:

// fs.readFileSync(0, 'utf-8') reads the entire input from standard input (file descriptor 0) as a UTF-8 string.

// .trim() removes any leading/trailing whitespace.

// .split('\n') splits the input into an array of lines.

// parseInt(input[0].trim()) gets the first line (N) and converts it to an integer.

// input[1].split(' ').map(Number) splits the second line by spaces and converts each part into a number, creating the currentTraffic array.

// input[2].split(' ').map(Number) does the same for the third line to create the historicalTraffic array.

// adjustTrafficFlow Function:

// Takes the current, history arrays, and the number of signals numSignals as input.

// Initializes updatedTimings and adjustedCounts arrays to store results.

// Initializes needsAdjustment to false. This flag will be set to true if any signal requires adjustment.

// Iterates from i = 0 to numSignals - 1:

// Gets the currentCount and historicalCount for the current signal i.

// Edge Case Handling: Checks if historicalCount is 0 to prevent division by zero errors. Handles this case logically.

// Calculates the difference and percentageDifference.

// Core Logic: Uses Math.abs(percentageDifference) > 10 to check if the change magnitude exceeds the 10% threshold.

// If the threshold is exceeded:

// Sets needsAdjustment = true.

// Checks if difference > 0 (higher traffic) or difference < 0 (lower traffic).

// Pushes the appropriate timing string ('Red Light Longer' or 'Green Light Longer') to updatedTimings.

// Calculates the adjustedCount:

// For higher traffic, it decreases the count slightly (using Math.floor(currentCount * 0.95) which matches the sample output's apparent 5% reduction logic with floor rounding).

// For lower traffic, it increases the count slightly (using Math.ceil(currentCount * 1.05) which matches the sample output's apparent 5% increase logic with ceiling rounding).

// Pushes the adjustedCount to adjustedCounts.

// If the threshold is not exceeded:

// Pushes 'No change' to updatedTimings.

// Pushes the original currentCount to adjustedCounts.

// Returns an object containing the timings, counts, and the adjustmentNeeded flag.

// Output Generation:

// Calls adjustTrafficFlow to get the results.

// Checks the results.adjustmentNeeded flag.

// If false, prints "Traffic is moving smoothly".

// If true:

// Formats the timings array into the required string format [ 'Action1', 'Action2', ... ] using map to add single quotes and join to add commas.

// Formats the counts array into the required string format [ count1, count2, ... ] using join.

// Prints the formatted strings with the required labels.