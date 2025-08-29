// src/models/PriorityTask.ts
import { Task } from "./Task.ts"

export class PriorityTask extends Task {
  priority: "Low" | "Medium" | "High";

  constructor(id: number, title: string, priority: "Low" | "Medium" | "High") {
    super(id, title); // Inheritance
    this.priority = priority;
  }

  // Polymorphism: overriding getDetails()
  getDetails(): string {
    return `${this.id}. ${this.title} [Priority: ${this.priority}] - ${
      this.completed ? "✅ Completed" : "⏳ Pending"
    }`;
  }
}
