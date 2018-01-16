import { http } from "./http";
import { ui } from "./ui";

const API = "http://localhost:3000/posts";

// Get POST on Dom Load
document.addEventListener("DOMContentLoaded", getPosts);

// Listen for add post event
document.querySelector(".post-submit").addEventListener("click", submitPost);

// Listen for edit state
document.querySelector("#posts").addEventListener("click", enableEdit);

// Listen for cancel button
document.querySelector(".card-form").addEventListener("click", cancelEdit);

// Listen for delete
document.querySelector("#posts").addEventListener("click", deletePost);

// functions
function getPosts() {
  http
    .get(API)
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

function submitPost() {
  const title = document.querySelector("#title").value,
    body = document.querySelector("#body").value,
    id = document.querySelector("#id").value;
  if (title !== "" && body !== "") {
    const data = {
      title,
      body
    };
    // Check for ID - if is empty means that we are in the add state
    if (id === "") {
      http
        .post(API, data)
        .then(() => {
          ui.showAlert("Post added!", "alert alert-success");
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));
    } else {
      http
        .put(`${API}/${id}`, data)
        .then(() => {
          ui.showAlert("Post updated!", "alert alert-success");
          ui.changeFormState("add");
          getPosts();
        })
        .catch(err => console.log(err));
    }
  } else {
    ui.showAlert("Please fill in all fields", "alert alert-danger");
  }
}

function enableEdit(e) {
  if (e.target.parentElement.classList.contains("edit")) {
    let id = e.target.parentElement.dataset.id;
    let title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    let body = e.target.parentElement.previousElementSibling.textContent;
    const data = { id, title, body };
    // Fill the form
    ui.fillForm(data);
  }

  e.preventDefault();
}

function cancelEdit(e) {
  e.target.classList.contains("post-cancel")
    ? ui.changeFormState("add")
    : false;
  e.preventDefault();
}

function deletePost(e) {
  if (e.target.parentElement.classList.contains("delete")) {
    let id = e.target.parentElement.dataset.id;
    if (confirm("Are you sure?")) {
      http
        .delete(`${API}/${id}`)
        .then(() => getPosts())
        .catch(err => console.log(err));
    }
  }
  e.preventDefault();
}
