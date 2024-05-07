
let dialogPattern = (function () {

  let dialogPromiseReject;

  //Function to hide modal
  function hideModal() {
    let dialogContainer = document.querySelector("#dialog-container");
    //Remove is-visible class to hide the dialog
    dialogContainer.classList.remove("is-visible");

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

  window.addEventListener("keydown", (e) => {
    let dialogContainer = document.querySelector("#dialog-container");
    if (e.key === "Escape" && dialogContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  //Function to show dialog box
  function showDialog(title, text) {
    showModal(title, text);

    let modalContainer = document.querySelector("#dialog-container");


    //Create modal element
    let modal = modalContainer.querySelector(".modal");
    modal.classList.add("modal");

    //Create confirm button for dialog box
    let confirmButton = document.createElement("button");
    confirmButton.classList.add("modal-confirm");
    confirmButton.innerText = "Confirm";

    //Create cancel button for dialog box
    let cancelButton = document.createElement("button");
    cancelButton.classList.add("modal-cancel");
    cancelButton.innerText = "Cancel";

    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);

    //Add focus to confirm button
    confirmButton.focus();

    //Return a promise that resolves when confirmed, else rejects
    return new Promise((resolve, reject) => {
      cancelButton.addEventListener("click", hideModal);
      confirmButton.addEventListener("click", () => {
        dialogPromiseReject = null;
        hideModal();
        resolve();
      });

      dialogPromiseReject = reject;
    });
  }


  //Function to show modal
  function showModal(title, text) {
    let modalContainer = document.querySelector("#dialog-container");
    //Clear all existing dialog content
    modalContainer.innerHTML = "";

    //Create dualog element
    let modal = document.createElement("div");
    modal.classList.add("modal");

    //Create close button in dialog
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("dialog-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    //Create title element in dialog
    let titleElement = document.createElement("h1");
    titleElement.innerText = title;

    //Create content element in dialog
    let contentElement = document.createElement("p");
    contentElement.innerText = text;

    //Append modal elements to dialog
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    //Add is-visible class to show the dialog
    modalContainer.classList.add("is-visible");

    // Close modal when clicking outside of it
    modalContainer.addEventListener("click", (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    })
  }

  //Show dialog on click
  document.querySelector("#show-dialog").addEventListener("click", () => {
    showDialog("Confirm action", "Are you sure you want to proceed?");
  });

})();




