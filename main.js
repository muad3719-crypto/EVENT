// =====================
// MAIN.JS — User Dashboard Logic
// =====================

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const logoutBtn = document.getElementById("logoutBtn");

  // =====================
  // HANDLE SIGNUP
  // =====================
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!name || !email || !password) {
        alert("⚠️ Please fill all fields!");
        return;
      }

      localStorage.setItem("user", JSON.stringify({ name, email, password }));
      alert(`🎉 Welcome ${name}! Your account has been created.`);
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 400);
    });
  }

  // =====================
  // HANDLE LOGIN
  // =====================
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const savedUser = JSON.parse(localStorage.getItem("user"));

      if (!email || !password) {
        alert("⚠️ Please fill all fields!");
        return;
      }

      if (!savedUser || email !== savedUser.email || password !== savedUser.password) {
        alert("❌ Invalid email or password!");
        return;
      }

      alert(`✅ Login successful! Welcome ${savedUser.name}`);
      window.location.href = "dashboard.html";
    });
  }

  // =====================
  // HANDLE LOGOUT
  // =====================
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      alert("👋 Logged out successfully!");
      window.location.href = "../Ulogin.html";
    });
  }

  // =====================
  // SHOW USER NAME
  // =====================
  const user = JSON.parse(localStorage.getItem("user"));
  const welcomeName = document.getElementById("welcomeName");
  if (user && welcomeName) {
    welcomeName.textContent = user.name;
  }

  // =====================
  // LOAD EVENTS IN DASHBOARD
  // =====================
  const eventsList = document.getElementById("eventsList");
  if (eventsList) {
    const events = [
      {
        id: 1,
        title: "AI Seminar",
        organizer: "Dr. Ali Boujwari",
        date: "2025-11-10",
        time: "10:00 AM",
        location: "LIMU Main Hall",
        description: "Exploring Artificial Intelligence and its applications in modern systems."
      },
      {
        id: 2,
        title: "Medical Conference",
        organizer: "Faculty of Medicine",
        date: "2025-11-15",
        time: "09:00 AM",
        location: "Auditorium B",
        description: "Annual conference discussing advancements in medical research and innovation."
      },
      {
        id: 3,
        title: "Cybersecurity Workshop",
        organizer: "IT Department",
        date: "2025-11-20",
        time: "02:00 PM",
        location: "Tech Lab 3",
        description: "Learn practical methods to protect systems and networks from cyber attacks."
      }
    ];

    localStorage.setItem("events", JSON.stringify(events));

    eventsList.innerHTML = "";
    events.forEach(ev => {
      const card = document.createElement("div");
      card.classList.add("col-md-4", "mb-4");
      card.innerHTML = `
        <div class="card bg-card text-light p-3 fade-in">
          <h4>${ev.title}</h4>
          <p><strong>Organizer:</strong> ${ev.organizer}</p>
          <p><strong>Date:</strong> ${ev.date}</p>
          <p><strong>Time:</strong> ${ev.time}</p>
          <button class="btn btn-primary w-100 mt-2" onclick="viewEvent(${ev.id})">
            View Details
          </button>
        </div>
      `;
      eventsList.appendChild(card);
    });
  }
});

// =====================
// FUNCTION TO VIEW EVENT DETAILS
// =====================
function viewEvent(id) {
  localStorage.setItem("selectedEvent", id);
  window.location.href = "eventview.html";
}
