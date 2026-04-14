let addNote = document.querySelector("#add-note");
let formContainer = document.querySelector(".form-container");
let closeForm = document.querySelector(".closeForm");

const stack = document.querySelector(".stack");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");

const form = document.querySelector("form");

const imageUrlInput = form.querySelector("input[placeholder='https://example.com/photo.jpg']");
const fullNameInput = form.querySelector("input[placeholder='Enter full name']");
const homeTownInput = form.querySelector("input[placeholder='Enter home town']");
const purposeInput = form.querySelector("input[placeholder='e.g., Quick appointment note']");

const categoryRadios = form.querySelectorAll("input[name='category']");
const submitButton = form.querySelector(".submit-btn");


// ------------------------
// SAVE TO LOCAL STORAGE
// ------------------------
function saveToLocalStorage(obj) {
  let oldTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  oldTasks.push(obj);
  localStorage.setItem("tasks", JSON.stringify(oldTasks));
}


// ------------------------
// SHOW FORM POPUP
// ------------------------
addNote.addEventListener("click", function () {
  formContainer.style.display = "initial";
});


// ------------------------
// CLOSE FORM POPUP
// ------------------------
closeForm.addEventListener("click", function () {
  formContainer.style.display = "none";
});


// ------------------------
// FORM SUBMIT
// ------------------------
form.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const imageUrl = imageUrlInput.value.trim();
  const fullName = fullNameInput.value.trim();
  const homeTown = homeTownInput.value.trim();
  const purpose = purposeInput.value.trim();

  let selected = false;
  categoryRadios.forEach(function (cat) {
    if (cat.checked) selected = cat.value;
  });

  // VALIDATION
  if (!imageUrl) return alert("Please enter an Image URL.");
  if (!fullName) return alert("Please enter your Full Name.");
  if (!homeTown) return alert("Please enter your Home Town.");
  if (!purpose) return alert("Please enter the Purpose.");
  if (!selected) return alert("Please select a category.");

  // SAVE NOTE
  saveToLocalStorage({
    imageUrl,
    fullName,
    homeTown,
    purpose,
    selected,
  });

  form.reset();
  formContainer.style.display = "none";
  showCards();
});


// ------------------------
// SHOW ALL CARDS
// ------------------------
function showCards() {
  stack.innerHTML = "";

  let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  allTasks.forEach((task) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // IMAGE
    const avatar = document.createElement("img");
    avatar.src = task.imageUrl;
    avatar.alt = "profile";
    avatar.classList.add("avatar");
    card.appendChild(avatar);

    // NAME
    const name = document.createElement("h2");
    name.textContent = task.fullName;
    card.appendChild(name);

    // HOME TOWN
    const hometownInfo = document.createElement("div");
    hometownInfo.classList.add("info");

    const hometownLabel = document.createElement("span");
    hometownLabel.textContent = "Home town";

    const hometownValue = document.createElement("span");
    hometownValue.textContent = task.homeTown;

    hometownInfo.appendChild(hometownLabel);
    hometownInfo.appendChild(hometownValue);
    card.appendChild(hometownInfo);

    // PURPOSE
    const purposeInfo = document.createElement("div");
    purposeInfo.classList.add("info");

    const purposeLabel = document.createElement("span");
    purposeLabel.textContent = "Purpose";

    const purposeValue = document.createElement("span");
    purposeValue.textContent = task.purpose;

    purposeInfo.appendChild(purposeLabel);
    purposeInfo.appendChild(purposeValue);
    card.appendChild(purposeInfo);

    // BUTTONS
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    const callBtn = document.createElement("button");
    callBtn.classList.add("call");
    callBtn.innerHTML = '<i class="ri-phone-line"></i> Call';

    const msgBtn = document.createElement("button");
    msgBtn.classList.add("msg");
    msgBtn.textContent = "Message";

    buttonsDiv.appendChild(callBtn);
    buttonsDiv.appendChild(msgBtn);

    card.appendChild(buttonsDiv);

    stack.appendChild(card);
  });

  updateStack();
}

showCards();


// ------------------------
// FIXED STACK UPDATING FUNCTION
// ------------------------
function updateStack() {
  const cards = document.querySelectorAll(".stack .card");

  cards.forEach((card, i) => {
    if (i < 3) {
      card.style.zIndex = 3 - i;
      card.style.transform = `translateY(${i * 10}px) scale(${1 - i * 0.02})`;
      card.style.opacity = `${1 - i * 0.2}`;
    } else {
      card.style.opacity = "0";
    }
  });
}


// ------------------------
// ROTATE UP
// ------------------------
upBtn.addEventListener("click", function () {
  let lastChild = stack.lastElementChild;
  if (lastChild) {
    stack.insertBefore(lastChild, stack.firstElementChild);
    updateStack();
  }
});


// ------------------------
// ROTATE DOWN
// ------------------------
downBtn.addEventListener("click", function () {
  let firstChild = stack.firstElementChild;
  if (firstChild) {
    stack.appendChild(firstChild);
    updateStack();
  }
});
