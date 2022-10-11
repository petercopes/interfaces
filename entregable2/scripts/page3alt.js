const main = document.getElementById("main");
const menuButton = document.getElementById("MenuButton");
const overlayMenu = document.getElementById("OverlayMenu");
const closeSideBarMenuButton = document.getElementById(
  "CloseSidebarMenuButton"
);
window.addEventListener("DOMContentLoaded", () => {
  menuButton.addEventListener("click", openOverlay);
  closeSideBarMenuButton.addEventListener("click", closeOverlay);
});

const openOverlay = () => {
  overlayMenu.classList.add("ease-in-1");

  setTimeout(() => {
    overlayMenu.classList.remove("ease-out-1");
  }, 0);
};
const closeOverlay = () => {
  overlayMenu.classList.add("ease-out-1");
  setTimeout(() => {
    overlayMenu.classList.remove("ease-in-1");
  }, 0);
};
const activateNavigation = () => {
  const sections = document.querySelectorAll(".game-section");
  const sectionControllers = document.querySelectorAll(".section-controller");
  const sectionIds = Array.from(sections).map((section) => section.id);

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSection = entries.filter((entry) => entry.isIntersecting)[0]
        ?.target.id;
      const indexVisibleSection = sectionIds.indexOf(visibleSection);
      sectionControllers[0].setAttribute(
        "href",
        `#${sectionIds[indexVisibleSection - 1]}`
      );
      sectionControllers[1].setAttribute(
        "href",
        `#${sectionIds[indexVisibleSection + 1]}`
      );
      if (indexVisibleSection === 0) {
        sectionControllers[0].classList.add("hidden");
        sectionControllers[1].classList.remove("hidden");
        document.addEventListener("wheel", stopScroll, { passive: false });
      } else if (indexVisibleSection === 2 || indexVisibleSection === 4) {
        //sectionControllers[1].classList.add("hidden");
        //sectionControllers[2].classList.remove("hidden");
        sectionControllers[0].classList.contains("hidden") &&
          sectionControllers[0].classList.remove("hidden");
        sectionControllers[1].classList.contains("hidden") &&
          sectionControllers[1].classList.remove("hidden");
        document.removeEventListener("wheel", stopScroll, { passive: false });
        document.addEventListener(
          "wheel",
          (e) => {
            limitScroll(e, indexVisibleSection);
          },
          { passive: false }
        );
      } else if (indexVisibleSection === 7) {
        sectionControllers[1].classList.add("hidden");
      } else {
        sectionControllers[0].classList.remove("hidden");
        sectionControllers[1].classList.remove("hidden");
        document.addEventListener("wheel", stopScroll, { passive: false });
      }
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => observer.observe(section));
};
activateNavigation();
