import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditIconComponent } from "./components/edit-icon/edit-icon.component";
import { RemoveIconComponent } from "./components/remove-icon/remove-icon.component";
import { FormsModule } from '@angular/forms';
import { last } from 'rxjs';
import { AddIconComponent } from "./components/add-icon/add-icon.component";
import { Task } from '../types/task.type';
import { TaskService } from './services/task.service';

// ✅ FIXED drag-and-drop between columns (lists)
// Drag events must include dataTransfer to ensure drag state is retained

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, CommonModule, EditIconComponent, RemoveIconComponent, AddIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  types : { label: string; textColor: string; color: string; variable: "todo" | "done"; isInLast: boolean; dropdown: { open: boolean; options: { label: string; action: null | { type: "todo" | "done"; action: "add" | "remove"; }; }[]; }; }[] = [
    { label: "Para Fazer", textColor: "rgba(233, 126, 35, 0.45)", color: "rgba(233, 126, 40, 0.06)", variable: 'todo', isInLast: false, dropdown: { open: false, options: [
      { label: "Concluir Todas", action: { type: 'todo', action: 'add' }},
      { label: "Remover Todas", action: { type: 'todo', action: 'remove' }}
    ]}},
    { label: "Concluído", textColor: "rgba(45, 153, 100, 0.5)", color: "rgba(45, 153, 100, 0.08)", variable: 'done', isInLast: false, dropdown: { open: false, options: [
      { label: "Concluir Todas", action: null },
      { label: "Remover Todas", action: { type: 'done', action: 'remove' }}
    ]}}
  ];

  tasks: Task[] = [];
  creatingTask: any;
  draggingTask!: Task;
  draggingOverType: string | null = null;

  constructor(private taskService: TaskService) {
    this.tasks = taskService.find();
  }

  getDate(date: Date): string {
    return new Date(date).toLocaleString();
  }

  dragStart(event: DragEvent, task: Task) {
    this.draggingTask = task;
    event.dataTransfer?.setData("text/plain", task.id.toString());
  }

  dragOver(event: DragEvent, targetType: string) {
    event.preventDefault();
    this.draggingOverType = targetType;
  }

  dragLeave(event: DragEvent) {
  event.preventDefault();
  this.draggingOverType = null;
}


  drop(event: DragEvent, targetType: "todo" | "done") {
    event.preventDefault();

    if (!this.draggingTask || this.draggingTask.type === targetType) return;

    this.draggingTask.type = targetType;
    this.taskService.save(this.tasks);
  }

  filteredArray(type: "todo" | "done") {
    return this.tasks.filter(t => t.type === type).sort((a, b) => {
      return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
    });
  }

  changeCreatingState(taskToEdit?: Task) {
    this.creatingTask = taskToEdit ? taskToEdit : { title: "", description: "" };
  }

  createTask() {
    if(this.creatingTask.id ) {
      const index = this.tasks.findIndex(t => t.id === this.creatingTask.id);
      if (index !== -1) {
        this.tasks[index] = {
          ...this.tasks[index],
          title: this.creatingTask.title || "Nome da Tarefa",
          description: this.creatingTask.description || "Descrição",
        };
      }
    } else {

      const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
      this.tasks.push({
        id,
        title: this.creatingTask.title || "Nome da Tarefa",
        description: this.creatingTask.description || "Descrição",
        createAt: new Date(),
        type: "todo"
      });
    }
    this.taskService.save(this.tasks);
    this.creatingTask = undefined;
  }

  removeTask(taskID: number) {
    this.tasks = this.tasks.filter(t => t.id !== taskID);
    this.taskService.save(this.tasks);
  }

  changeDropdownState(type: any) {
    type.dropdown.open = !type.dropdown.open;
  }

  editAll(dropdown: any, type: "todo" | "done", action: "add" | "remove") {
    if (action === "add" && type === "todo") this.tasks.forEach(t => t.type = "done");
    if (action === "remove") this.tasks = this.tasks.filter(t => t.type !== type);
    dropdown.open = false;
    this.taskService.save(this.tasks);
  }
}

