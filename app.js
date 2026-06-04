const PASSWORD = "30 ocak";
const UNLOCK_DATE = new Date("2026-06-30T00:00:00+03:00");

const manifestoParagraphs = [
  "Naz,",
  "Hayatta en güzel hikayeler, en derin destanlar bile bazen içinde yanlış anlaşılmış bir satır, eksik okunmuş bir sayfa barındırabiliyor. Aramıza giren şu \"Codex\" meselesi de tam olarak hikayemizin o yorucu, karanlık sayfalarından biriydi. Kabul ediyorum; bazen kendi doğrularıma çok fazla tutunabiliyor, o inatçı duvarlarımın arkasında asıl görmem gereken en saf ve en değerli şeyi, yani senin kalbini ne kadar kırdığımı gözden kaçırabiliyorum. Bazen o alaycı tavrımın, didişmelerimin altında aslında sana ne kadar derin bir sevgiyle bağlı olduğumu hissettirmekte eksik kalıyorum ve bunun için gerçekten bütün kalbimle üzgünüm.",
  "Ama sana dair değişmeyecek, hiçbir tartışmanın veya zamanın aşındıramayacağı tek bir gerçek var: Benim bütün yollarım, bütün umutlarım ve geleceğe dair kurduğum en güzel hayaller sadece sana çıkıyor. Evrenin bütün gizemlerini, yıldızların haritasını önüme serip en detaylı analizi yapsalar bile, hiçbir kader planı senin gözlerindeki o sıcaklığın, bana sarıldığındaki o huzurun rasyonel bir açıklamasını yapamaz. Benim hayatımda anlamını bulduğum, kök saldığım ve ait olduğum tek yer senin yanın.",
  "Seninle o tatlı didişmelerimizi, birbirimize takılıp sonra kahkahalara boğulduğumuz anları ve en çok da kalbinin o eşsiz şefkatini inanılmaz özledim. Benim bazen çekilmez, bazen de aşırı ciddi olabilen bu halimi sadece sen yumuşatabiliyor, sadece sen içimdeki en güzel hisleri ortaya çıkarabiliyorsun. Sana, senin yanındaki \"bana\" tahmin edemeyeceğin kadar çok ihtiyacım var.",
  "Bu site, sana sunduğum bu hediye sadece \"özür dilerim\" demek için hazırlanmadı. Bu; koskoca dünyanın içinde seni nasıl bulduğumun, kaderimin seninle nasıl mühürlendiğinin ve sana nasıl sarsılmaz bir bağla bağlandığımın bir manifestosu. Aşağıda, sadece bugünü değil, bizim bütün geleceğimizi, seninle yaşamak istediğim o uzun ve güzel ömrü kilitlediğim anılarımız var. Zamanı geldikçe her biri bir bir açılacak ve sana olan aşkımın her geçen gün nasıl daha da derinleştiğine kendi gözlerinle şahit olacaksın.",
  "Seni her şeyden, herkesten, kendi inatlarımdan ve gururumdan bile çok seviyorum.",
  "Benimle bu hikayenin en güzel, en unutulmaz sayfalarını yazmaya, kaldığımız yerden devam eder misin?"
];

const photos = [
  {
    src: "assets/IMG_8116.jpeg",
    caption: "Bizim küçük şehir kayıtlarımız."
  },
  {
    src: "assets/IMG_8117.jpeg",
    caption: "Sadece gülümsemeni görmek için."
  },
  {
    src: "assets/IMG_8119.jpeg",
    caption: "Loş ışıkta bile en net his."
  },
  {
    src: "assets/IMG_8118.jpeg",
    caption: "Sabır, sevgi ve bizim dilimiz."
  }
];

