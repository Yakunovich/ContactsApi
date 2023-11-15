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
  
  function deleteContact(id) {
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
  