const body = document.body;
const htmlEl = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const cursorGlow = document.querySelector(".cursor-glow");

const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme =
  localStorage.getItem("portofolio-theme") || (prefersDark ? "dark" : "light");
htmlEl.dataset.theme = savedTheme;
themeToggle.textContent = htmlEl.dataset.theme === "dark" ? "☀" : "☾";

themeToggle.addEventListener("click", () => {
  const dark = htmlEl.dataset.theme !== "dark";
  htmlEl.dataset.theme = dark ? "dark" : "light";
  themeToggle.textContent = dark ? "☀" : "☾";
  localStorage.setItem("portofolio-theme", htmlEl.dataset.theme);
});

menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Cursor glow: only activate on non-touch (pointer: fine) devices
const isTouchDevice = window.matchMedia('(hover: none)').matches;
if (!isTouchDevice && cursorGlow) {
  let mouseX = -1000,
    mouseY = -1000,
    mouseTicking = false;
  window.addEventListener(
    "mousemove",
    (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!mouseTicking) {
        mouseTicking = true;
        requestAnimationFrame(() => {
          cursorGlow.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0)`;
          mouseTicking = false;
        });
      }
    },
    { passive: true },
  );
}

const typingText = document.getElementById("typingText");
const roles = [
  "Web Developer",
  "Internet of Things",
  "Administration",
  "Maintenance Computer",
];
let roleIndex = 0,
  charIndex = 0,
  deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  typingText.textContent = deleting
    ? current.slice(0, --charIndex)
    : current.slice(0, ++charIndex);
  let speed = deleting ? 45 : 85;
  if (!deleting && charIndex === current.length) {
    speed = 1400;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }
  setTimeout(typeLoop, speed);
}
typeLoop();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const aboutData = {
  education: {
    title: "Pendidikan",
    period: "Education",
    description:
      "Pendidikan merupakan proses mengembangkan pengetahuan, keterampilan, dan kemampuan sebagai bekal menghadapi dunia kerja dan kehidupan.",
  },
  experience: {
    title: "Pengalaman",
    period: "experience",
    description:
      "Pengalaman merupakan bagian dari proses pengembangan diri melalui berbagai kegiatan, organisasi, dan tanggung jawab yang membantu membangun kemampuan, wawasan, serta kesiapan menghadapi dunia kerja.",
  },
  achievement: {
    title: "Pencapaian",
    period: "Achievements",
    description:
      "Pencapaian merupakan hasil dari usaha, proses, dan pengalaman dalam mencapai suatu tujuan.",
  },
  training: {
    title: "Pelatihan",
    period: "Training",
    description:
      "Pelatihan menjadi sarana untuk meningkatkan pengetahuan, keterampilan, dan kemampuan melalui pembelajaran dan praktik.",
  },
  certificate: {
    title: "Sertifikat",
    period: "Certificate",
    description:
      "Sertifikat merupakan bukti tertulis atas keikutsertaan dan penyelesaian suatu kegiatan, seperti pelatihan, seminar, workshop, maupun perlombaan, yang menjadi rekam jejak proses belajar dan pengembangan diri.",
  },
  certification: {
    title: "Sertifikasi",
    period: "Certification",
    description:
      "Sertifikasi merupakan pengakuan resmi atas kompetensi yang dimiliki setelah melalui proses uji dan penilaian oleh lembaga berwenang, sebagai bukti bahwa keterampilan yang dikuasai telah memenuhi standar yang berlaku.",
  },
};

const aboutOrder = [
  "education",
  "experience",
  "achievement",
  "training",
  "certificate",
  "certification",
];
// --- About: 3D carousel / circular slider -------------------------------
let currentAboutKey = "education";

const aboutRing = document.getElementById("aboutCarouselRing");
const aboutStage = document.getElementById("aboutCarouselStage");
const aboutItems = Array.from(
  document.querySelectorAll(".about-carousel-item"),
);
const aboutDotsWrap = document.getElementById("aboutDots");

const aboutCount = aboutItems.length;
const aboutAngleStep = aboutCount ? 360 / aboutCount : 0;

let absoluteIndex = 0;

if (aboutDotsWrap) {
  aboutDotsWrap.innerHTML = "";
  aboutItems.forEach((item, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute(
      "aria-label",
      `Lihat ${aboutData[item.dataset.about]?.title || "kategori"}`,
    );
    dot.addEventListener("click", () => navigateTo(i));
    aboutDotsWrap.appendChild(dot);
  });
}
const aboutDots = aboutDotsWrap ? Array.from(aboutDotsWrap.children) : [];

function navigateTo(targetIdx) {
  if (!aboutCount) return;
  const currentActive =
    ((absoluteIndex % aboutCount) + aboutCount) % aboutCount;

  let diff = targetIdx - currentActive;

  if (diff > aboutCount / 2) diff -= aboutCount;
  if (diff < -aboutCount / 2) diff += aboutCount;

  setAboutIndex(absoluteIndex + diff);
}

function setAboutIndex(newIndex) {
  if (!aboutCount) return;

  absoluteIndex = newIndex;

  const activeIndex = ((absoluteIndex % aboutCount) + aboutCount) % aboutCount;

  if (aboutRing) {
    aboutRing.style.setProperty(
      "--ring-rotate",
      `${-absoluteIndex * aboutAngleStep}deg`,
    );
  }

  aboutItems.forEach((item, idx) =>
    item.classList.toggle("is-active", idx === activeIndex),
  );
  aboutDots.forEach((dot, idx) =>
    dot.classList.toggle("active", idx === activeIndex),
  );

  currentAboutKey = aboutItems[activeIndex].dataset.about;
}

aboutItems.forEach((item, idx) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("is-active")) {
      const img = item.querySelector(".about-visual-photo img");
      if (img && img.style.display !== "none") {
        openLightbox(img.src, img.alt);
        return;
      }
    }
    navigateTo(idx);
  });
  item.addEventListener("keydown", (e) => {
    if (e.target !== item) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigateTo(idx);
    }
  });
});

document.querySelectorAll(".carousel-detail-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault(); // Mencegah aksi bawaan tombol
    e.stopPropagation(); // Mencegah klik "tembus" ke kartu yang memicu foto membesar (Lightbox)

    // Ambil kunci kategori (education, experience, dll) langsung dari HTML
    const key = this.getAttribute("data-about");

    // Cari kartu ini urutan ke-berapa
    const idx = aboutItems.findIndex(
      (item) => item.getAttribute("data-about") === key,
    );

    // Jika posisinya sedang tidak di tengah, putar dulu ke tengah
    if (idx !== -1) {
      navigateTo(idx);
    }

    // Panggil fungsi untuk membuka modal dokumen
    if (typeof openDoc === "function") {
      openDoc(key);
    } else {
      console.error("Fungsi openDoc tidak ditemukan, pastikan tidak terhapus.");
    }
  });
});

document
  .getElementById("aboutPrev")
  ?.addEventListener("click", () => setAboutIndex(absoluteIndex - 1));
document
  .getElementById("aboutNext")
  ?.addEventListener("click", () => setAboutIndex(absoluteIndex + 1));

aboutStage?.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") setAboutIndex(absoluteIndex - 1);
  if (e.key === "ArrowRight") setAboutIndex(absoluteIndex + 1);
});

let aboutTouchStartX = null;
aboutStage?.addEventListener(
  "touchstart",
  (e) => {
    aboutTouchStartX = e.touches[0].clientX;
  },
  { passive: true },
);

aboutStage?.addEventListener(
  "touchend",
  (e) => {
    if (aboutTouchStartX === null) return;
    const diff = e.changedTouches[0].clientX - aboutTouchStartX;
    if (Math.abs(diff) > 40) {
      setAboutIndex(absoluteIndex + (diff < 0 ? 1 : -1));
    }
    aboutTouchStartX = null;
  },
  { passive: true },
);

setAboutIndex(0);

const projectData = {
  iotair: {
    kicker: "IoT • ESP32 • Web",
    title: "Sistem IoT Penghitung dan Pembagian Tagihan Air",
    description:
      "Project ini merupakan tugas akhir yang saya buat berupa sistem monitoring dan perhitungan pemakaian air PDAM pada rumah kos menggunakan MCU ESP32 dan sensor water flow YF-S201. Sistem ini mencatat volume penggunaan air setiap kamar, menghitung tagihan berdasarkan tarif PDAM Tirta Musi, serta melakukan pembagian tagihan sesuai pemakaian masing-masing penghuni pada setiap tanggal 5 setiap bulannya. Seluruh data dapat dipantau melalui website yang dilengkapi sistem multi-role, sehingga pengelola dan penghuni memiliki akses sesuai kebutuhan. Sistem ini menjadi salah satu upaya untuk mengembangkan proses pencatatan dan pengelolaan tagihan air yang sebelumnya dilakukan secara konvensional menjadi digital, lebih transparan, akurat, dan efisien.",
    tags: ["Internet of Things", "Otomisasi", "PDAM", "UMKM"],
    images: [
      "assets/projects/iotair/iot-debit2.jpg",
      "assets/projects/iotair/iot-debit3.jpg",
      "assets/projects/iotair/iot-debit4.jpg",
      "assets/projects/iotair/iot-debit5.jpg",
      "assets/projects/iotair/iot-debit6.jpg",
    ],
  },
  webzoeya: {
    kicker: "Digitalisasi Print • PHP Native",
    title: "Zoeya Print Website",
    description:
      "Project mata kuliah Pemrograman Berbasis Web dengan membangun website Zoeya Print, sebuah website layanan percetakan dengan konsep desain yang simple, clean, dan mudah digunakan. Website ini dikembangkan menggunakan HTML, CSS, PHP Native, Bootstrap, PDF, serta terintegrasi dengan Midtrans untuk mendukung proses pembayaran secara digital. Project ini menjadi salah satu bentuk penerapan pemrograman web dalam membangun sistem yang tidak hanya memiliki tampilan sederhana, tetapi juga dapat mendukung proses pemesanan hingga pembayaran secara lebih praktis dan terstruktur.",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "Bootstrap"],
    images: [
      "assets/projects/webzoeya/zoeya-2.jpg",
      "assets/projects/webzoeya/zoeya-3.jpg",
      "assets/projects/webzoeya/zoeya-4.jpg",
      "assets/projects/webzoeya/zoeya-5.jpg",
    ],
  },
  iotcupang: {
    kicker: "IoT • ESP32 • Blynk",
    title: "Sistem IoT Pakan Ikan Cupang",
    description:
      "Project ini sebagai penilaian nilai uas pada mata kuliah praktek IoT. Sistem iot ini merupakan pakan ikan cupang otomatis yang dilengkapi dengan fitur monitoring kualitas air dan ketersediaan pakan. Sistem ini menggunakan sensor TDS untuk memantau kualitas air, sensor ultrasonik untuk mengetahui ketersediaan pakan, serta motor servo untuk mengatur proses pemberian pakan. Seluruh sistem terhubung dengan Blynk, sehingga pengguna dapat mengatur jadwal pemberian pakan dan memantau kondisi air serta pakan ikan secara real-time melalui perangkat yang terhubung. Project ini menjadi salah satu upaya dalam mengembangkan proses perawatan ikan yang sebelumnya dilakukan secara manual menjadi lebih otomatis, praktis, dan mudah dipantau.",
    tags: ["IoT", "BudidayaIkancupang", "Blynk", "Otomasisasi"],
    images: [
      "assets/projects/iotcupang/iot-cupang2.jpg",
      "assets/projects/iotcupang/iot-cupang3.jpg",
      "assets/projects/iotcupang/iot-cupang4.jpg",
      "assets/projects/iotcupang/iot-cupang5.jpg",
      "assets/projects/iotcupang/iot-cupang6.jpg",
    ],
  },
  jarkom: {
    kicker: "Jarkom • CISCO • Local",
    title: "Management Jaringan Komputer Lokal",
    description:
      "Simulasi manajemen jaringan lokal menggunakan Cisco Packet Tracer dengan menerapkan topologi yang menghubungkan beberapa jaringan pada lokasi berbeda. Setiap jaringan lokal memiliki IP address dan subnet mask masing-masing, seperti jaringan 192.168.1.0/24 hingga 192.168.8.0/24, yang dihubungkan melalui beberapa router menggunakan koneksi serial point-to-point dengan jaringan 10.10.x.0/24. Konfigurasi dilakukan agar setiap router dan perangkat pada jaringan yang berbeda dapat saling berkomunikasi, termasuk menentukan IP address, subnet mask, konfigurasi interface, serta routing menggunakan RIP (Routing Information Protocol) untuk memungkinkan pertukaran informasi rute secara dinamis. Simulasi ini menggambarkan bagaimana beberapa jaringan lokal dapat saling terhubung dan dikelola dalam satu infrastruktur jaringan menggunakan perangkat router, switch, dan PC.",
    tags: ["Configuration", "IP Address", "Cisco"],
    images: [
      "assets/projects/jarkom/jarkom-2.jpg",
      "assets/projects/jarkom/jarkom-3.jpg",
      "assets/projects/jarkom/jarkom-4.jpg",
    ],
  },
};

const projectModal = document.getElementById("projectModal");
const galleryTrack = document.getElementById("gallery");
const galleryWrap = galleryTrack ? galleryTrack.parentElement : null;
const modalTitle = document.getElementById("modalTitle");
const modalKicker = document.getElementById("modalKicker");
const modalDescription = document.getElementById("modalDescription");
const modalTags = document.getElementById("modalTags");

let stopGalleryAutoScroll = null;

function buildGalleryItem(src, alt, gradientIndex) {
  return `
    <div class="gallery-item gradient-${gradientIndex}">
      <img src="${src}" alt="${alt}" decoding="async" onerror="this.style.display='none'; this.parentElement.classList.add('photo-placeholder')">
      <div class="placeholder-content"></div>
    </div>`;
}

function startGalleryAutoScroll(track, wrap) {
  let raf = null;
  let paused = false;
  const halfWidth = () => track.scrollWidth / 2;

  function step() {
    if (!paused) {
      wrap.scrollLeft += 0.6;
      if (wrap.scrollLeft >= halfWidth()) wrap.scrollLeft -= halfWidth();
    }
    raf = requestAnimationFrame(step);
  }
  raf = requestAnimationFrame(step);

  const pause = () => {
    paused = true;
  };
  const resume = () => {
    paused = false;
  };
  wrap.addEventListener("mouseenter", pause);
  wrap.addEventListener("mouseleave", resume);
  wrap.addEventListener("touchstart", pause, { passive: true });
  wrap.addEventListener("touchend", resume);

  return () => {
    cancelAnimationFrame(raf);
    wrap.removeEventListener("mouseenter", pause);
    wrap.removeEventListener("mouseleave", resume);
    wrap.removeEventListener("touchstart", pause);
    wrap.removeEventListener("touchend", resume);
  };
}

function openProject(key) {
  const data = projectData[key];
  modalTitle.textContent = data.title;
  modalKicker.textContent = data.kicker;
  modalDescription.textContent = data.description;
  modalTags.innerHTML = data.tags.map((t) => `<span>${t}</span>`).join("");

  if (stopGalleryAutoScroll) {
    stopGalleryAutoScroll();
    stopGalleryAutoScroll = null;
  }
  if (galleryWrap) galleryWrap.scrollLeft = 0;

  const slides = data.images
    .map((src, i) =>
      buildGalleryItem(
        src,
        `${data.title} - dokumentasi ${i + 1}`,
        (i % 3) + 1,
      ),
    )
    .join("");
  galleryTrack.innerHTML = slides + slides;

  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  if (galleryWrap) {
    requestAnimationFrame(() => {
      stopGalleryAutoScroll = startGalleryAutoScroll(galleryTrack, galleryWrap);
    });
  }
}

document.querySelectorAll(".project-card").forEach((card) => {
  const detailBtn = card.querySelector(".project-detail-link");
  if (detailBtn) {
    detailBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openProject(card.dataset.project);
    });
  }
});

function closeModal(modal) {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (modal === projectModal && stopGalleryAutoScroll) {
    stopGalleryAutoScroll();
    stopGalleryAutoScroll = null;
  }
}
document
  .querySelectorAll("[data-close='project']")
  .forEach((el) =>
    el.addEventListener("click", () => closeModal(projectModal)),
  );

// const skillData = {
//   proteus: {
//     kicker: 'STRUCTURE',
//     title: 'PROTEUS',
//     description:
//       'Menyusun struktur halaman web secara semantik dan rapi, jadi fondasi setiap project yang saya buat.',
//     tags: ['Semantic Markup', 'Accessibility', 'SEO Basics'],
//     images: ['Struktur Halaman', 'Contoh Markup'],
//   },
//   arduinoide: {
//     kicker: 'INTERACTION',
//     title: 'ARDUINOIDE',
//     description:
//       'Menambahkan interaktivitas: navigasi, modal, form, hingga logika dinamis di sisi client.',
//     tags: ['DOM', 'Interactivity', 'Logic'],
//     images: ['Fitur Interaktif', 'Contoh Logic'],
//   },
//   excel: {
//     kicker: 'UI / UX',
//     title: 'EXCEL',
//     description:
//       'Merancang wireframe dan UI sebelum masuk ke tahap coding, supaya alur dan tampilan sudah matang dari awal.',
//     tags: ['Wireframe', 'Prototyping', 'UI Design'],
//     images: ['Wireframe', 'UI Mockup'],
//   },
//   vscode: {
//     kicker: 'DEVELOPMENT',
//     title: 'VS CODE',
//     description:
//       'Editor utama untuk menulis dan merapikan kode sehari-hari, lengkap dengan extension pendukung workflow.',
//     tags: ['Coding', 'Extensions', 'Workflow'],
//     images: ['Setup Editor'],
//   },
//   canva: {
//     kicker: 'CREATIVE',
//     title: 'CANVA',
//     description:
//       'Membuat aset visual pendukung seperti poster, thumbnail, dan materi presentasi dengan cepat.',
//     tags: ['Design Asset', 'Poster', 'Presentation'],
//     images: ['Contoh Poster', 'Materi Presentasi'],
//   },
//   cisco: {
//     kicker: 'VERSIONING',
//     title: 'CISCO',
//     description:
//       'Menyimpan dan mengelola versi project, serta menjadi tempat memamerkan repository dan progres belajar.',
//     tags: ['Version Control', 'Collaboration', 'Portofolio'],
//     images: ['Repository', 'Commit History'],
//   },
// };

const skillModal = document.getElementById("skillModal");
const skillGallery = document.getElementById("skillGallery");
const skillTitle = document.getElementById("skillTitle");
const skillKicker = document.getElementById("skillKicker");
const skillDescription = document.getElementById("skillDescription");
const skillTags = document.getElementById("skillTags");

// function openSkill(key) {
//   const data = skillData[key];
//   if (!data) return;
//   skillTitle.textContent = data.title;
//   skillKicker.textContent = data.kicker;
//   skillDescription.textContent = data.description;
//   skillTags.innerHTML = data.tags.map((t) => `<span>${t}</span>`).join('');
//   skillGallery.innerHTML = data.images
//     .map(
//       (name, i) => `
//     <div class="gallery-item gradient-${(i % 3) + 1}">
//       <div class="gallery-placeholder">${name}<br><small>Ganti dengan tangkapan layar karya kamu</small></div>
//     </div>`,
//     )
//     .join('');
//   skillModal.classList.add('open');
//   skillModal.setAttribute('aria-hidden', 'false');
//   document.body.style.overflow = 'hidden';
// }

// --- Skills: click an icon to show its info in the center, with a dashed
// connector line drawn from the icon to the center panel. ---
const skillsStage = document.querySelector(".skills-stage");
const skillsCenter = document.getElementById("skillsCenter");
const skillsConnectorLine = document.getElementById("skillsConnectorLine");
const skillsCenterInfoCard = document.getElementById("skillsCenterInfoCard");
const skillsCenterInfoTitle = document.getElementById("skillsCenterInfoTitle");
const skillsCenterInfoDesc = document.getElementById("skillsCenterInfoDesc");

// Point where a ray from (centerX, centerY), heading in unit direction
// (dirX, dirY), exits a rectangular box — used so the line touches each
// box's edge exactly, with zero gap, whatever angle it approaches from.
function rectEdgePoint(centerX, centerY, halfW, halfH, dirX, dirY) {
  const epsilon = 0.0001;
  const t = Math.min(
    halfW / Math.max(Math.abs(dirX), epsilon),
    halfH / Math.max(Math.abs(dirY), epsilon),
  );
  return { x: centerX + dirX * t, y: centerY + dirY * t };
}

function updateSkillsConnector(badge) {
  if (!skillsStage || !skillsCenter || !skillsConnectorLine) return;
  const stageRect = skillsStage.getBoundingClientRect();
  const badgeRect = badge.getBoundingClientRect();
  // Connect to the visible center text card (not the outer circle), so the
  // line reaches its actual border with no gap. Fall back to the circle if
  // the card isn't in the DOM for some reason.
  const cardEl = skillsCenterInfoCard;
  const cardRect = cardEl
    ? cardEl.getBoundingClientRect()
    : skillsCenter.getBoundingClientRect();

  const ax = badgeRect.left + badgeRect.width / 2 - stageRect.left;
  const ay = badgeRect.top + badgeRect.height / 2 - stageRect.top;
  const bx = cardRect.left + cardRect.width / 2 - stageRect.left;
  const by = cardRect.top + cardRect.height / 2 - stageRect.top;
  const dx = bx - ax;
  const dy = by - ay;
  const fullDist = Math.sqrt(dx * dx + dy * dy) || 1;
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  const ux = dx / fullDist;
  const uy = dy / fullDist;

  // Use each element's own (untransformed) layout size for the box half
  // extents, so the touch point stays correct even mid cross-fade/scale
  // transition on the center card.
  const badgeHalfW = badge.offsetWidth / 2;
  const badgeHalfH = badge.offsetHeight / 2;
  const cardHalfW = (cardEl ? cardEl.offsetWidth : cardRect.width) / 2;
  const cardHalfH = (cardEl ? cardEl.offsetHeight : cardRect.height) / 2;

  const start = rectEdgePoint(ax, ay, badgeHalfW, badgeHalfH, ux, uy);
  const end = rectEdgePoint(bx, by, cardHalfW, cardHalfH, -ux, -uy);
  const trimmedDist = Math.max(0, Math.hypot(end.x - start.x, end.y - start.y));

  skillsConnectorLine.style.width = `${trimmedDist}px`;
  skillsConnectorLine.style.left = `${start.x}px`;
  skillsConnectorLine.style.top = `${start.y}px`;
  skillsConnectorLine.style.transform = `rotate(${angle}deg)`;
}

function closeSkillInfo() {
  document
    .querySelectorAll(".skill-badge.active-skill")
    .forEach((b) => b.classList.remove("active-skill"));
  if (skillsCenter) skillsCenter.classList.remove("active");
  if (skillsConnectorLine) skillsConnectorLine.classList.remove("visible");
}

document.querySelectorAll(".skill-badge").forEach((badge) => {
  badge.addEventListener("click", (e) => {
    e.stopPropagation();
    const wasActive = badge.classList.contains("active-skill");
    closeSkillInfo();
    if (wasActive) return;
    badge.classList.add("active-skill");
    if (skillsCenterInfoTitle) {
      skillsCenterInfoTitle.textContent =
        badge.dataset.title || badge.dataset.label || "";
    }
    if (skillsCenterInfoDesc) {
      skillsCenterInfoDesc.textContent = badge.dataset.desc || "";
    }
    if (skillsCenter) skillsCenter.classList.add("active");
    updateSkillsConnector(badge);
    if (skillsConnectorLine) skillsConnectorLine.classList.add("visible");
  });
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".skill-badge")) closeSkillInfo();
});
window.addEventListener("resize", () => {
  const activeBadge = document.querySelector(".skill-badge.active-skill");
  if (activeBadge) updateSkillsConnector(activeBadge);
});
document
  .querySelectorAll("[data-close='skill']")
  .forEach((el) => el.addEventListener("click", () => closeModal(skillModal)));

const aboutDocData = {
  education: {
    images: [
      {
        title: "SMAN 11 PALEMBANG (2020-2023) | IPS",
        src: "assets/about/documentation/SMA/education-1.jpg",
        caption:
          "Lulusan SMA Negeri 11 Palembang dari jurusan IPS dengan nilai akhir 86,62. Selama pendidikan, mempelajari berbagai materi seperti ekonomi yang mencakup produksi, distribusi, konsumsi, permintaan dan penawaran, serta pengelolaan keuangan. Sosiologi yang membahas interaksi, kelompok, konflik, dan perubahan sosial. Geografi yang mencakup pemetaan, kependudukan, lingkungan, dan sumber daya alam. Sejarah mengenai perkembangan berbagai peristiwa penting di Indonesia dan dunia. Pembelajaran diterapkan melalui diskusi, presentasi, tugas individu maupun kelompok, serta proyek pembelajaran. Saya juga mahasiswa berprestasi dalam bidang akademik yang mendapatkan juara kelas.",
        detail: [
          "assets/about/documentation/SMA/educ-1.jpg",
          "assets/about/documentation/SMA/educ-2.jpg",
          "assets/about/documentation/SMA/educ-3.jpg",
        ],
      },
      {
        title: "POLITEKNIK NEGERI SRIWIJAYA (2023-2026) | TEKNIK KOMPUTER",
        src: "assets/about/documentation/D3/education-2.jpg",
        caption:
          "Lulusan D3 Politeknik Negeri Sriwijaya, Program Studi Teknik Komputer dengan IPK 3.55. Selama perkuliahan, saya mempelajari berbagai bidang seperti Internet of Things (IoT), Rangkaian Listrik, Sistem Multimedia, Basis Data, Konfigurasi Jaringan, dan Pengembangan Website. Selain kegiatan akademik, saya aktif mengikuti berbagai seminar dan organisasi mahasiswa seperti wps pada divisi camera person yang memiliki jobdesk seperti dokumentasi foto, melakukan liputan, dan pengelolaan hasil dokumentasi.",
        detail: [
          "assets/about/documentation/D3/educ-1.jpg",
          "assets/about/documentation/D3/educ-2.jpg",
          "assets/about/documentation/D3/educ-3.jpg",
          "assets/about/documentation/D3/educ-4.jpg",
          "assets/about/documentation/D3/educ-5.jpg",
          "assets/about/documentation/D3/educ-6.jpg",
        ],
      },
    ],
  },
  experience: {
    images: [
      {
        title: "MAGANG (2025) | PDAM TIRTA MUSI",
        src: "assets/about/documentation/pdam/exp-1.jpg",
        caption:
          "Melaksanakan kegiatan administrasi laporan pencatatan dan pemeriksaan meter pemakaian air pelanggan secara rutin di lapangan. Bertanggung jawab memastikan data angka meter tercatat dengan akurat, melakukan pengecekan kondisi meter, serta menyampaikan hasil pencatatan sesuai prosedur yang berlaku. Selain itu, melakukan perawatan komputer, penginstallan sistem operasi, konektivitas printer komputer, dan konedalam menunjang kelancaran operasional.",
        detail: [
          "assets/about/documentation/pdam/pdam-1.jpg",
          "assets/about/documentation/pdam/pdam-2.jpg",
          "assets/about/documentation/pdam/pdam-3.jpg",
          "assets/about/documentation/pdam/pdam-4.jpg",
          "assets/about/documentation/pdam/pdam-5.jpg",
          "assets/about/documentation/pdam/pdam-6.jpg",
        ],
      },
      {
        title: "UKM (2025) | WPS",
        src: "assets/about/documentation/wps/exp-2.jpg?v=2",
        caption:
          "Salah satu anggota Warta Politeknik Sriwijaya (WPS) pada Divisi Camera Person, sebuah UKM jurnalistik di Politeknik Negeri Sriwijaya yang berperan sebagai wadah informasi dan pengembangan kreativitas mahasiswa di bidang jurnalistik. Dalam menjalankan tugas, bertanggung jawab melakukan dokumentasi foto dan video, meliput berbagai kegiatan kampus, mengoperasikan kamera, menentukan angle dan komposisi gambar, menyeleksi hasil dokumentasi",
        detail: [
          "assets/about/documentation/wps/wps-1.jpg",
          "assets/about/documentation/wps/wps-2.jpg",
          "assets/about/documentation/wps/wps-3.jpg",
          "assets/about/documentation/wps/wps-4.jpg",
        ],
      },
    ],
  },
  achievement: {
    images: [
      {
        title: "TEKNIK KOMPUTER | CUMLAUDE (2026)",
        src: "assets/about/documentation/D3/c-pencapaian.jpg",
        caption:
          "Meraih predikat Cumlaude dengan IPK 3.55 dalam menyelesaikan pendidikan D3 Teknik Komputer di Politeknik Negeri Sriwijaya, sebagai bentuk pencapaian atas kerja keras, disiplin, dan hasil belajar selama masa perkuliahan.",
        detail: [
          "assets/about/documentation/D3/pencapaian-1.jpg",
          "assets/about/documentation/D3/pencapaian-2.jpg",
        ],
      },
      {
        title: "WPS | KOORDINATOR LOMBA FOTOGRAFI (2025)",
        src: "assets/about/documentation/wps/c-pencapaian.jpg",
        caption:
          "Bertanggung jawab menentukan tema, menyusun peraturan dan kriteria penilaian, menentukan mekanisme pendaftaran dan pengumpulan karya, mengatur jadwal kegiatan, berkoordinasi dengan panitia dan peserta, serta memastikan proses perlombaan hingga penilaian berjalan sesuai dengan ketentuan yang telah ditetapkan..",
        detail: [
          "assets/about/documentation/wps/pencapaian-1.jpg",
          // 'assets/about/documentation/wps/pencapaian-1.jpg',
        ],
      },
    ],
  },
  training: {
    images: [
      {
        title: "PT. MICASA EDUKASI INDONESIA (2026) | Microsoft Excel Basic",
        src: "assets/about/documentation/pelatihan/c-excel1.jpg",
        caption:
          "Pelatihan ini membahas dasar-dasar Microsoft Excel dan penerapannya dalam dunia kerja, meliputi pengenalan Excel, peningkatan produktivitas kerja, pengelolaan dan keamanan data, kesalahan umum beserta solusinya, serta praktik penggunaan berbagai formula dasar seperti SUM, AVERAGE, IF, COUNTIF, VLOOKUP, dan XLOOKUP. Pelatihan juga dilengkapi dengan praktik langsung dan studi kasus yang menerapkan fungsi-fungsi Excel dalam situasi kerja nyata, seperti pengolahan data, perhitungan, pencarian data, dan penyusunan informasi secara lebih efektif dan terstruktur.",
      },
      {
        title: "DICODING (2024) | Pelatihan Dasar Pemrograman JavaScript",
        src: "assets/about/documentation/pelatihan/c-dicoding1.jpg",
        caption:
          "Mengidentifikasi penggunaan sintaks yang tepat untuk membuat variabel, menentukan tipe data, menggunakan struktur data seperti Object, Array dan menulis kode JavaScript dengan gaya penulisan yang konsisten, aman, dan teruji.",
      },
      {
        title: "DICODING (2024) | Pelatihan Belajar Dasar AI",
        src: "assets/about/documentation/pelatihan/c-dicoding2.jpg",
        caption:
          "Berkenalan dengan Artificial Intelligence, memaparkan konsep dasar tentang data serta pemanfaatannya dalam pengembangan AI, menjelaskan konsep dasar Machine Learning sebagai bagian dari AI, dan mengidentifikasi konsep penting dalam Deep Learning beserta mengimplementasikan.",
      },
      {
        title: "JASDAM PALEMBANG (2023) | DIKSARLIN",
        src: "assets/about/documentation/pelatihan/c-diksar1.jpg",
        caption:
          "Mengikuti kegiatan Diksarlin di Politeknik Negeri Sriwijaya yang meliputi apel, latihan PBB, kegiatan fisik, pembinaan kedisiplinan, serta kerja sama kelompok untuk membentuk sikap disiplin, tanggung jawab, kekompakan, dan ketangguhan sebagai mahasiswa POLSRI (3T) .",
      },
    ],
  },
  certificate: {
    images: [
      {
        title: "Seminar | Workshop Sistem Kendali Modern 2026",
        src: "assets/about/documentation/sertifikat/c-sertifikat1.jpg",
        caption:
          "Membahas perkembangan teknologi otomasi, pengendalian perangkat secara otomatis, sensor dan aktuator, mikrokontroler, serta penerapan sistem kendali pada berbagai bidang industri. Serta, pemanfaatan teknologi sistem kendali dalam meningkatkan efisiensi dan kemudahan dalam proses kerja.",
      },
      {
        title: "Seminar | Valter Teknik Komputer 2023",
        src: "assets/about/documentation/sertifikat/c-sertifikat2.jpg",
        caption:
          "Membahas perkembangan teknologi Internet of Things (IoT), konektivitas antarperangkat, sensor dan aktuator, mikrokontroler, serta penerapan IoT dalam berbagai bidang industri. Pemanfaatan teknologi IoT dalam menciptakan sistem yang lebih cerdas, terhubung, efisien, dan memudahkan proses kerja di era digital.",
      },
      {
        title: "Seminar | Workshop Machine Learning 2024",
        src: "assets/about/documentation/sertifikat/c-sertifikat3.jpg",
        caption:
          "Membahas perkembangan teknologi Machine Learning, kecerdasan buatan, pengolahan data, algoritma pembelajaran mesin, dan penerapannya dalam berbagai bidang. Serta, pemanfaatan Machine Learning dalam membangun solusi berbasis data yang inovatif, meningkatkan efisiensi proses kerja, dan mendukung perkembangan teknologi di era digital.",
      },
    ],
  },
  // certification: {
  //   images: [
  //     {
  //       title: 'BNSP / LSP | Sertifikasi Kompetensi',
  //       src: 'assets/about/documentation/sertifikasi/c-sertifikasi1.jpg',
  //       caption:
  //         'Sertifikasi kompetensi yang diperoleh melalui uji kompetensi oleh Lembaga Sertifikasi Profesi, sebagai pengakuan resmi bahwa keterampilan yang dimiliki telah memenuhi standar kerja yang berlaku. (Ganti caption ini dengan skema, nomor, dan masa berlaku sertifikasi kamu.)',
  //       detail: ['assets/about/documentation/sertifikasi/sertifikasi-1.jpg'],
  //     },
  //     {
  //       title: 'CISCO NETWORKING ACADEMY | Sertifikasi Jaringan',
  //       src: 'assets/about/documentation/sertifikasi/c-sertifikasi2.jpg',
  //       caption:
  //         'Sertifikasi di bidang jaringan komputer yang mencakup pemahaman topologi, pengalamatan IP, konfigurasi perangkat jaringan, serta praktik simulasi menggunakan Cisco Packet Tracer. (Ganti caption ini sesuai sertifikasi yang kamu miliki.)',
  //       detail: ['assets/about/documentation/sertifikasi/sertifikasi-2.jpg'],
  //     },
  //   ],
  // },
};

const docModal = document.getElementById("docModal");
const docArc = document.getElementById("docArc");
const docTitle = document.getElementById("docTitle");

function openDoc(key) {
  const data = aboutDocData[key];
  if (!data || !data.images) return;

  docTitle.textContent = aboutData[key].title;
  const n = data.images.length;

  // Rumus lengkung asli milikmu 100%
  docArc.innerHTML = data.images
    .map((item, i) => {
      const angle = (i - (n - 1) / 2) * 9;
      const offset = Math.abs(i - (n - 1) / 2) * 16;
      return `
      <div class="doc-arc-item" style="transform:rotate(${angle}deg) translateY(${offset}px)">
        <img src="${item.src}" alt="Dokumentasi ${i + 1}" onerror="this.style.display='none'; this.parentElement.classList.add('photo-placeholder')">
        <button class="doc-detail-btn" data-key="${key}" data-index="${i}">
          Lihat Selengkapnya
        </button>
      </div>`;
    })
    .join("");

  docModal.classList.add("open");
  docModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // Pastikan saat modal baru terbuka posisinya reset ke awal kartu
  requestAnimationFrame(() => {
    docArc.scrollLeft = 0;
  });
}

document
  .querySelectorAll("[data-close='doc']")
  .forEach((el) => el.addEventListener("click", () => closeModal(docModal)));

// --- Documentation photo detail modal -----------------------------------
// Tapping "Lihat Detail" on a documentation photo opens a bigger view of
// that photo plus any extra photos attached to it in aboutDocData.
const docDetailModal = document.getElementById("docDetailModal");
const docDetailTitle = document.getElementById("docDetailTitle");
const docDetailMainImg = document.getElementById("docDetailMainImg");
const docDetailCaption = document.getElementById("docDetailCaption");
const docDetailGallery = document.getElementById("docDetailGallery");

function openDocDetail(key, index) {
  const item = aboutDocData[key].images[index];
  if (!item) return;

  docDetailTitle.textContent = item.title || "";

  docDetailMainImg.onerror = () => {
    docDetailMainImg.style.display = "none";
    docDetailMainImg.parentElement.classList.add("photo-placeholder");
  };
  docDetailMainImg.style.display = "";
  docDetailMainImg.parentElement.classList.remove("photo-placeholder");
  docDetailMainImg.src = item.src;
  docDetailMainImg.alt = `Detail dokumentasi ${index + 1}`;

  docDetailCaption.textContent = item.caption || "";

  const extra = item.detail || [];
  docDetailGallery.innerHTML = extra
    .map(
      (src, i) => `
      <div class="gallery-item">
        <img src="${src}" alt="Foto tambahan ${i + 1}" onerror="this.style.display='none'; this.parentElement.classList.add('photo-placeholder')">
      </div>`,
    )
    .join("");

  docDetailModal.classList.add("open");
  docDetailModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

// Delegated listener because doc-arc-item buttons are re-rendered each
// time openDoc() runs. stopPropagation keeps this from also triggering
// the fullscreen lightbox on the parent photo.
docArc.addEventListener("click", (e) => {
  const btn = e.target.closest(".doc-detail-btn");
  if (!btn) return;
  e.stopPropagation();
  openDocDetail(btn.dataset.key, Number(btn.dataset.index));
});

document
  .querySelectorAll("[data-close='docDetail']")
  .forEach((el) =>
    el.addEventListener("click", () => closeModal(docDetailModal)),
  );
document
  .getElementById("docPrev")
  .addEventListener("click", () =>
    docArc.scrollBy({ left: -260, behavior: "smooth" }),
  );
document
  .getElementById("docNext")
  .addEventListener("click", () =>
    docArc.scrollBy({ left: 260, behavior: "smooth" }),
  );

// --- Fullscreen photo lightbox -----------------------------------------
// Clicking any real photo (profile photo, about card photo, a project's
// documentation gallery photo, or a "Lihat Dokumentasi" photo) opens it
// full-size on top of whatever modal is already open.
const lightboxModal = document.getElementById("lightboxModal");
const lightboxImg = document.getElementById("lightboxImg");

function openLightbox(src, alt) {
  if (!src) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || "Tampilan penuh";
  lightboxModal.classList.add("open");
  lightboxModal.setAttribute("aria-hidden", "false");
}
function closeLightbox() {
  lightboxModal.classList.remove("open");
  lightboxModal.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
}
document
  .querySelectorAll("[data-close='lightbox']")
  .forEach((el) => el.addEventListener("click", closeLightbox));

document.addEventListener("click", (e) => {
  // Detail buttons handle their own click; don't also open the lightbox.
  if (e.target.closest(".doc-detail-btn")) return;
  // The flip icon has its own handler; don't also open the lightbox.
  if (e.target.closest(".photo-flip-btn")) return;
  const wrapper = e.target.closest(
    ".profile-photo, .gallery-item, .doc-arc-item, .doc-detail-main",
  );
  if (!wrapper) return;
  // For the flippable profile photo, show whichever face is currently visible.
  const activeFace = wrapper.classList.contains("flipped")
    ? wrapper.querySelector(".photo-face-back img")
    : wrapper.querySelector(".photo-face-front img") ||
      wrapper.querySelector("img");
  const img = activeFace || wrapper.querySelector("img");
  // Skip broken/placeholder photos — nothing real to show full-size yet.
  if (!img || img.style.display === "none") return;
  e.stopPropagation();
  openLightbox(img.src, img.alt);
});

// --- Profile photo flip --------------------------------------------------
const photoFlipBtn = document.getElementById("photoFlipBtn");
const profilePhoto = document.getElementById("profilePhoto");
if (photoFlipBtn && profilePhoto) {
  photoFlipBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    profilePhoto.classList.toggle("flipped");
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox();
    closeModal(projectModal);
    closeModal(skillModal);
    closeModal(docModal);
    closeModal(docDetailModal);
  }
});

// --- Navbar scroll-spy -------------------------------------------------
// Rebuilt to be reliable: it tracks scroll position directly (instead of
// IntersectionObserver, which could get confused between tall sections and
// leave the highlight stuck on the wrong menu item). Clicking a link also
// updates the highlight immediately so it never looks out of sync with
// where the page actually navigates to.
const sections = Array.from(document.querySelectorAll("main section[id]"));
const navAnchors = Array.from(document.querySelectorAll(".nav-links a"));
const headerOffset = 96;
let manualNavLock = false;
let manualNavTimeout = null;

function setActiveNav(id) {
  navAnchors.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === "#" + id),
  );
}

function updateActiveNavFromScroll() {
  if (manualNavLock || !sections.length) return;
  const scrollPos = window.scrollY + headerOffset;
  let current = sections[0];
  for (const sec of sections) {
    if (sec.offsetTop <= scrollPos) current = sec;
  }
  // Near the bottom of the page, force the last section active.
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 4
  ) {
    current = sections[sections.length - 1];
  }
  setActiveNav(current.id);
}

let scrollSpyTicking = false;
window.addEventListener(
  "scroll",
  () => {
    if (!scrollSpyTicking) {
      scrollSpyTicking = true;
      requestAnimationFrame(() => {
        updateActiveNavFromScroll();
        scrollSpyTicking = false;
      });
    }
  },
  { passive: true },
);
window.addEventListener("resize", updateActiveNavFromScroll);

navAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link.getAttribute("href").replace("#", "");
    setActiveNav(targetId);
    manualNavLock = true;
    clearTimeout(manualNavTimeout);
    manualNavTimeout = setTimeout(() => {
      manualNavLock = false;
      updateActiveNavFromScroll();
    }, 900);
  });
});

updateActiveNavFromScroll();

document.getElementById("year").textContent = new Date().getFullYear();