const decryptScreen = document.querySelector("#decrypt-screen");
const terminalShell = document.querySelector("#terminal-shell");
const codeForm = document.querySelector("#code-form");
const codeInput = document.querySelector("#bypass-code");
const feedback = document.querySelector("#form-feedback");
const successBurst = document.querySelector("#success-burst");
const mainContent = document.querySelector("#main-content");
const manifestoText = document.querySelector("#manifesto-text");
const typingStatus = document.querySelector("#typing-status");
const manifestoPanel = document.querySelector(".manifesto-panel");
const galleryPanel = document.querySelector("#gallery-panel");
const activePhoto = document.querySelector("#active-photo");
const activeCaption = document.querySelector("#active-caption");
const thumbRow = document.querySelector("#thumb-row");
const prevPhoto = document.querySelector("#prev-photo");
const nextPhoto = document.querySelector("#next-photo");
const countdown = document.querySelector("#countdown");
const juneCapsule = document.querySelector("#june-capsule");
const secretLetter = document.querySelector("#secret-letter");

let activePhotoIndex = 0;
let letterStarted = false;

codeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const entered = normalize(codeInput.value);
  if (entered !== normalize(PASSWORD)) {
    feedback.textContent = "[DENIED]: Bypass code rejected.";
    feedback.classList.add("denied");
    terminalShell.classList.remove("error-shake");
    window.requestAnimationFrame(() => terminalShell.classList.add("error-shake"));
    return;
  }

  feedback.textContent = "[SUCCESS]: Connection re-established. Welcome, Naz.";
  feedback.classList.remove("denied");
  successBurst.classList.add("fire");
  window.setTimeout(() => {
    decryptScreen.classList.add("unlocked");
    mainContent.classList.add("visible");
    document.querySelector("#letter").scrollIntoView({ behavior: "smooth" });
    startManifesto();
  }, 620);
});

