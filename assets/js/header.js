document.addEventListener("DOMContentLoaded", () => {
  const headerElement = document.querySelector(".header");
  if (!headerElement) return;

  // جلب اللغة الحالية من الرابط (Query Params) أو الاعتماد على الإنجليزية كافتراضي
  const urlParams = new URLSearchParams(window.location.search);
  let currentLang = urlParams.get("lang") || "en";
  
  // معرفة اسم الصفحة الحالية من الرابط لتفعيل كلاس active على الزر الصحيح
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  function updateURL(lang) {
    const newUrl = `${window.location.pathname}?lang=${lang}`;
    window.history.replaceState({}, "", newUrl);
  }

  function renderHeader() {
    const isAr = currentLang === "ar";

    // البيانات والنصوص كما هي تماماً بدون تغيير أي حرف
    const privacyTxt = isAr ? "سياسة الخصوصية" : "Privacy Policy";
    const termsTxt = isAr ? "شروط الاستخدام" : "Terms of Use";
    const aboutTxt = isAr ? "حول اللعبة" : "About";
    const contactTxt = isAr ? "اتصل بنا" : "Contact";
    const langBtnTxt = isAr ? "English" : "العربية";

    // دالة لفحص وتحديد الرابط النشط وإضافة كلاس active
    const isActive = (pageName) => currentPath === pageName ? "active" : "";

    headerElement.innerHTML = `
      <div class="logo">BLOCK PUZZLE</div>

      <nav class="nav desktop-nav">
          <a href="index.html?lang=${currentLang}" class="nav-link ${isActive('index.html')}">${privacyTxt}</a>
          <a href="terms.html?lang=${currentLang}" class="nav-link ${isActive('terms.html')}">${termsTxt}</a>
          <a href="about.html?lang=${currentLang}" class="nav-link ${isActive('about.html')}">${aboutTxt}</a>
          <a href="contact.html?lang=${currentLang}" class="nav-link ${isActive('contact.html')}">${contactTxt}</a>
          <button id="lang-switcher" class="nav-link">${langBtnTxt}</button>
      </nav>

      <button class="burger-menu" id="burger-toggle">
          <span></span><span></span><span></span>
      </button>

      <div class="sidebar" id="sidebar-menu">
          <nav class="sidebar-nav">
              <a href="index.html?lang=${currentLang}" class="sidebar-link ${isActive('index.html')}">${privacyTxt}</a>
              <a href="terms.html?lang=${currentLang}" class="sidebar-link ${isActive('terms.html')}">${termsTxt}</a>
              <a href="about.html?lang=${currentLang}" class="sidebar-link ${isActive('about.html')}">${aboutTxt}</a>
              <a href="contact.html?lang=${currentLang}" class="sidebar-link ${isActive('contact.html')}">${contactTxt}</a>
              <button id="lang-switcher-mobile" class="sidebar-link">${langBtnTxt}</button>
          </nav>
      </div>

      <div class="sidebar-overlay" id="sidebar-overlay"></div>
    `;

    attachEvents();
  }

  function attachEvents() {
    document.getElementById("lang-switcher")?.addEventListener("click", toggleLang);
    document.getElementById("lang-switcher-mobile")?.addEventListener("click", toggleLang);

    const burger = document.getElementById("burger-toggle");
    const sidebar = document.getElementById("sidebar-menu");
    const overlay = document.getElementById("sidebar-overlay");

    const openMenu = () => {
      sidebar.classList.add("open");
      burger?.classList.add("open"); // 🔥 تم الإصلاح: تفعيل أنميشين علامة X للزر
      overlay.classList.add("active");
      document.body.style.overflow = "hidden"; // منع التمرير خلف القائمة عند الفتح
    };

    const closeMenu = () => {
      sidebar.classList.remove("open");
      burger?.classList.remove("open"); // 🔥 تم الإصلاح: إغلاق علامة X وإرجاع الخطوط الثلاثة
      overlay.classList.remove("active");
      document.body.style.overflow = ""; // إعادة التمرير لطبيعته
    };

    burger?.addEventListener("click", (e) => {
      e.stopPropagation();
      if (sidebar.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay?.addEventListener("click", closeMenu);

    // إغلاق القائمة عند الضغط في أي مكان خارجها
    document.addEventListener("click", (e) => {
      if (sidebar && burger && !sidebar.contains(e.target) && !burger.contains(e.target)) {
        closeMenu();
      }
    });
  }

  function toggleLang() {
    currentLang = currentLang === "en" ? "ar" : "en";
    updateURL(currentLang);
    applyLanguage(currentLang);
    renderHeader();
  }

  function applyLanguage(lang) {
    if (lang === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
      document.querySelectorAll(".lang-en").forEach(e => e.style.display = "none");
      document.querySelectorAll(".lang-ar").forEach(e => e.style.display = "block");
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
      document.querySelectorAll(".lang-ar").forEach(e => e.style.display = "none");
      document.querySelectorAll(".lang-en").forEach(e => e.style.display = "block");
    }
  }

  // تشغيل التهيئة المبدئية
  applyLanguage(currentLang);
  renderHeader();
});
