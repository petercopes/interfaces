const sectionPartial = document.getElementById("newGameAsync");
const nextSectionButton = document.getElementById("nextGameSection");
const previousSectionButton = document.getElementById("previousGameSection");
const menuButton = document.getElementById("MenuButton");
const overlayMenu = document.getElementById("OverlayMenu");
const closeSideBarMenuButton = document.getElementById(
  "CloseSidebarMenuButton"
);
let currentSection = 1;
const sections = [1, 2, 3, 4, 5, 6, 7, 8];

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
window.addEventListener("DOMContentLoaded", () => {
  loadAsyncGameSection(1);
  window.scrollTo(0, 0);
  menuButton.addEventListener("click", openOverlay);
  closeSideBarMenuButton.addEventListener("click", closeOverlay);
  nextSectionButton.addEventListener("click", () => {
    switch (currentSection) {
      case 2:
      case 4:
      case 7:
        document.removeEventListener("wheel", stopScroll, { passive: false });
        loadAsyncGameSection(currentSection + 1);
        break;
      case 6:
      case 5:
      case 3:
      case 1:
        document.addEventListener("wheel", stopScroll, { passive: false });
        loadAsyncGameSection(currentSection + 1);
        break;
      default:
        break;
    }
  });
  previousSectionButton.addEventListener("click", (e) => {
    switch (currentSection) {
      case 4:
      case 6:
        document.removeEventListener("wheel", stopScroll, { passive: false });
        loadAsyncGameSection(currentSection - 1);
        break;
      case 3:
      case 5:
      case 7:
      case 8:
        document.addEventListener("wheel", stopScroll, { passive: false });
        loadAsyncGameSection(currentSection - 1);
        break;
      case 2:
        document.addEventListener("wheel", stopScroll, { passive: false });
        loadAsyncGameSection(currentSection - 1);
        break;
    }
  });
});

const loadAsyncGameSection = async (content) => {
  let oldSection = currentSection;
  currentSection = content;
  if (currentSection == 1) {
    previousSectionButton.classList.add("hidden");
    nextSectionButton.classList.contains("hidden") &&
      nextSectionButton.classList.remove("hidden");
  } else if (currentSection == 8) {
    nextSectionButton.classList.add("hidden");
    previousSectionButton.classList.contains("hidden") &&
      previousSectionButton.classList.remove("hidden");
  } else {
    previousSectionButton.classList.contains("hidden") &&
      previousSectionButton.classList.remove("hidden");
    nextSectionButton.classList.contains("hidden") &&
      nextSectionButton.classList.remove("hidden");
  }

  try {
    let res = await fetch(`./../page3/section${content}.html`);
    let web = await res.text();

    sectionPartial.innerHTML = web;
    if (currentSection == 1 && currentSection == oldSection) {
      sectionPartial.firstElementChild.classList.add("ease-in-1");
      document.addEventListener("wheel", stopScroll, { passive: false });
      setTimeout(() => {
        sectionPartial.firstElementChild.classList.remove("ease-in-1");
      }, 1000);
    } else {
      if (oldSection > currentSection) {
        sectionPartial.firstElementChild.classList.remove("animatedown");
        sectionPartial.firstElementChild.classList.add("animateup");
      } else {
        sectionPartial.firstElementChild.classList.remove("animateup");
        sectionPartial.firstElementChild.classList.add("animatedown");
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const stopScroll = (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
};
const limitScroll = (e, indexVisibleSection) => {
  console.log(e);
  if (indexVisibleSection == 2) {
    console.log(e.pageY);
    console.log(window.pageYOffset);
    console.log(window);
    if (
      window.pageYOffset <= 1950 &&
      window.pageYOffset + e.deltaY < window.pageYOffset
    ) {
      //stopScroll(e);
      window.scrollTo({ top: 1650, left: 0, behavior: "auto" });
    } else if (
      window.pageYOffset >= 2600 &&
      window.pageYOffset + e.deltaY >= 2600
    ) {
      window.scrollTo({ top: 2380, left: 0, behavior: "auto" });
    }
  }
};
