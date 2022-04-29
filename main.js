const task_form = document.querySelector(".task_form");
const task_input_field = document.querySelector("#task_input");
const add_task_btn = document.querySelector(".add_task_btn");
const task_list = document.querySelector(".task_list")
let arr = [];

task_form.addEventListener("submit", (e) => {
  e.preventDefault();
  if(task_input_field.value !== "") {
    arr.push(task_input_field.value);
    localStorage.setItem("tasks", JSON.stringify(arr))
    task_input_field.value= "";

    getData();
  } 
});

function getData() {
  task_list.innerHTML = '';
  arr = [];

  let stored_tasks = JSON.parse(localStorage.getItem("tasks"));
  if (stored_tasks) {
    let i = 0;
    stored_tasks.forEach(task => {
      i++;
      arr.push(task);
      const task_li = document.createElement("li")
      task_li.innerHTML = `<button id="remove-${i}" class="remove_task_btn">x</button> ${task} `;
      task_list.appendChild(task_li);

      const remove_task_btn = document.querySelector(`#remove-${i}`);
      remove_task_btn.addEventListener("click", (e) => {
        removeItem(stored_tasks, task);
      });
    });
  }
}

const removeItem = (stored_tasks, task) => {
  let index = stored_tasks.indexOf(task);

  stored_tasks.splice(index, 1)
  localStorage.clear()

  localStorage.setItem("tasks", JSON.stringify(stored_tasks))
  getData()
}

getData(); 

/*
const remove_task_btn = document.querySelector("remove_task_btn");
remove_task_btn.addEventListener("click", (e) => {
  localStorage.removeItem()
})
*/