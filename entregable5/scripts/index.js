const headerCarrousel = document.getElementById("FeaturedGames");
const menuButton = document.getElementById("MenuButton");
const menuItems = document.querySelectorAll(".nav-menu-items li");
const overlayMenu = document.getElementById("OverlayMenu");
const percentage = document.getElementById("percentage");

const carousels = document.getElementsByClassName("carrousel flex");
console.log(carousels);
for (let carrousel of carousels) {
  console.log(carrousel);
  let cards = carrousel.children;
  console.log(cards);

  carrousel.addEventListener("wheel", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();

    if (e.deltaX > 0) {
      console.log("entra der");
      carrousel.classList.remove("carousel-to-left");

      carrousel.classList.add("carousel-to-right");
      for (let card of cards) {
        card.classList.add("rotateCard");
        setTimeout(() => {
          card.classList.remove("rotateCard");
        }, 1100);
      }
    } else {
      console.log("entra lef");
      carrousel.classList.remove("carousel-to-right");

      carrousel.classList.add("carousel-to-left");
      for (let card of cards) {
        card.classList.add("rotateCardLeft");
        setTimeout(() => {
          card.classList.remove("rotateCardLeft");
        }, 1100);
      }
    }
  });
}
const closeSideBarMenuButton = document.getElementById(
  "CloseSidebarMenuButton"
);
const nav = document.getElementById("NavBar");
const backdropSection = document.getElementById("backdropSection");
const headerGames = [
  {
    title: "Outer Worlds",
    img: "assets/games/featured/outerworlds.jpg",
    url: "page3/index.html",
  },
  {
    title: "The Last Of Us Part 1",
    img: "assets/games/featured/lastofus.jpeg",
  },
  {
    title: "Elden Ring",
    img: "assets/games/featured/eldenring.jpeg",
    url: "",
  },
  {
    title: "Hogwarts Legacy",
    img: "assets/games/featured/hogwarts.jpeg",
    url: "",
  },
];

let currentHeaderIndex = 0;

const loadHeaderGame = () => {
  headerCarrousel.innerHTML = "";
  const leftArrowButton = document.createElement("button");
  const leftArrow = document.createElement("img");
  leftArrow.src = "assets/icons/left-arrow-svgrepo-com.svg";
  leftArrow.classList.add("left", "icon-xl", "white", "absolute");

  leftArrowButton.appendChild(leftArrow);
  leftArrowButton.onclick = () =>
    handleCarrousel(
      currentHeaderIndex === 0 ? headerGames.length - 1 : currentHeaderIndex - 1
    );
  const rightArrowButton = document.createElement("button");
  const rightArrow = document.createElement("img");
  rightArrow.src = leftArrow.src;
  rightArrow.classList.add(
    "icon-xl",
    "white",
    "absolute",
    "right",
    "rotated-180"
  );
  rightArrowButton.appendChild(rightArrow);
  rightArrowButton.onclick = () =>
    handleCarrousel(
      currentHeaderIndex === headerGames.length - 1 ? 0 : currentHeaderIndex + 1
    );

  const backgroundImg = document.createElement("img");
  backgroundImg.setAttribute("src", headerGames[currentHeaderIndex]?.img);
  backgroundImg.classList.add("header-img", "ease-in-1");
  const gameTitle = document.createElement("h1");
  gameTitle.classList.add("header-game-title");
  gameTitle.innerHTML = headerGames[currentHeaderIndex]?.title;

  headerCarrousel.appendChild(leftArrowButton);
  if (headerGames[currentHeaderIndex].url) {
    const linkContainer = document.createElement("div");
    linkContainer.classList.add("text-box");

    const link = document.createElement("a");
    link.classList.add(
      "btn",
      "btn-white",
      "btn-animate",
      "absolute",
      "centered"
    );
    const seeMore = document.createElement("h2");
    seeMore.classList.add("ph-10");
    seeMore.innerText = "See More";
    link.appendChild(seeMore);
    link.href = headerGames[currentHeaderIndex].url;
    headerCarrousel.appendChild(backgroundImg);
    headerCarrousel.appendChild(link);
  } else {
    headerCarrousel.appendChild(backgroundImg);
  }
  headerCarrousel.appendChild(gameTitle);
  headerCarrousel.appendChild(rightArrowButton);
};

const handleCarrousel = (nextIndex) => {
  currentHeaderIndex = nextIndex;
  loadHeaderGame();
};

const openOverlay = () => {
  overlayMenu.classList.add("ease-in-1");
  menuButton.classList.add("open");

  setTimeout(() => {
    overlayMenu.classList.remove("ease-out-1");
  }, 0);
};
const closeOverlay = () => {
  overlayMenu.classList.add("ease-out-1");
  menuButton.classList.remove("open");

  setTimeout(() => {
    overlayMenu.classList.remove("ease-in-1");
  }, 0);
};
window.addEventListener("DOMContentLoaded", () => {
  hideSpinner();
  loadHeaderGame();
  menuButton.addEventListener("click", () => {
    //openOverlay();
    if (menuButton.classList.contains("open")) {
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
  overlayMenu.addEventListener("click", (e) => {
    if (!overlayMenu.children[0].contains(e.target)) {
      closeOverlay();
    }
  });

  const gamecards = document.querySelectorAll(".gamecard");
  gamecards.forEach((gamecard) => {
    gamecard.addEventListener("mouseenter", (e) => {
      const gameTitle = e.currentTarget.children[2];
      const overlay = e.currentTarget.children[0];
      gameTitle?.classList.add("visible");
      overlay?.classList.contains("ease-out-fast") &&
        overlay?.classList.remove("ease-out-fast");
      overlay?.classList.add("ease-in-fast");
    });
    gamecard.addEventListener("mouseleave", (e) => {
      const gameTitle = e.currentTarget.children[2];
      const overlay = e.currentTarget.children[0];
      gameTitle?.classList.remove("visible");
      overlay?.classList.contains("ease-in-fast") &&
        overlay?.classList.remove("ease-in-fast");
      overlay?.classList.add("ease-out-fast");
    });
    if (gamecard.classList.contains("borderPremium")) {
      gamecard.addEventListener("click", (e) => {
        openBuyModal(e, gamecard);
      });
    }
  });
});
const hideSpinner = async () => {
  let counter = 0;
  let interval = setInterval(() => {
    counter++;
    percentage.innerHTML = counter;
    if (counter == 100) {
      clearInterval(interval);
      backdropSection.classList.add("ease-out-1");
      return;
    }
  }, 40);
  setTimeout(() => {
    backdropSection.classList.add("invisible");
    backdropSection.children[0].classList.add("invisible");
    backdropSection.addEventListener("click", (e) => {
      closeBackDrop(e);
    });
  }, 5000);
};
const closeBackDrop = (e) => {
  if (!backdropSection.children[1].contains(e.target)) {
    backdropSection.classList.add("ease-out-1");
    setTimeout(() => {
      backdropSection.classList.remove("ease-in-1");
    }, 0);
    setTimeout(() => {
      backdropSection.classList.add("invisible");
    }, 1);
    setTimeout(() => {
      backdropSection.classList.add("hidden");
    }, 1000);
  }
};
const openBuyModal = (e, gamecard) => {
  backdropSection.classList.remove("invisible");
  backdropSection.classList.remove("hidden");

  backdropSection.classList.add("ease-in-1");
  backdropSection.children[1].classList.add("ease-in-1");
  setTimeout(() => {
    backdropSection.classList.remove("ease-out-1");
    backdropSection.classList.remove("ease-out");
    backdropSection.children[1].classList.remove("ease-out-1");
  }, 0);
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
