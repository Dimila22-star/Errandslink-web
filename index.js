const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

const API_URL = "https://errandslink-api.onrender.com/requests";

const API_URL = "https://dimila22-star.github.io/Errandslink-web/";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const message = document.getElementById("message")?.value.trim();

  formMessage.style.color = "#555";
  formMessage.textContent = "Sending your message...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message, createdAt: new Date().toISOString() })
    });

    if (!response.ok) throw new Error("Server issue");

    formMessage.style.color = "#1f7a4d";
    formMessage.textContent = `Thanks ${name}! We've received your request and will get back to you shortly.`;
    
    form.reset();
  } catch (error) {
    console.error("Submission failed:", error);

    formMessage.style.color = "#d93025";
    formMessage.textContent = "Oops! Something went wrong on our end. Please try again in a moment.";
  }
});