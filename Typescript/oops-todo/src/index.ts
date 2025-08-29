// src/index.ts
import { TaskManager } from "./models/TaskManager.ts"

const manager = new TaskManager();

// Adding tasks
manager.addTask("Buy groceries");
manager.addPriorityTask("Finish project report", "High");
manager.addPriorityTask("Clean the house", "Medium");

// Show all tasks
manager.listTasks();

// Complete a task
manager.completeTask(2);

console.log("\n✅ After Completing Task 2:");
manager.listTasks();
// npx ts-node src/index.ts
// tsc && node dist/index.js