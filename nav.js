/* ── Shared nav + mobile menu script ── */
(function () {
  const btn = document.getElementById("nav-menu-btn");
  const links = document.getElementById("nav-links");
  if (btn && links) {
    btn.addEventListener("click", () => links.classList.toggle("open"));
  }

  // Mark active nav link
  const current = window.location.pathname.replace(/\/$/, "") || "/";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href").replace(/\/$/, "") || "/";
    if (current === href || (href !== "/" && current.startsWith(href))) {
      a.classList.add("active");
    }
  });
})();
