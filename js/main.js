/* ==========================================================================
   Ríos de Agua Viva — Lógica de la landing (JS nativo, sin dependencias)
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     CONFIGURACIÓN
     Reemplaza RELEASE_DATE con la fecha real en formato dd/mm/aaaa.
     RELEASE_TIME es la hora local de lanzamiento (24 h).
     ------------------------------------------------------------------ */
  const RELEASE_DATE = "01/11/2026"; // Formato dd/mm/aaaa
  const RELEASE_TIME = "00:00";

  /* ------------------------------------------------------------------
     CONTEO REGRESIVO
     ------------------------------------------------------------------ */
  const els = {
    days:  document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    mins:  document.getElementById("cd-mins"),
    secs:  document.getElementById("cd-secs"),
    timer: document.getElementById("countdown"),
    done:  document.getElementById("released-msg"),
    dateText: document.getElementById("release-date-text"),
  };

  /** Convierte "dd/mm/aaaa" + "hh:mm" en un objeto Date (hora local). */
  function parseDate(dateStr, timeStr) {
    const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(dateStr.trim());
    if (!m) return null;
    const [hh, mm] = timeStr.split(":").map(Number);
    return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]), hh || 0, mm || 0, 0);
  }

  const pad = (n) => String(n).padStart(2, "0");
  const target = parseDate(RELEASE_DATE, RELEASE_TIME);
  let intervalId = null;

  function render() {
    const diff = target - Date.now();

    if (diff <= 0) {
      clearInterval(intervalId);
      els.timer.hidden = true;
      els.done.hidden = false;
      return;
    }

    const s = Math.floor(diff / 1000);
    els.days.textContent  = pad(Math.floor(s / 86400));
    els.hours.textContent = pad(Math.floor((s % 86400) / 3600));
    els.mins.textContent  = pad(Math.floor((s % 3600) / 60));
    els.secs.textContent  = pad(s % 60);
  }

  if (target) {
    els.dateText.textContent = RELEASE_DATE;
    render();
    intervalId = setInterval(render, 1000);
  } else {
    console.warn("[Pre-save] RELEASE_DATE no es válida. Usa el formato dd/mm/aaaa en js/main.js");
  }

  /* ------------------------------------------------------------------
     MODAL DEL TEASER (YouTube)
     El iframe se crea solo al abrir: la página carga más rápido y
     el video se detiene al cerrar (se elimina el iframe).
     ------------------------------------------------------------------ */
  const openBtn   = document.getElementById("open-teaser");
  const modal     = document.getElementById("teaser-modal");
  const container = document.getElementById("video-container");
  let lastFocus = null;

  function openModal() {
    const id = openBtn.dataset.videoId;
    lastFocus = document.activeElement;

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    iframe.title = "Teaser — Ríos de Agua Viva";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    container.appendChild(iframe);

    modal.hidden = false;
    document.body.classList.add("no-scroll");
    modal.querySelector(".modal-close").focus();
  }

  function closeModal() {
    modal.hidden = true;
    container.innerHTML = "";
    document.body.classList.remove("no-scroll");
    if (lastFocus) lastFocus.focus();
  }

  openBtn.addEventListener("click", openModal);
  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  /* ------------------------------------------------------------------
     AÑO DINÁMICO EN EL FOOTER
     ------------------------------------------------------------------ */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
