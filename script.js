let taskList = [];
let badList = [];
const invalidChars = ["+", "-", "e", "E"];

const hrsPerWeek = 168; // 24*7

const q = document.querySelector(".hrs-input");

q.addEventListener("keydown", (e) => {
  invalidChars.includes(e.key) && e.preventDefault();
});

document.getElementById("form-btn").addEventListener("click", (e) => {
  e.preventDefault();

  const task = document.querySelector(".task-input").value;
  const hr = document.querySelector(".hrs-input").value;

  if (!task || !hr) {
    return;
  }

  const obj = {
    task,
    hr,
  };

  const totalAllocatedHrs = totalTaskHours();
  if (totalAllocatedHrs + +hr > hrsPerWeek) {
    return alert("Sorry, you do not have enough hours to complete this task");
  }

  taskList.push(obj);
  displayTask();
  totalTaskHours;

  displayTask(); // calling the function
});

const displayTask = () => {
  let str = "";

  taskList.map((item, i) => {
    str += `
        <tr>
        <td>${i + 1}</td>
        <td>${item.task}</td>
        <td>${item.hr}</td>
        <td>
        <button onclick="deleteTask(${i}) "class = "btn btn-danger"><i class="fa-solid fa-trash"></i></button>

        <button onclick="markAsNotToDo(${i})" class = "btn btn-success"><i class="fa-solid fa-right-long"></i></button>
        </td>
        </tr>
    `;
  });

  document.querySelector("#task-list").innerHTML = str;

  totalTaskHours();
};

const displayBadTask = () => {
  let str = "";
  badList.map((item, i) => {
    str += `
        <tr>
        <td>${i + 1}</td>
        <td>${item.task}</td>
        <td>${item.hr}</td>
        <td>
        <button onclick="deleteBadTask(${i})" class = "btn btn-danger"><i class="fa-solid fa-trash"></i></button>

        <button onclick="markAsToDo(${i})" class = "btn btn-warning"><i class="fa-solid fa-left-long"></i></button>
        </td>
        </tr>

    `;
  });

  document.querySelector("#bad-task").innerHTML = str;

  totalBadTaskHours(); // calling the function
};

const markAsNotToDo = (i) => {
  const item = taskList.splice(i, 1);
  badList.push(item[0]);
  displayTask();
  displayBadTask();
};

const markAsToDo = (i) => {
  const item = badList.splice(i, 1);
  taskList.push(item[0]);
  displayTask();
  displayBadTask();
};

const deleteTask = (i) => {
  if (window.confirm("Are you sure you want to delete this task?")) {
    taskList = taskList.filter((item, index) => index !== i);
    displayTask();
  }
};

const deleteBadTask = (i) => {
  if (window.confirm("Are you sure you want to delete this task?")) {
    badList = badList.filter((item, index) => index !== i);
    displayBadTask();
    totalTaskHours();
  }
};

const totalBadTaskHours = () => {
  const total = badList.reduce((a, i) => a + +i.hr, 0);
  console.log(total);

  document.querySelector("#totalBadHrs").innerText = total;
  return total;
};

const totalTaskHours = () => {
  const total = taskList.reduce((a, i) => a + +i.hr, 0);

  document.querySelector("#totalHrs").innerText = total + totalBadTaskHours();
  return total;
};
