const queryvalues = window.location.search;
const urlParams = new URLSearchParams(queryvalues);
const paramsTaskId = urlParams.get("taskId");
const paramsTaskName = urlParams.get("taskName");
const taskId = document.querySelector(".task_id");
const taskName = document.querySelector(".task_name");
taskId.value = paramsTaskId;
taskName.value = paramsTaskName;
