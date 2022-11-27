const sectionPartial = document.getElementById("contentAsync");
const sectionChat = document.getElementById("chatMessages");
const sendMessageForm = document.getElementById("NewMessageForm");
const nextSectionButton = document.getElementById("nextSection");
const previousSectionButton = document.getElementById("previousSection");
const menuButton = document.getElementById("MenuButton");
const overlayMenu = document.getElementById("OverlayMenu");
const closeSideBarMenuButton = document.getElementById(
  "CloseSidebarMenuButton"
);
let currentSection = "info";
const sections = ["info", "rules", "gallery"];
const messages = [
  { user: "jjInTheSky", message: "wooooooooo" },
  { user: "robin13", message: "so coool" },
  { user: "MarkRamks", message: "cant wait for this game omg!!!" },
  {
    user: "bbyAmbsss",
    message: "does anyone know when this be out??? i need it",
  },
  { user: "RickMorty11", message: "dammmmmmmmm" },
  { user: "gr982", message: "cant wait for this game omg!!!" },
  { user: "emma203", message: "this game is littttt bruh" },
  { user: "minnie28", message: "omg omg omgggg" },
  { user: "barbzzzz", message: "this looks awesoomeeee" },
  { user: "Jeannn", message: "i wanna play it now" },
];
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
  loadAsync("info");
  menuButton.addEventListener("click", openOverlay);
  closeSideBarMenuButton.addEventListener("click", closeOverlay);
  for (let section of sections) {
    const sectionButton = document.getElementById(`GameInfoSection${section}`);
    sectionButton.addEventListener("click", (e) => {
      e.preventDefault();
      loadAsync(section);
    });
  }
  loadChat();
  sendMessageForm.addEventListener("submit", publishComment);
  nextSectionButton.addEventListener("click", (e) => {
    currentSection === "info"
      ? loadAsync("rules")
      : currentSection === "rules"
      ? loadAsync("gallery")
      : loadAsync("info");
  });
  previousSectionButton.addEventListener("click", (e) => {
    currentSection === "info"
      ? loadAsync("gallery")
      : currentSection === "rules"
      ? loadAsync("info")
      : loadAsync("rules");
  });
});

const publishComment = (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  let formData = new FormData(e.target);
  let newMessage = {
    user: "Peter96",
    message: formData.get("newMessage"),
  };
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);

  sectionChat.innerHTML += `<p class="chatEntry" ><span style="color:#${randomColor}">${newMessage.user}:</span> ${newMessage.message}</p>`;
};

const loadAsync = async (content) => {
  currentSection = content;
  try {
    let res = await fetch(`${content}.html`);
    let web = await res.text();
    for (let section of sections) {
      const sectionButton = document.getElementById(
        `GameInfoSection${section}`
      );
      section == content
        ? sectionButton.classList.add("icon-xs")
        : sectionButton.classList.contains("icon-xs") &&
          sectionButton.classList.remove("icon-xs");
    }
    sectionPartial.innerHTML = web;
  } catch (error) {
    console.log(error);
  }
};
const loadChat = () => {
  for (message of messages) {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const userName = document.createElement("span");

    sectionChat.innerHTML += `<p class="chatEntry" ><span style="color:#${randomColor}">${message.user}:</span> ${message.message}</p>`;
  }
};
