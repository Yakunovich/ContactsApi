const uri = 'api/Contacts';
let contacts = [];

function getContacts() {
  fetch(uri)
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get contacts.', error));
}

function addContact() {
  const addNameTextbox = document.getElementById('add-name');
  const addMobilePhoneTextbox = document.getElementById('add-mobilephone');
  const addJobTitleTextbox = document.getElementById('add-jobtitle');
  const addBirthDateTextbox = document.getElementById('add-birthdate');

  const item = {
    name: addNameTextbox.value.trim(),
    mobilePhone: addMobilePhoneTextbox.value.trim(),
    jobTitle: addJobTitleTextbox.value.trim(),
    birthDate: addBirthDateTextbox.value.trim(),
  };
  console.log(item);
  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(response => response.json())
    .then(() => {
      getItems();
      addNameTextbox.value = '';
      addBirthDateTextbox.value = '';
      addJobTitleTextbox.value = '';
      addMobilePhoneTextbox.value = '';
    })
    .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getContacts())
  .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
  const item = todos.find(item => item.id === id);
  
  document.getElementById('edit-name').value = item.name;
  document.getElementById('edit-id').value = item.id;
  document.getElementById('edit-isComplete').checked = item.isComplete;
  document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
  const itemId = document.getElementById('edit-id').value;
  const item = {
    id: parseInt(itemId, 10),
    isComplete: document.getElementById('edit-isComplete').checked,
    name: document.getElementById('edit-name').value.trim()
  };

  fetch(`${uri}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to update item.', error));

  closeInput();

  return false;
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

function _displayItems(data) {
  const tBody = document.getElementById('contacts');
  tBody.innerHTML = '';
  const button = document.createElement('button');

  data.forEach(item => {
    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.className = "edit-btn"
    editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.className= "delete-btn";
    deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

    let tr = tBody.insertRow();
    
    let td1 = tr.insertCell(0);
    td1.appendChild(document.createTextNode(item.name));

    let td2 = tr.insertCell(1);
    let textNode = document.createTextNode(item.mobilePhone);
    td2.appendChild(textNode);

    let td3 = tr.insertCell(2);
    td3.appendChild(document.createTextNode(item.jobTitle));

    let td4 = tr.insertCell(3);
    let dayNode = new Date(item.birthDate).toLocaleDateString()
    td4.appendChild(document.createTextNode(dayNode));

    let td5 = tr.insertCell(4);
    td5.appendChild(editButton);
    td5.appendChild(deleteButton);

  });

  contacts = data;
}