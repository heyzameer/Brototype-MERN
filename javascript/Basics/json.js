
// ======================================
// Working of JSON in API Requests in JavaScript
// ======================================

// API URL to fetch data from
const API_URL = "https://api.github.com/users/akshaymarch7";

// Async function to fetch and handle JSON response
async function handlePromise() {
    try {
        // Fetching data from the API
        const response = await fetch(API_URL);

        // Converting response to JSON
        const jsonValue = await response.json();

        // Logging the JSON data
        console.log("Promise Resolved Value:", jsonValue);
    } catch (error) {
        // Handling errors if API fetch fails
        console.error("Error fetching API:", error);
    }
}

// Calling the function
handlePromise();

/*
======================================
    Explanation of JSON and API Fetch
======================================

1. **Fetching Data:**
   - `fetch(API_URL)` sends a request to the API endpoint.
   - It returns a **Promise** that resolves to a `Response` object.

2. **Converting Response to JSON:**
   - `response.json()` extracts the JSON content from the API response.
   - This method also returns a **Promise**, so we use `await` to get the actual JSON object.

3. **Logging the JSON Data:**
   - The API response is a JSON object, which is then printed in the console.

4. **Error Handling:**
   - Using `try...catch` ensures that if there's an issue (like network failure), the error gets logged.

======================================
    Example API Response (JSON Format)
======================================

The API request returns a JSON object like this:

{
  "login": "akshaymarch7",
  "id": 12345678,
  "avatar_url": "https://avatars.githubusercontent.com/u/12345678?v=4",
  "html_url": "https://github.com/akshaymarch7",
  "public_repos": 42,
  "followers": 100,
  "following": 50
}

======================================
    Key Points About JSON:
======================================

1. **What is JSON?**
   - JSON (JavaScript Object Notation) is a lightweight data format used to store and transfer data.
   - It is written in **key-value** pairs, similar to JavaScript objects.

2. **Why Use JSON?**
   - JSON is **lightweight**, **human-readable**, and **widely used** in APIs.
   - It can be easily parsed and converted to JavaScript objects.

3. **Parsing JSON:**
   - `response.json()` converts JSON data into a JavaScript object.
   - Example:
     const jsonData = '{"name": "John", "age": 25}';
     const parsedData = JSON.parse(jsonData); // Converts JSON string to JavaScript object

4. **Stringifying JSON:**
   - `JSON.stringify(object)` converts a JavaScript object to a JSON string.
   - Example:
     const user = { name: "John", age: 25 };
     const jsonString = JSON.stringify(user); // Converts object to JSON string

5. **Difference Between JSON and JavaScript Object:**
   - JSON keys must be in **double quotes**: `{ "name": "John" }`
   - JavaScript object keys can be without quotes: `{ name: "John" }`

======================================
*/
