function addCount() {
  const add_count = document.getElementById("add_count");
  const ol = document.getElementById("ol");
  let btnStyles = ["py-0", "px-2", "rounded-md", "font-bold"];
  let total_count = document.getElementById("total_count");

  add_count.onclick = function (e) {
    e.preventDefault();
    let li = document.createElement("li");
    let num = 0;
    let p = document.createElement("p");
    p.textContent = num;

    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.onclick = function (e) {
      e.preventDefault();
      num++;
      p.firstChild.textContent = num;
    };
    const minusBtn = document.createElement("button");
    minusBtn.textContent = "-";
    minusBtn.onclick = function (e) {
      e.preventDefault();
      num--;
      p.firstChild.textContent = num;
    };
    li.appendChild(plusBtn);
    li.appendChild(p);
    li.appendChild(minusBtn);
    ol.appendChild(li);

    li.classList.add("text-white", "flex", "gap-2", "my-3");
    minusBtn.classList.add(...btnStyles, "bg-[red]");
    plusBtn.classList.add(...btnStyles, "bg-[green]");
  };
}
addCount();

const search_input = document.getElementById("search_input");
const add_user = document.getElementById("add_user");
const tbody = document.getElementById("tbody");
const remove_all = document.getElementById("remove_all");
let arr = JSON.parse(localStorage.getItem("data")) || [];

document.addEventListener("DOMContentLoaded", (e) => {
  remove_all.addEventListener("click", removeAll);
  add_user.addEventListener("submit", (e) => {
    e.preventDefault();
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const age = document.getElementById("age").value;
    const mail = document.getElementById("mail").value;
    if (first_name !== "" || last_name !== "" || age !== "" || mail !== "") {
      const id = arr.length > 0 ? arr[arr.length - 1].id + 1 : 1;
      arr.push({ first_name, last_name, age, mail, id });
      saveLocal();
      output();
    } else {
      alert("Xatolik: barcha maydonlarni to'ldiring");
    }
  });
  output();
});

function output(all = arr) {
  first_name.value = "";
  last_name.value = "";
  age.value = "";
  mail.value = "";
  tbody.innerHTML = "";
  all.forEach((item, index) => {
    tbody.innerHTML += `<tr class="grid grid-cols-6 gap-2 text-sm">
    <th class="">${item.id}</th>
        <th class="">${item.first_name}</th>
        <th class="">${item.last_name}</th>
        <th class="">${item.age}</th>
        <th class="">${item.mail}</th>
        <th class=""><button id="delete" class="bg-[red] py-1 px-2 text-white rounded-lg">Delete</button></th>
    </tr>`;
    tbody.querySelector("#delete").addEventListener("click", () => {
      all.splice(index, 1);
      saveLocal();
      output();
    });
  });
  saveLocal();
}

function saveLocal() {
  localStorage.setItem("data", JSON.stringify(arr));
}

function removeAll() {
  arr = [];
  saveLocal();
  output();
}

search_input.addEventListener("input", () => {
  const loverCaseInput = search_input.value.toLowerCase();

  let newArr = arr.filter(
    (item) =>
      item.first_name.toLowerCase().includes(loverCaseInput) ||
      item.last_name.toLowerCase().includes(loverCaseInput) ||
      item.age.toLowerCase().includes(loverCaseInput) ||
      item.mail.toLowerCase().includes(loverCaseInput)
  );
  output(newArr);
});
