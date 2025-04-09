// Programming
// Efficient Task Scheduler with Resource Allocation

// A company is building a task scheduling system to efficiently allocate resources based on task priorities and resource constraints. Each task has a priority and a resource requirement. The system must schedule tasks while ensuring that the available resources do not exceed their capacity.

// Schedule tasks based on their priority.

// Tasks with the highest priority should be scheduled first.

// A task can only be scheduled if its resource requirement is less than or equal to the available resources.

// If the task cannot be scheduled, it will be marked as "Unable to schedule."

// After scheduling, the remaining resources should be updated and displayed.

// Input Format:

// An integer r — total available resources.

// For each task, an entry containing:

// Task name (String)

// Priority (Integer, higher number means higher priority)

// Resource requirement (Integer)

// Output Format:

// A list of the n most frequent words, sorted in descending order of frequency.

// Sample Test Case:

// Sample Input:

// 50
// A 4 10
// B 3 15
// C 5 25
// D 2 5
// E 1 10
// F 4 10
// G 3 8
// Expected Output:

// Task C assigned (Remaining resources: 25)
// Task A assigned (Remaining resources: 15)
// Task F assigned (Remaining resources: 5)
// Unable to schedule Task B (Insufficient resources)
// Unable to schedule Task G (Insufficient resources)
// Task D assigned (Remaining resources: 0)
// Unable to schedule Task E (Insufficient resources)





// const fs = require('fs');

// // Read input from stdin or file
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

// // First line contains the available resources by input[0]
// const resources = parseInt(input[0]);

// // The subsequent lines contain task details (name, priority, resource) by input[1]
// const tasks = input.slice(1).map(line => {
//     const [name, priority, resource] = line.trim().split(' ');
//     return { name, priority: parseInt(priority), resource: parseInt(resource) };
// });

// // create function to schedule tasks
// function scheduleTask(tasks,availableResources){
//     tasks.sort((a,b)=>b.priority-a.priority);

//     for(const task of tasks){
//         if(task.resource <= availableResources){
//             availableResources -= task.resources;
//             console.log(`Task ${task.name} asssigned (Reamaining resources: ${availableResources})`);
//         }else{
//             console.log(`Unable to schedule Task ${task.name} (Insufficient resources)`);
//         }
//     }
// }
// scheduleTask(tasks,resources);



















// Programming
// Word Frequency Analyzer

// A content moderation system for a social media platform is required to analyze the most frequently used words in user posts. To enhance the user experience, the platform needs to highlight the most common words across posts and suggest trending topics.

// Input Format:

// An integer n (the number of top frequent words to return).

// A series of words that will be analyzed for frequency.

// Output Format:

// A list of the n most frequent words, sorted in descending order of frequency.

// Sample Test Case:

// Sample Input:

// 4
// sun moon sun moon sun moon sun moon
// Expected Output:

// [ 'sun', 'moon' ]







// const fs = require('fs');
// const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

// // First line contains the number of top frequent words to return
// const n = parseInt(input[0]);

// // Remaining lines are the words in the array
// const words = input.slice(1).join(' ').split(' ');

// // create function for Word Frequency Analyse 
// function mostFrequentWords(words, n) {
//     // implement logic here
//     const wordCount = {};

//     for(let word of words){
//         word = word.toLowerCase();
//         wordCount[word] = (wordCount[word]||0)+1;
//     }



//     const sortedWords = Object.keys(wordCount).sort((a,b)=>wordCount[b]-wordCount[a]);

// return sortedWords.slice(0,n);
// }

// const topWords = mostFrequentWords(words,n);
// console.log(topWords);