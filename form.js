const form = document.getElementById("contact-form");
const nameField = document.getElementById("name-field");
let nameFieldError = document.getElementById("name-field-error");
const emailField = document.getElementById("email-field");
let emailFieldError = document.getElementById("email-field-error");
const messageField = document.getElementById("message-field");
let messageFieldError = document.getElementById("message-field-error");
const submitButton = document.getElementById("submit-button");

// Load form-errors input and enable it when JS has loaded
let formErrorsInput = document.getElementById("form-errors");
formErrorsInput.disabled = false;

let form_errors = [];

function CheckNameField() {
    let errorMsg = "";
    let formErrorHistory = { field: "Name Field", error: "" };

    if (nameField.validity.valueMissing || nameField.value.trim() === "") {
        errorMsg = "Name field must not be empty.";
        formErrorHistory.error = "Name field is empty";
    } else if (nameField.validity.tooLong) {
        errorMsg = "Name must be fewer than 100 characters.";
        formErrorHistory.error = "Name is too long";
    }

    nameFieldError.textContent = errorMsg;
    nameField.setCustomValidity(errorMsg);
    return formErrorHistory;
}

function CheckEmailField() {
    let errorMsg = "";
    let formErrorHistory = { field: "Email Field", error: "" };

    if (emailField.validity.valueMissing) {
        errorMsg = "Email field must not be empty.";
        formErrorHistory.error = "Email is empty";
    } else if (emailField.validity.typeMismatch) {
        errorMsg = "Email format is invalid. Enter an address such as name@example.com";
        formErrorHistory.error = "Invalid email format";
    }

    emailField.setCustomValidity(errorMsg);
    emailFieldError.textContent = errorMsg;
    return formErrorHistory;
}

function CheckMessageField() {
    let errorMsg = "";
    let formErrorHistory = { field: "Message Field", error: "" };

    if (messageField.validity.valueMissing) {
        errorMsg = "Message field must not be empty.";
        formErrorHistory.error = "Message is empty";
    } else if (messageField.validity.tooShort) {
        errorMsg = "Message must be at least 10 characters long.";
        formErrorHistory.error = "Message is too short";
    } else if (messageField.validity.tooLong) {
        errorMsg = "Message is too long. Max character limit is 1000.";
        formErrorHistory.error = "Message is too long";
    } else {
        messageField.setCustomValidity("");
        const charactersRemaining = messageField.maxLength - messageField.value.length;
        messageFieldError.textContent = "Characters remaining: "+ charactersRemaining;
        return formErrorHistory;
    }

    messageField.setCustomValidity(errorMsg);
    messageFieldError.textContent = errorMsg;
    return formErrorHistory;
}

nameField.addEventListener("change", (e) => {
    CheckNameField();
});

nameField.addEventListener("input", (e) => {
    CheckNameField();
});

emailField.addEventListener("change", (e) => {
    CheckEmailField();
});

emailField.addEventListener("input", (e) => {
    CheckEmailField();
});

messageField.addEventListener("input", (e) => {
    CheckMessageField();
});

submitButton.addEventListener("click", (e) => {
    const nameFieldErrorHistory = CheckNameField();
    const emailFieldErrorHistory = CheckEmailField();
    const messageFieldErrorHistory = CheckMessageField();

    if (form.checkValidity()) {
        formErrorsInput.value = JSON.stringify(form_errors);
    } else {
        if (nameFieldErrorHistory.error !== "") {
            form_errors.push(nameFieldErrorHistory);
        }

        if (emailFieldErrorHistory.error !== "") {
            form_errors.push(emailFieldErrorHistory);
        }

        if (messageFieldErrorHistory.error !== "") {
            form_errors.push(messageFieldErrorHistory);
        }
    }
});