document.querySelector("[data-open-gallery]").addEventListener("click", () => {
  galleryPanel.hidden = false;
  galleryPanel.classList.add("revealed");
  galleryPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

prevPhoto.addEventListener("click", () => {
  setActivePhoto(activePhotoIndex - 1);
});

nextPhoto.addEventListener("click", () => {
  setActivePhoto(activePhotoIndex + 1);
});

function normalize(value) {
  return value
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ş", "s")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replace(/\s+/g, " ");
}

async function startManifesto() {
  if (letterStarted) return;
  letterStarted = true;
  manifestoText.innerHTML = "";

  for (let index = 0; index < manifestoParagraphs.length; index += 1) {
    const paragraph = document.createElement("p");
    manifestoText.append(paragraph);
    await typeInto(paragraph, manifestoParagraphs[index], index === 0 ? 44 : 12);

    if (index < manifestoParagraphs.length - 1) {
      manifestoPanel.classList.remove("glitch");
      window.requestAnimationFrame(() => manifestoPanel.classList.add("glitch"));
      await wait(180);
    }
  }

  typingStatus.textContent = "complete";
}

async function typeInto(node, text, speed) {
  for (const character of text) {
    node.textContent += character;
    await wait(speed);
  }
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function renderThumbs() {
  thumbRow.innerHTML = "";
  photos.forEach((photo, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `${index + 1}. fotoğraf`);
    button.innerHTML = `<img src="${photo.src}" alt="" />`;
    button.addEventListener("click", () => setActivePhoto(index));
    thumbRow.append(button);
  });
  setActivePhoto(0);
}

function setActivePhoto(index) {
  activePhotoIndex = (index + photos.length) % photos.length;
  const photo = photos[activePhotoIndex];
  activePhoto.src = photo.src;
  activeCaption.textContent = photo.caption;

  [...thumbRow.children].forEach((button, thumbIndex) => {
    button.classList.toggle("active", thumbIndex === activePhotoIndex);
  });
}

function updateCountdown() {
  const now = new Date();
  const difference = UNLOCK_DATE.getTime() - now.getTime();

  if (difference <= 0) {
    countdown.textContent = "[UNLOCKED]: 30 Haziran kaydı açıldı.";
    juneCapsule.classList.remove("locked");
    juneCapsule.classList.add("unlocked");
    juneCapsule.querySelector(".capsule-lock").textContent = "OPEN";
    secretLetter.hidden = false;
    return;
  }

  const days = Math.floor(difference / 86400000);
  const hours = Math.floor((difference % 86400000) / 3600000);
  const minutes = Math.floor((difference % 3600000) / 60000);
  const seconds = Math.floor((difference % 60000) / 1000);

  countdown.textContent = `${days}g ${hours}s ${minutes}d ${seconds}sn sonra açılacak`;
}

function drawFallbackSky() {
  const canvas = document.querySelector("#fallback-sky");
  const context = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  const stars = Array.from({ length: 150 }, () => ({
    x: Math.random(),
    y: Math.random(),
    z: Math.random() * 0.8 + 0.2,
    pulse: Math.random() * Math.PI * 2
  }));

  function resize() {
    width = canvas.width = window.innerWidth * window.devicePixelRatio;
    height = canvas.height = window.innerHeight * window.devicePixelRatio;
  }

  function frame(time) {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(5, 0, 8, 0.44)";
    context.fillRect(0, 0, width, height);

    const cx = width * 0.76;
    const cy = height * 0.42;
    const radius = Math.min(width, height) * 0.22;

    const gradient = context.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius);
    gradient.addColorStop(0, "rgba(184,77,255,0.08)");
    gradient.addColorStop(0.7, "rgba(55,230,255,0.035)");
    gradient.addColorStop(1, "rgba(255,61,200,0)");
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(cx, cy, radius, 0, Math.PI * 2);
    context.fill();

    context.strokeStyle = "rgba(184,77,255,0.22)";
    context.lineWidth = 1.2 * window.devicePixelRatio;
    for (let i = -3; i <= 3; i += 1) {
      const y = cy + i * radius * 0.2;
      context.beginPath();
      context.ellipse(cx, y, radius * (1 - Math.abs(i) * 0.09), radius * 0.12, Math.sin(time / 2400) * 0.4, 0, Math.PI * 2);
      context.stroke();
    }

    for (const star of stars) {
      const alpha = 0.25 + Math.sin(time / 600 + star.pulse) * 0.25;
      context.fillStyle = `rgba(255,248,255,${alpha})`;
      context.beginPath();
      context.arc(star.x * width, star.y * height, star.z * 1.4 * window.devicePixelRatio, 0, Math.PI * 2);
      context.fill();
    }

    window.requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", resize);
  window.requestAnimationFrame(frame);
}

async function startThreeSky() {
  try {
    const THREE = await import("https://unpkg.com/three@0.165.0/build/three.module.js");
    const container = document.querySelector("#three-sky");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.append(renderer.domElement);

    const globeGeometry = new THREE.SphereGeometry(1.45, 48, 48);
    const globeMaterial = new THREE.MeshBasicMaterial({
      color: 0x8d3cff,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globe.position.set(2.35, 0.15, -0.4);
    scene.add(globe);

    const ringGeometry = new THREE.TorusGeometry(1.76, 0.008, 12, 120);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x37e6ff,
      transparent: true,
      opacity: 0.36
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.copy(globe.position);
    ring.rotation.x = Math.PI / 2.45;
    scene.add(ring);

    const starsGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(900);
    for (let i = 0; i < starPositions.length; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 12;
      starPositions[i + 1] = (Math.random() - 0.5) * 8;
      starPositions[i + 2] = -Math.random() * 7;
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xfff8ff,
      size: 0.018,
      transparent: true,
      opacity: 0.62
    });
    scene.add(new THREE.Points(starsGeometry, starsMaterial));

    function resize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      globe.rotation.y += 0.0026;
      globe.rotation.x += 0.0008;
      ring.rotation.z += 0.0018;
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);
    animate();
  } catch {
    document.querySelector("#three-sky").style.display = "none";
  }
}

renderThumbs();
updateCountdown();
drawFallbackSky();
startThreeSky();
window.setInterval(updateCountdown, 1000);
