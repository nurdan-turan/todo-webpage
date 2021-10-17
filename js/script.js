//getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todolist");
const deleteAllButton = document.querySelector(".footer button");

inputBox.onkeyup =() => {
    let userData = inputBox.value; //getting user entered value
    if (userData.trim() != 0) { // if user values arent only spaces
        addBtn.classList.add("active"); //active the add button
    } else {
        addBtn.classList.remove("active"); //unactive the add button
    }
}

showTasks(); // calling showtasks

// if user click on the button
addBtn.onclick = () =>{
    let userData = inputBox.value; //getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); // getting localstorage
    if (getLocalStorage == null) {
         listArr = []; //creating blank Array
    } else {
        listArr =JSON.parse(getLocalStorage);
    }

    listArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); // calling showtasks
    addBtn.classList.remove("active"); //unactive the add button

}

//func to add task list inside ul
function showTasks(){
    
    let getLocalStorage = localStorage.getItem("New Todo"); // getting localstorage
    if (getLocalStorage == null) { // if user values arent only spaces
        listArr = []; //active the add button
    } else {
        listArr =JSON.parse(getLocalStorage); //unactive the add button
    }
    const pendingNumber = document.querySelector(".pendingNumber");
    pendingNumber.textContent = listArr.length;
    if (listArr.length > 0) { //if array length is greater 0 
        deleteAllButton.classList.add("active"); //active the clearall button
    } else {
        deleteAllButton.classList.remove("active"); //remove the clearall button
    }
    let newLiTag = '';

    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
                        
    });

    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value=""; // once task added leave the input blank
}

function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo"); // getting localstorage
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete or remove the particular ındexed li
    //after remove the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks(); //calling showtasks func

}

deleteAllButton.onclick = () =>{
    listArr = []; //empty an array
    //after delete all task again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks(); //calling showtasks func
}