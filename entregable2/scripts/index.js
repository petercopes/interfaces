const headerCarrousel = document.getElementById("FeaturedGames");
const menuButton = document.getElementById("MenuButton");
const overlayMenu = document.getElementById("OverlayMenu");
const closeSideBarMenuButton = document.getElementById(
  "CloseSidebarMenuButton"
);
const headerGames = [
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

  {
    title: "Outer Worlds",
    img: "assets/games/featured/outerworlds.jpg",
    url: "/page2/index.html",
  },
];

let currentHeaderIndex = 0;

const loadHeaderGame = () => {
  headerCarrousel.innerHTML = "";
  const leftArrowButton = document.createElement("button");
  const leftArrow = document.createElement("img");
  leftArrow.src = "/assets/icons/left-arrow-svgrepo-com.svg";
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
  backgroundImg.classList.add("header-img");
  const gameTitle = document.createElement("h1");
  gameTitle.classList.add("header-game-title");
  gameTitle.innerHTML = headerGames[currentHeaderIndex]?.title;

  headerCarrousel.appendChild(leftArrowButton);
  if (headerGames[currentHeaderIndex].url) {
    const link = document.createElement("a");
    link.href = headerGames[currentHeaderIndex].url;
    link.appendChild(backgroundImg);
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
  console.log("enters");
  overlayMenu.classList.remove("invisible");
};
const closeOverlay = () => {
  console.log("enters2");
  overlayMenu.classList.add("invisible");
};
window.addEventListener("DOMContentLoaded", () => {
  loadHeaderGame();
  menuButton.addEventListener("click", openOverlay);
  closeSideBarMenuButton.addEventListener("click", closeOverlay);
  const gamecards = document.querySelectorAll(".gamecard");
  gamecards.forEach((gamecard) => {
    gamecard.addEventListener("mouseenter", (e) => {
      e.currentTarget.children[0]?.classList.add("visible");
      e.currentTarget.children[2]?.classList.add("visible");
    });
    gamecard.addEventListener("mouseleave", (e) => {
      e.currentTarget.children[0]?.classList.remove("visible");
      e.currentTarget.children[2]?.classList.remove("visible");
    });
  });
});
