if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

let deferredPrompt;
const installBtn = document.getElementById("installPwaBtn");

function isStandaloneApp() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

if (installBtn && isStandaloneApp()) {
  installBtn.style.display = "none";
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;

  if (installBtn && !isStandaloneApp()) {
    installBtn.style.display = "block";
  }
});

installBtn?.addEventListener("click", async () => {
  if (isStandaloneApp()) {
    installBtn.style.display = "none";
    return;
  }

  if (deferredPrompt) {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    deferredPrompt = null;
    installBtn.style.display = "none";
    return;
  }

  alert(
    "앱 설치 방법\n\n" +
    "Android Chrome: 메뉴(⋮) → 앱 설치\n" +
    "Samsung Internet: 메뉴 → 현재 페이지 추가 → 홈 화면\n" +
    "iPhone Safari: 공유(□↑) → 홈 화면에 추가"
  );
});