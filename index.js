const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  formMessage.textContent = "Thanks " + name + ", we got your message!";

  form.reset();
});
