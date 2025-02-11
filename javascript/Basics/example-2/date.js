// 1. Creating Date Objects

// Create a Date object representing the current date and time
const currentDate = new Date();
console.log(currentDate); // Output: current date and time

// Create a Date object from a timestamp (milliseconds since Jan 1, 1970)
const dateFromMilliseconds = new Date(1609459200000); // Jan 1, 2021
console.log(dateFromMilliseconds); // Output: Thu Jan 01 2021 00:00:00 GMT+0000 (UTC)

// Create a Date object from a date string
const dateFromString = new Date("2025-02-11");
console.log(dateFromString); // Output: Tue Feb 11 2025 00:00:00 GMT+0000 (UTC)

// Create a Date object from specific date and time components
const specificDate = new Date(2025, 1, 11); // February 11, 2025 (month is 0-based)
console.log(specificDate); // Output: Tue Feb 11 2025 00:00:00 GMT+0000 (UTC)


// 2. Getting Date/Time Components

// Get the full year
const year = currentDate.getFullYear();
console.log(year); // Output: 2025

// Get the month (0-based, January is 0, December is 11)
const month = currentDate.getMonth();
console.log(month); // Output: 1 (for February)

// Get the day of the month (1–31)
const dayOfMonth = currentDate.getDate();
console.log(dayOfMonth); // Output: 11



// Get the day of the week (0–6, where 0 is Sunday and 6 is Saturday)
const dayOfWeek = currentDate.getDay();
console.log(dayOfWeek); // Output: 2 (for Tuesday)

// Get the hour (0–23)
const hours = currentDate.getHours();
console.log(hours); // Output: 15

// Get the minutes (0–59)
const minutes = currentDate.getMinutes();
console.log(minutes); // Output: 42

// Get the seconds (0–59)
const seconds = currentDate.getSeconds();
console.log(seconds); // Output: 30

// Get the milliseconds (0–999)
const milliseconds = currentDate.getMilliseconds();
console.log(milliseconds); // Output: 250

// Get the number of milliseconds since January 1, 1970 (UNIX timestamp)
const timestamp = currentDate.getTime();
console.log(timestamp); // Output: 1676126503256

// Get the difference in minutes between the local time and UTC
const timezoneOffset = currentDate.getTimezoneOffset();
console.log(timezoneOffset); // Output: -330 (for IST)


// 3. Setting Date/Time Components

// Set the year, month, and day
currentDate.setFullYear(2025, 1, 11); // Set to February 11, 2025
console.log(currentDate);

// Set the month
currentDate.setMonth(3); // Set to April
console.log(currentDate);

// Set the day of the month
currentDate.setDate(15); // Set to the 15th of the month
console.log(currentDate);

// Set the hour, minute, and second
currentDate.setHours(12, 30, 0); // Set to 12:30 PM
console.log(currentDate);

// Set the minutes
currentDate.setMinutes(45); // Set to 45 minutes
console.log(currentDate);

// Set the seconds
currentDate.setSeconds(10); // Set to 10 seconds
console.log(currentDate);

// Set the milliseconds
currentDate.setMilliseconds(500); // Set to 500 milliseconds
console.log(currentDate);

// Set the date and time by the number of milliseconds since January 1, 1970
currentDate.setTime(1609459200000); // Set to Jan 1, 2021
console.log(currentDate);


// 4. Date Formatting and String Representation

// Convert the date to a string representation
const dateStr = currentDate.toString();
console.log(dateStr); // Output: "Thu Jan 01 2025 00:00:00 GMT+0000 (UTC)"

// Convert the date to a human-readable date without time
const dateOnlyStr = currentDate.toDateString();
console.log(dateOnlyStr); // Output: "Thu Jan 01 2025"

// Convert the date to a time-only string
const timeOnlyStr = currentDate.toTimeString();
console.log(timeOnlyStr); // Output: "00:00:00 GMT+0000 (UTC)"

// Convert the date to ISO 8601 format
const isoStr = currentDate.toISOString();
console.log(isoStr); // Output: "2025-01-01T00:00:00.000Z"

// Convert the date to a localized date-time string
const localeStr = currentDate.toLocaleString();
console.log(localeStr); // Output: "1/1/2025, 12:00:00 AM"

// Convert the date to a localized date string
const localeDateStr = currentDate.toLocaleDateString();
console.log(localeDateStr); // Output: "1/1/2025"

// Convert the date to a localized time string
const localeTimeStr = currentDate.toLocaleTimeString();
console.log(localeTimeStr); // Output: "12:00:00 AM"

// Convert the date to a UTC string
const utcStr = currentDate.toUTCString();
console.log(utcStr); // Output: "Thu, 01 Jan 2025 00:00:00 GMT"


// 5. Static Methods

// Get the current timestamp (milliseconds since January 1, 1970)
const timestampNow = Date.now();
console.log(timestampNow); // Output: 1676126503256

// Parse a date string and return the corresponding timestamp
const parsedTimestamp = Date.parse("2025-02-11");
console.log(parsedTimestamp); // Output: 1676092800000

// Get the UTC timestamp for a specific date and time
const utcTimestamp = Date.UTC(2025, 1, 11); // February 11, 2025
console.log(utcTimestamp); // Output: 1676092800000
