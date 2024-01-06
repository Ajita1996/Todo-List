let todoItemsContainer=document.getElementById("todoItemsContainer");
let addButtonTodo=document.getElementById("addButtonTodos");
let userInputElement=document.getElementById("todoUserInput");
let saveButtonTodo = document.getElementById("saveButtonTodo");
 
function saveTodoListLocalStorage(){
  let colectTodoList = localStorage.getItem("todoList");
  let saveTodoList = JSON.parse(colectTodoList);
  if(saveTodoList===null){
    return[];
  }else{
    return saveTodoList;
  }
};
let todoList = saveTodoListLocalStorage();
/*[
    {
      text: "Learn HTML",
      uniqueNo:1,
    },
    {
      text: "Learn CSS",
      uniqueNo:2,
    },
    {
      text: "Learn JavaScript",
      uniqueNo:3
    }
  ];*/

  saveButtonTodo.onclick = function(){
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };

let todosCount=todoList.length;

  function onStatusChangeTodo(checkboxId , labelId , todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    let todoElementIndex = todoList.findIndex(function(eachTodo){
      let eachTodoId="todo" + eachTodo.uniqueNo;
      if(eachTodoId === todoId){
        return true;
      }
      else{
        return false;
      }
     });
    let todoObject = todoList[todoElementIndex];
    if(todoObject.isChecked===true){
       todoObject.isChecked=false;
    }
    else{
      todoObject.isChecked=true;
    }
  }
  

  function onDeleteTodoItems(todoId){
    let todoElement = document.getElementById(todoId);
     todoItemsContainer.removeChild(todoElement);
     let deleteTodoListIndex = todoList.findIndex(function (eachTodo){
      let eachTodoId="todo" + eachTodo.uniqueNo;
      if(eachTodoId === todoId){
        return true;
      }
      else{
        return false;
      }
     });
     todoList.splice(deleteTodoListIndex,1);
  }

 function  createApppendTodo (todo){
  let todoId = "todo" + todo.uniqueNo;
  let checkboxId = "checkbox" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;
            listContainer = document.createElement("li");
            listContainer.classList.add("todo-itam-container","d-flex","flex-row");
            listContainer.id = todoId;
            todoItemsContainer.appendChild(listContainer);

           inputContainer = document.createElement("input");
           inputContainer.type="checkbox";
           inputContainer.id="checkboxId";
           inputContainer.checked=todo.isChecked;
           inputContainer.onclick=function(){
           onStatusChangeTodo("checkboxId",labelId,todoId);
           };
           inputContainer.classList.add("checkbox-input");
           listContainer.appendChild(inputContainer);

            labelContainer = document.createElement("div");
            labelContainer.classList.add("label-container","d-flex","flex-row");
            listContainer.appendChild(labelContainer);

           labelCheckboxContainer=document.createElement("label");
           labelCheckboxContainer.textContent=todo.text;
           labelCheckboxContainer.id=labelId;
           labelCheckboxContainer.setAttribute("for","checkboxId");
           labelCheckboxContainer.classList.add("checkbox-label");
           if(todo.isChecked===true){
            labelCheckboxContainer.classList.add("checked");
           }
           labelContainer.appendChild(labelCheckboxContainer);

           deleteIconContainer=document.createElement("div");
          deleteIconContainer.classList.add("delete-icon-container");
          labelContainer.appendChild(deleteIconContainer);

           deleteIcon=document.createElement("i");
          deleteIcon.classList.add("far","fa-trash-alt","delete-icon");
          deleteIcon.onclick = function(){
            onDeleteTodoItems(todoId);
          };
          deleteIconContainer.appendChild(deleteIcon);
}

 for(let todo of todoList){
    createApppendTodo(todo);
 }

function onAddtodos(){
  let userInputValue=userInputElement.value;
  if(userInputValue===""){
    alert("enter the velid text");
  }
  todosCount = todosCount+1;
  let newTodo ={
    text:userInputValue,
    uniqueNo:todosCount,
    isChecked:false
  }
  todoList.push(newTodo);
  createApppendTodo (newTodo);
  userInputElement.value="";
  
}

addButtonTodos.onclick=function(){
  onAddtodos()
}




 