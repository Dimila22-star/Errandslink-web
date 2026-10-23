const contactForm = document.getElementById("contact-form");
const statusMessage = document.getElementById("form-message");

const API_URL = "https://errandslink-api.onrender.com/requests";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Network response was not ok");

    const requests = await response.json();
    console.log("Current errand requests:", requests);
  } catch (error) {
    console.warn("Could not load initial requests:", error.message);
  }
});

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    if (!name || !email || !message) {
      statusMessage.style.color = "#d93025";
      statusMessage.textContent = "Please fill in all fields before sending.";
      return;
    }
    statusMessage.style.color = "#555";
    statusMessage.textContent = "Sending your message...";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          createdAt: new Date().toISOString()
        })
      });

      if (!response.ok) throw new Error("Failed to post message");

      const data = await response.json();

      statusMessage.style.color = "#1f7a4d";
      statusMessage.textContent = `Thanks ${data.name || name}! We've received your request and will get back to you shortly.`;

      contactForm.reset();
    } catch (error) {
      console.error("Submission error:", error);

      statusMessage.style.color = "#d93025";
      statusMessage.textContent = "Something went wrong on our end. Please try again in a moment.";
    }
  });
}

if (contactForm) {
  contactForm.addEventListener("input", () => {
    if (statusMessage.textContent) {
      statusMessage.textContent = "";
    }
  });
}