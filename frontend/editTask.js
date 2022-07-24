const queryvalues = window.location.search;
const urlParams = new URLSearchParams(queryvalues);
const paramsTaskId = urlParams.get("taskId");
const paramsTaskName = urlParams.get("taskName");
const formTaskId = document.querySelector(".task_id");
const formTaskName = document.querySelector(".task_name");
formTaskId.value = paramsTaskId;
formTaskName.value = paramsTaskName;
const submit_btn = document.querySelector(".edit-task-submit");
const http = new XMLHttpRequest();
submit_btn.addEventListener("click", () => {
  const formData = formTaskName.value;
  if (!formData) {
    return window.alert("Task cannot be empty");
  }
  const data = { name: formData };
  http.onload = async () => {
    try {
      const response = await JSON.parse(http.response);
      const { task } = response;
      document.body.innerHTML = `<pre>
      <h2>success! Task updated to ---> ${task.name}</h2>

     <div><a href="index.html">BACK TO HOMEPAGE</a></div>

     </pre>`;
    } catch (err) {
      document.body.innerHTML = `${err}`;
    }
  };
  http.open("PATCH", `/api/v1/tasks/${paramsTaskId}`);
  http.setRequestHeader("content-type", "application/JSON");
  http.send(JSON.stringify(data));
});
