type Task = {
  id: string;
  content: string;
};

function createTaskElement(task: Task): HTMLElement {
  const div = document.createElement("div");
  div.className = "task";
  div.draggable = true;
  div.textContent = task.content;
  div.dataset.id = task.id;

  // Eventos de Drag
  div.addEventListener("dragstart", () => {
    div.classList.add("dragging");
  });
  div.addEventListener("dragend", () => {
    div.classList.remove("dragging");
  });

  return div;
}

function addTask(columnId: string, content: string) {
  const task: Task = {
    id: Date.now().toString(),
    content,
  };
  const column = document.getElementById(columnId)!;
  column.appendChild(createTaskElement(task));
}

// Botão adicionar tarefa
document.querySelectorAll(".add-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const columnId = (btn as HTMLElement).dataset.column!;
    const content = prompt("Digite a tarefa:");
    if (content) addTask(columnId, content);
  });
});

// Drag & Drop nas colunas
document.querySelectorAll(".task-list").forEach((list) => {
  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging") as HTMLElement;
    if (dragging) {
      list.appendChild(dragging);
    }
  });
});
