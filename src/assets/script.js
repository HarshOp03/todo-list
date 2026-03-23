const addbtn = document.getElementByclass('add-btn');

todotext = inputTag.value;
todos=[];
todosString = localStorage.getItem("todos");
if(todosString){
    todos = JSON.parse(todosString);
}




addbtn.addEventListener('click', function () {
    console.log("Button clicked!");
    if (todotext.trim() === "") return;
    inputTag.value = "";
    let todo = {
        title: todotext,
        isCompleted: false  // Fixed: Changed from iscompleted to isCompleted
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

});

const populatedtods = () => {
    console.log("Populating todos...");

    let string = "";
    for (const todo of todos) {
        // Ensure todo object has 'isCompleted' property, or handle its absence gracefully
        // The filter above should prevent 'todo' itself from being null/undefined.
        // If 'isCompleted' might genuinely be missing from a valid object,
        // consider a default value or a check here.
        string += `<li class="todo-item ${todo.isCompleted ? "Completed" : ""}">
            <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""}>
            <span class="todo-text">${todo.title}</span>
            <button class="delete-btn">×</button>
        </li>`
    }
    todolist.innerHTML = string;
}
populatedtods();
