class UI {
  constructor() {
    this.posts = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.forState = "add";
  }
  showPosts(posts) {
    let output = "";
    posts.map(post => {
      output += `
        <div class="card mb-3">  
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `;
    });
    this.posts.innerHTML = output;
  }

  showAlert(message, classes) {
    this.clearAlert();
    let div = document.createElement("div");
    div.setAttribute("class", classes);
    div.textContent = message;
    // parent
    const container = document.querySelector(".postsContainer");
    // insert
    container.appendChild(div);

    setTimeout(() => this.clearAlert(), 3000);
  }

  clearAlert() {
    let currentAlert = document.querySelector(".alert");
    currentAlert ? currentAlert.remove() : false;
  }

  clearFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }

  clearIdInput() {
    this.idInput.value = "";
  }

  changeFormState(state) {
    if (state === "edit") {
      this.postSubmit.textContent = "Update Post";
      this.postSubmit.setAttribute(
        "class",
        "post-submit btn btn-warning btn-block"
      );
      // create cancel button
      const button = document.createElement("button");
      button.setAttribute("class", "post-cancel btn btn-dark btn-block");
      button.textContent = "Cancel";
      // get parent
      const cardForm = document.querySelector(".card-form");
      // get element to insert before
      const formEnd = document.querySelector(".form-end");
      // insert
      cardForm.insertBefore(button, formEnd);
    } else {
      this.postSubmit.textContent = "Post It";
      this.postSubmit.setAttribute(
        "class",
        "post-submit btn btn-primary btn-block"
      );
      document.querySelector(".post-cancel")
        ? document.querySelector(".post-cancel").remove()
        : false;
      // clear id field
      this.clearIdInput();
      // Clear text
      this.clearFields();
    }
  }

  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;
    this.changeFormState("edit");
  }
}

export const ui = new UI();
