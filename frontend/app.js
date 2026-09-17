const API_URL = "https://login-system-97ea.onrender.com";

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const showRegister = document.getElementById("showRegister");

showRegister.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.classList.toggle("hidden");
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  if (!email || !password) {
    message.innerText = "Please enter email and password";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await response.json();

    if (response.ok && data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      message.innerText = data.message || "Login failed";
    }

  } catch (error) {
    console.error(error);
    message.innerText = "Cannot connect to server";
  }
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const message = document.getElementById("registerMessage");

  if (!name || !email || !password) {
    message.innerText = "Please fill in all fields";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    });

    const data = await response.json();

    if (response.ok) {
      message.innerText = data.message || "Registration successful";

      document.getElementById("name").value = "";
      document.getElementById("regEmail").value = "";
      document.getElementById("regPassword").value = "";
    } else {
      message.innerText = data.message || "Registration failed";
    }

  } catch (error) {
    console.error(error);
    message.innerText = "Cannot connect to server";
  }
});