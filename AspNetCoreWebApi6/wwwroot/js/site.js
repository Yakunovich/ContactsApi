const uri = "api/Contacts";
let contacts = [];

function validatePhoneNumber(input_str) {
  var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  return re.test(input_str);
}

function validateForm() {
  phoneNumber = document.getElementById("edit-mobilephone").value;
  name = document.getElementById("edit-name").value;

  var regex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (regex.test(phoneNumber) === false) {
    alert(
      "Enter phone number in the following format: (XX) XXX-XXXX or XX-XXX-XXXX"
    );
  }
  if (name == null || name == "") {
    alert("Name can't be blank");
    return false;
  }
}

const birthDateInputs = document.querySelectorAll(".birthDateInput");
birthDateInputs.forEach((input) => {
  input.setAttribute("max", new Date().toISOString().split("T")[0]);
});

const addContactButton = document.querySelector(".addContactButton");
addContactButton.onclick = function () {
  let modal = addContactButton.getAttribute("data-modal");
  document.getElementById(modal).style.display = "block";
};

const closeButtons = [...document.querySelectorAll(".close")];
closeButtons.forEach(function (button) {
  button.onclick = function () {
    let modal = button.closest(".modal");
    modal.style.display = "none";
  };
});

const addContactForm = document.getElementById("addContactForm");
addContactForm.addEventListener("submit", async (event) => {
  let modal = addContactForm.closest(".modal");
  modal.style.display = "none";

  event.preventDefault();

  addContact();
});

const editContactForm = document.getElementById("editContactForm");
editContactForm.addEventListener("submit", async (event) => {
  //validateForm();
  let modal = editContactForm.closest(".modal");
  modal.style.display = "none";

  event.preventDefault();

  let contactId = modal.getAttribute("key");
  updateContact(contactId);
});

function getContacts() {
  fetch(uri)
    .then((response) => response.json())
    .then((data) => displayContacts(data))
    .catch((error) => console.error("Unable to get contacts.", error));
}

function addContact() {
  const addNameTextbox = document.getElementById("add-name");
  const addMobilePhoneTextbox = document.getElementById("add-mobilephone");
  const addJobTitleTextbox = document.getElementById("add-jobtitle");
  const addBirthDateTextbox = document.getElementById("add-birthdate");

  const contact = {
    name: addNameTextbox.value.trim(),
    mobilePhone: addMobilePhoneTextbox.value.trim(),
    jobTitle: addJobTitleTextbox.value.trim(),
    birthDate: addBirthDateTextbox.value.trim(),
  };
  console.log(contact);
  fetch(uri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  })
    .then((response) => response.json())
    .then(() => {
      getContacts();
      addNameTextbox.value = "";
      addBirthDateTextbox.value = "";
      addJobTitleTextbox.value = "";
      addMobilePhoneTextbox.value = "";
    })
    .catch((error) => console.error("Unable to add contact.", error));
}

function deleteItem(id) {
  fetch(`${uri}/${id}`, {
    method: "DELETE",
  })
    .then(() => getContacts())
    .catch((error) => console.error("Unable to delete contact.", error));
}

function updateContact(id) {
  const contact = {
    id: id,
    name: document.getElementById("edit-name").value.trim(),
    mobilePhone: document.getElementById("edit-mobilephone").value.trim(),
    jobTitle: document.getElementById("edit-jobtitle").value.trim(),
    birthDate: new Date(document.getElementById("edit-birthdate").value.trim()),
  };

  fetch(`${uri}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  })
    .then(() => getContacts())
    .catch((error) => console.error("Unable to update contact.", error));

  return false;
}

function displayEditModal(id) {
  const contact = contacts.find((c) => c.id === id);

  document.getElementById("edit-name").value = contact.name;
  document.getElementById("edit-mobilephone").value = contact.mobilePhone;
  document.getElementById("edit-jobtitle").value = contact.jobTitle;
  document.getElementById("edit-birthdate").value = new Date(contact.birthDate)
    .toISOString()
    .substring(0, 10);

  let editModal = document.getElementById("editContactModal");

  editModal.style.display = "block";
  editModal.setAttribute("key", contact.id);
}

function displayContacts(data) {
  const tBody = document.getElementById("contacts");
  tBody.innerHTML = "";
  const button = document.createElement("button");

  data.forEach((item) => {
    let editButton = button.cloneNode(false);
    editButton.innerText = "Edit";
    editButton.className = "edit-btn";
    editButton.setAttribute("data-modal", "edit");
    editButton.setAttribute("onclick", `displayEditModal(${item.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete-btn";
    deleteButton.setAttribute("onclick", `deleteItem(${item.id})`);

    let tr = tBody.insertRow();

    let td1 = tr.insertCell(0);
    td1.appendChild(document.createTextNode(item.name));

    let td2 = tr.insertCell(1);
    let textNode = document.createTextNode(item.mobilePhone);
    td2.appendChild(textNode);

    let td3 = tr.insertCell(2);
    td3.appendChild(document.createTextNode(item.jobTitle));

    let td4 = tr.insertCell(3);
    let dayNode = new Date(item.birthDate).toISOString().substring(0, 10);
    td4.appendChild(document.createTextNode(dayNode));

    let td5 = tr.insertCell(4);
    td5.appendChild(editButton);
    td5.appendChild(deleteButton);
  });

  contacts = data;
}
getContacts();
