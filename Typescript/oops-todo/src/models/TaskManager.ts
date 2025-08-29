// src/models/TaskManager.ts
import { Task } from "./Task.ts"
import { PriorityTask } from "./PriorityTask.ts";

export class TaskManager {
  private tasks: Task[] = [];
  private nextId: number = 1;

  addTask(title: string): Task {
    const task = new Task(this.nextId++, title);
    this.tasks.push(task);
    return task;
  }

  addPriorityTask(title: string, priority: "Low" | "Medium" | "High"): Task {
    const task = new PriorityTask(this.nextId++, title, priority);
    this.tasks.push(task);
    return task;
  }

  listTasks(): void {
    console.log("\n📋 Task List:");
    this.tasks.forEach((task) => console.log(task.getDetails())); // Polymorphism in action
  }

  completeTask(id: number): void {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.toggleComplete();
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}
