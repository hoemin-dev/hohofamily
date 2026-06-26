if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

let deferredPrompt;
const installBtn = document.getElementById("installPwaBtn");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
});

installBtn?.addEventListener("click", async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    deferredPrompt = null;
    return;
  }

  alert(
    "앱 설치 방법\n\n" +
    "Android Chrome: 메뉴(⋮) → 앱 설치\n" +
    "Samsung Internet: 메뉴 → 현재 페이지 추가 → 홈 화면\n" +
    "iPhone Safari: 공유(□↑) → 홈 화면에 추가"
  );
});