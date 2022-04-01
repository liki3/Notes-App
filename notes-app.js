// Add note to local storage
let addNote = document.getElementById("addNote");
addNote.addEventListener("click", function(e) {
  let addTitle = document.getElementById("note-title");
  let addText = document.getElementById("note-text");
  
    if (addTitle.value == "" || addText.value == "") {
        return alert("Please add Note Title and Details")
    }

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let myObj = {
    title: addTitle.value,
    text: addText.value
  }
  notesObj.unshift(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj))
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let htmlNotes = "";
  notesObj.forEach(function(element, index) {
    htmlNotes += `
      <div class="row">
          <div class="container d-block" id="note">
              <div class="note form-control bg-secondary mb-4">
                  <p class="note-counter">Note</p>
                  <h3 class="note-title"> ${element.title} </h3>
                  <hr>
                  <p class="note-text"> ${element.text}</p>
                  <button id="${index}"onclick="editNote(${index})" class="btn btn-warning note-btn edit-btn">Edit Note</button>
                  <button id="${index}"onclick="deleteNote(${index})" class="btn btn-danger note-btn delete-btn">Delete Note</button>
              </div>
          </div>
      </div> `;
  });

  let notesElement = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElement.innerHTML = htmlNotes;
  } else {
    notesElement.innerHTML = `No Notes Yet! Add a note using the form.`;
  }
}

// Function to Edit the Note
function editNote(index) {
    let notes = localStorage.getItem("notes");
    let addTitle = document.getElementById("note-title");
    let addText = document.getElementById("note-text");

    if (addTitle.value !== "" || addText.value !== "") {
      return alert("Please clear the form before editing a note")
    } 

    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }

    notesObj.findIndex((element, index) => {
      addTitle.value = element.title;
      addText.value = element.text;
    })

    notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
}
showNotes();

// Function to delete a note
function deleteNote(index) {
  let confirmDelete = confirm("Are you sure to delete this note?");
  if (confirmDelete == true) {
      let notes = localStorage.getItem("notes");
      if (notes == null) {
          notesObj = [];
      } else {
          notesObj = JSON.parse(notes);
      }

      notesObj.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      showNotes();
  }

}