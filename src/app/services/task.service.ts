import { Injectable } from '@angular/core';
import { Task } from '../../types/task.type';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private key = "tasks";

  constructor() { 
    //Default Tasks
    if(this.find().length == 0) {
      this.save([
        { id: 1, title: "Desenvolver Drag and Drop", description: "Angular function", createAt: new Date(), type : "done" },
        { id: 2, title: "Criar botão de salvar", description: "Salvar novas tarefas", createAt: new Date(), type : "todo" },
        { id: 3, title: "Botão de excluir todas", description: "", createAt: new Date(), type : "done" },
        { id: 4, title: "Criar funcionalidade de editar", description: "Reutilizar modal de save", createAt: new Date(), type : "todo" },
        { id: 5, title: "Start projeto em Angular", description: "npx ng new task-manager", createAt: new Date(), type : "done" },
        { id: 6, title: "Testar drag and drop", description: "Testar entre camadas", createAt: new Date(), type : "done" },
      ]);
    }
  }


  find() {
    const tasks = localStorage.getItem(this.key);
    return tasks ? JSON.parse(tasks) : [];
  }

  save(tasks : Task[]) {
    localStorage.setItem(this.key, JSON.stringify(tasks));
  }


}
