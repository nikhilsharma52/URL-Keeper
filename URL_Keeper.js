let myUrl = [];
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteAllBtn = document.getElementById("deleteAll-btn");
const urlFromLocalStorage = JSON.parse(localStorage.getItem("myUrl"));

if (urlFromLocalStorage) {
  myUrl = urlFromLocalStorage;
  render(myUrl);
}

function render(arr) {
  let listItems = "";
  for (let i = 0; i < arr.length; i++) {
    listItems += `
        <li>
            <a target='_blank' href='${arr[i]}'>
                ${arr[i]}
            </a>
        </li>
    `;
  }
  ulEl.innerHTML = listItems;
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myUrl.push(tabs[0].url);
    localStorage.setItem("myUrl", JSON.stringify(myUrl));
    render(myUrl);
  });
});

inputBtn.addEventListener("click", function () {
  myUrl.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myUrl", JSON.stringify(myUrl));
  render(myUrl);
});

deleteAllBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myUrl = [];
  render(myUrl);
});
