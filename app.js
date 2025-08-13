let installPrompt = null;
const installButton = document.querySelector("#install");

let isAppInstalled = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  document.querySelector("#isNotAppInstalled").textContent = isAppInstalled ? "O PWA já está instalado! ;)" : "O PWA não está instalado!";

window.addEventListener("beforeinstallprompt", (event) => {
  console.log("beforeinstallprompt event fired");
  event.preventDefault();
  installPrompt = event;
  installButton.removeAttribute("hidden");
});

window.addEventListener('load', () => {
  if (shouldShowInstallBanner()) {
    document.getElementById('ios-install-banner').style.display = 'block';
  }
});

function shouldShowInstallBanner() {
  const isIOS = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isInStandalone = window.navigator.standalone === true;

  return isIOS && isSafari && !isInStandalone;
}


installButton.addEventListener("click", async () => {
  if (!installPrompt) {
    return;
  }
  const result = await installPrompt.prompt();
  console.log(`Install prompt was: ${result.outcome}`);
  installPrompt = null;
  installButton.setAttribute("hidden", "");
});