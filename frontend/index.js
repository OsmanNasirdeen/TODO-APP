const btn = document.querySelector(".getItems");
const dsp = document.querySelector(".task-display-container");
const http = new XMLHttpRequest();
const submitBtn = document.querySelector(".butt");
const formData = document.querySelector(".task");
const fetchData = () => {
  http.onload = () => {
    const { allTasks } = JSON.parse(http.response);
    allTasks.map((user) => {
      const { _id: userID, name } = user;

      dsp.innerHTML += `<div class="d-flex justify-content-between" style="height: 30px;  margin-bottom: 25px; background-color: lime; border:2px solid green;" class="${userID}"> <span style="font-weight: bold;" class="pb-3" id="${userID}"> ${name} </span ><span class="align-self-center"><button class="btn items-button" id="${userID}" onclick="deleteTask(this)"><i class="bi bi-trash"></i></button><button><i class="bi bi-pencil"></i></button></span>
         </div>`;
    });
  };
  http.open("GET", "http://localhost:7000/api/v1/tasks");
  http.send();
};

const deleteTask = (task) => {
  const deleteID = task.id;
  const parent = task.parentElement.parentElement;
  http.onload = () => {
    parent.remove();
  };
  http.open("DELETE", `/api/v1/tasks/${deleteID}`);
  http.send();
};

//action when open the page
window.addEventListener("DOMContentLoaded", () => {
  fetchData();
});
const addTask = () => {
  const task = formData.value;
  if (!task) {
    return window.alert("task cannot be empty");
  }
  const data = { name: task };
  http.onload = async () => {
    try {
      const { task } = await JSON.parse(http.response);
      const { _id: userID, name } = task;
      dsp.innerHTML += `<div class="d-flex justify-content-between" style="height: 30px;  margin-bottom: 25px; background-color: lime; border:2px solid green;"> <span style="font-weight: bold;" class="pb-3" id="${userID}"> ${name} </span ><span class="align-self-center"><button class="btn items-button" id="${userID}" onclick="deleteTask(this)"><i class="bi bi-trash"></i></button><button><i class="bi bi-pencil"></i></button></span>
         </div>`;
      window.alert("success! task added");
      formData.value = "";
    } catch (error) {
      console.log(error);
    }
  };
  http.open("POST", "/api/v1/tasks");
  http.setRequestHeader("content-type", "application/JSON");
  http.send(JSON.stringify(data));
};
