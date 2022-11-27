const sectionPartial = document.getElementById("newGameAsync");
const nextSectionButton = document.getElementById("nextGameSection");
const previousSectionButton = document.getElementById("previousGameSection");
const menuButton = document.getElementById("MenuButton");
const menuItems = document.querySelectorAll(".nav-menu-items li");
const overlayMenu = document.getElementById("OverlayMenu");
const nav = document.getElementById("NavBar");
const closeSideBarMenuButton = document.getElementById(
  "CloseSidebarMenuButton"
);
let currentSection = 1;
const sections = [1, 2, 3, 4, 5, 6, 7, 8];
const tiptipIntro = (e) => {
  const tiptipspaceship = document.getElementById("tiptipspaceship");
  const section4title = document.getElementById("section4title");
  console.log("pepito");
  e.preventDefault();
  if (e.deltaY > 0) {
    section4title.classList.add("to-top-1-nodelay");
    tiptipspaceship.classList.add("spaceshipenters");
    tiptipspaceship.classList.remove("spaceshipout");
    if (section4title.classList.contains("text-to-top")) {
      section4title.classList.remove("text-to-top");
      section4title.classList.remove("text-to-top-animated");
      section4title.classList.add("to-top-1-nodelay");
    }
  } else {
    if (tiptipspaceship.classList.contains("spaceshipenters")) {
      section4title.classList.add("text-to-top");
      section4title.classList.add("text-to-top-animated");
      tiptipspaceship.classList.remove("spaceshipenters");
      tiptipspaceship.classList.add("spaceshipleaves");
    }
  }
};
const ralphParallax = (e) => {
  const section2text1 = document.getElementById("parallaxtext1");
  const section2text2 = document.getElementById("parallaxtext2");
  const section2img1 = document.getElementById("parallaxralph1");
  const section2img2 = document.getElementById("parallaxralph2");
  const section2title = document.getElementById("section2Title");
  console.log("entra");
  e.preventDefault();
  e.stopImmediatePropagation();
  if (e.deltaY > 0) {
    section2text1.classList.add("text-to-top-animated");
    section2text2.classList.add("text-to-bottom-animated");
    section2text1.classList.remove("text-to-top-animated-back");
    section2text2.classList.remove("text-to-bottom-animated-back");
    section2title.classList.remove("text-pulse");
    section2title.classList.add("text-pulse");
    setTimeout(() => {
      section2title.classList.remove("text-pulse");
    }, 1000);

    section2img2.classList.add("text-to-top-animated-back");
    section2img1.classList.add("text-to-bottom-animated-back");
    section2img2.classList.remove("text-to-bottom-animated");
    section2img1.classList.remove("text-to-top-animated");
  } else {
    section2text1.classList.add("text-to-top-animated-back");
    section2text2.classList.add("text-to-bottom-animated-back");
    section2title.classList.remove("text-pulse");
    section2title.classList.add("text-pulse");
    setTimeout(() => {
      section2title.classList.remove("text-pulse");
    }, 1000);

    section2img2.classList.remove("text-to-top-animated-back");
    section2img1.classList.remove("text-to-bottom-animated-back");
    section2img2.classList.remove("text-to-bottom");
    section2img1.classList.remove("text-to-top");
    section2img2.classList.add("text-to-top");
    section2img1.classList.add("text-to-bottom");
    section2img2.classList.add("text-to-top-animated");
    section2img1.classList.add("text-to-bottom-animated");

    //section2img1.classList.add("text-to-top-animated");
    //section2img2.classList.add("text-to-bottom-animated");
  }
};
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
const cardsScroll = (e) => {
  const spacecard1 = document.getElementById("spacecard1");
  const spacecard2 = document.getElementById("spacecard2");
  const spacecard3 = document.getElementById("spacecard3");
  const spacecard4 = document.getElementById("spacecard4");
  let pos = e.target.offsetTop;
  console.log(e);
  if (pos < 350) {
    spacecard1.classList.add("enlarge-pulse");
    spacecard2.classList.remove("enlarge-pulse");
    spacecard3.classList.remove("enlarge-pulse");
    spacecard4.classList.remove("enlarge-pulse");
  } else {
    spacecard1.classList.remove("enlarge-pulse");
    spacecard2.classList.remove("enlarge-pulse");
    spacecard3.classList.remove("enlarge-pulse");
    spacecard4.classList.remove("enlarge-pulse");
    if (pos < 800) {
      spacecard2.classList.add("enlarge-pulse");
    } else {
      spacecard1.classList.remove("enlarge-pulse");
      spacecard2.classList.remove("enlarge-pulse");
      spacecard3.classList.remove("enlarge-pulse");
      spacecard4.classList.remove("enlarge-pulse");
      if (pos < 1400) {
        spacecard3.classList.add("enlarge-pulse");
        spacecard4.classList.remove("enlarge-pulse");
      } else {
        spacecard3.classList.remove("enlarge-pulse");
        spacecard4.classList.add("enlarge-pulse");
      }
    }
  }
};
window.addEventListener("DOMContentLoaded", () => {
  loadAsyncGameSection(1);
  window.scrollTo(0, 0);
  /* sectionPartial.addEventListener("wheel", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (e.deltaY > 0) {
      console.log("nextsec");
    } else {
      console.log("previousec");
    }
  }); */
  menuButton.addEventListener("click", () => {
    //openOverlay();
    if (menuButton.classList.contains("open")) {
      console.log("cerrar");
      overlayMenu.classList.add("ease-out-0-5");
      menuButton.classList.remove("open");
      for (let item of menuItems) {
        item.classList.remove("slide-item");
      }
      setTimeout(() => {
        overlayMenu.classList.remove("ease-in-0-5");
      }, 0);
    } else {
      overlayMenu.classList.add("ease-in-0-5");
      menuButton.classList.add("open");
      console.log(menuItems);
      let count = 0;
      for (let item of menuItems) {
        count++;
        setTimeout(() => {
          item.classList.add("slide-item");
        }, 250 * count);
      }
      setTimeout(() => {
        overlayMenu.classList.remove("ease-out-0-5");
      }, 0);
    }
  });
  nextSectionButton.addEventListener("click", async () => {
    console.log(currentSection);
    switch (currentSection) {
      case 4:
      case 2:
      case 7:
        document.removeEventListener("wheel", ralphParallax);
        sectionPartial.removeEventListener("mousewheel", tiptipIntro);
        document.removeEventListener("wheel", stopScroll, { passive: false });
        await loadAsyncGameSection(currentSection + 1);
        if (currentSection == 3 || currentSection == 5) {
          const bgContainer = document.getElementById("divBg");
          bgContainer.addEventListener("wheel", cardsScroll);
        }
        break;
      case 6:
      case 5:
        sectionPartial.removeEventListener("mousewheel", tiptipIntro);
        document.addEventListener("wheel", stopScroll, { passive: false });
        document.removeEventListener("wheel", ralphParallax);
        await loadAsyncGameSection(currentSection + 1);
        break;
      case 3:
        document.addEventListener("wheel", stopScroll, { passive: false });
        await loadAsyncGameSection(currentSection + 1);
        console.log("pepitoentra");
        sectionPartial.addEventListener("mousewheel", tiptipIntro);
        document.removeEventListener("wheel", ralphParallax);
        break;
      case 1:
        sectionPartial.removeEventListener("mousewheel", tiptipIntro);
        document.addEventListener("wheel", stopScroll, { passive: false });
        await loadAsyncGameSection(currentSection + 1);
        const section2 = document.getElementById("newGameSection2");
        section2.addEventListener("wheel", ralphParallax);
        break;
      default:
        break;
    }
  });

  previousSectionButton.addEventListener("click", async (e) => {
    console.log(currentSection);
    switch (currentSection) {
      case 4:
        document.removeEventListener("wheel", stopScroll, { passive: false });
        await loadAsyncGameSection(currentSection - 1);
        sectionPartial.removeEventListener("mousewheel", tiptipIntro);
        if (currentSection == 3) {
          const bgContainer = document.getElementById("divBg");
          bgContainer.addEventListener("wheel", cardsScroll);
        }
        break;
      case 6:
        document.removeEventListener("wheel", stopScroll, { passive: false });
        await loadAsyncGameSection(currentSection - 1);
        if (currentSection == 5) {
          const bgContainer = document.getElementById("divBg");
          bgContainer.addEventListener("wheel", cardsScroll);
        }
        break;
      case 3:
        await loadAsyncGameSection(currentSection - 1);
        const section2prev3 = document.getElementById("newGameSection2");
        section2prev3.addEventListener("wheel", ralphParallax);
        break;
      case 5:
        await loadAsyncGameSection(currentSection - 1);
        sectionPartial.addEventListener("mousewheel", tiptipIntro);
        document.addEventListener("wheel", stopScroll, { passive: false });
        break;
      case 7:
      case 8:
        document.addEventListener("wheel", stopScroll, { passive: false });
        await loadAsyncGameSection(currentSection - 1);
        break;
      case 2:
        console.log("previosu", currentSection);
        document.addEventListener("wheel", stopScroll, { passive: false });
        await loadAsyncGameSection(currentSection - 1);
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

window.addEventListener("wheel", () => {
  if (window.scrollY != 0) {
    if (!nav.classList.contains("small")) {
      nav.classList.add("small");
    }
  } else if (nav.classList.contains("small")) {
    nav.classList.remove("small");
  }
});
nav.addEventListener("mouseenter", () => {
  nav.classList.remove("small");
});
nav.addEventListener("mouseleave", () => {
  if (!nav.classList.contains("small") && window.scrollY != 0) {
    nav.classList.add("small");
  }
});
