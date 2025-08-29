// src/models/Task.ts

export class Task {
  id: number;
  title: string;
  completed: boolean;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
    this.completed = false;
  }

  toggleComplete(): void {
    this.completed = !this.completed;
  }

  // Polymorphism: Can be overridden
  getDetails(): string {
    return `${this.id}. ${this.title} - ${this.completed ? "✅ Completed" : "⏳ Pending"}`;
  }
}
