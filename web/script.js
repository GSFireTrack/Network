let prevScrollpos = window.scrollY;

let nav = document.getElementById("navbar");

window.onscroll = function () {
  let currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos || currentScrollPos < 96) {
    nav.style.transform = "translateY(0)";
  } else {
    nav.style.transform = "translateY(-100%)";
  }
  prevScrollpos = currentScrollPos;
};

const toggleButton = document.querySelector(".menu-toggle");
const navList = document.querySelector(".nav-list");
const navLinks = document.querySelectorAll(".nav-list a");

toggleButton.addEventListener("click", () => {
  navList.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("open");
  });
});

let alertSystemActive = false;
let sensorCount = 847;
let alertCount = 2;

function toggleAlertSystem() {
  const alertDiv = document.getElementById("alert-system");
  alertSystemActive = !alertSystemActive;

  if (alertSystemActive) {
    alertDiv.style.display = "block";
    alertDiv.scrollIntoView({ behavior: "smooth" });
  } else {
    alertDiv.style.display = "none";
  }
}

function showNetworkTest() {
  const tests = [
    "Testando conectividade Região Norte → Região Sul...",
    "✅ Ping 192.168.2.10: 4 pacotes enviados, 4 recebidos, 0% perda",
    "Testando resolução DNS...",
    "✅ nslookup firetrack-sul.local: IP resolvido (192.168.2.30)",
    "Testando acesso HTTP...",
    "✅ http://192.168.2.30: Interface FireTrack carregada",
    "Teste de conectividade concluído com sucesso! 🎉",
  ];

  let testWindow = window.open(
    "",
    "Teste de Conectividade",
    "width=600,height=400"
  );
  testWindow.document.write(`
        <html>
        <head><title>Teste de Conectividade - FireTrack Network</title>
        <style>
            body { font-family: monospace; padding: 20px; background: #1a1a1a; color: #00ff00; }
            .test-line { margin: 10px 0; }
            .loading { color: #ffff00; }
        </style>
        </head>
        <body>
        <h2>🧪 Teste de Conectividade FireTrack Network</h2>
        <div id="output"></div>
        </body>
        </html>
    `);

  const output = testWindow.document.getElementById("output");
  let index = 0;

  const showNextTest = () => {
    if (index < tests.length) {
      const div = testWindow.document.createElement("div");
      div.className = "test-line";
      div.textContent = tests[index];

      if (
        tests[index].includes("Testando") &&
        !tests[index].includes("concluído")
      ) {
        div.className += " loading";
      }

      output.appendChild(div);
      index++;

      setTimeout(showNextTest, 1000);
    }
  };

  showNextTest();
}

function updateRealtimeData() {
  if (Math.random() > 0.7) {
    sensorCount = Math.max(
      840,
      Math.min(850, sensorCount + (Math.random() > 0.5 ? 1 : -1))
    );
    document.getElementById("sensors-count").textContent = sensorCount;
  }

  if (Math.random() > 0.8) {
    alertCount = Math.max(
      0,
      Math.min(5, alertCount + (Math.random() > 0.6 ? 1 : -1))
    );
    document.getElementById("alerts-count").textContent = alertCount;
  }

  const uptime = (99.5 + Math.random() * 0.4).toFixed(1);
  document.getElementById("uptime").textContent = uptime + "%";
}

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

setInterval(updateRealtimeData, 5000);

window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease-in-out";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});
