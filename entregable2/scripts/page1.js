const sectionPartial = document.getElementById("contentAsync");
const sectionChat = document.getElementById("chatMessages");
const sendMessageForm = document.getElementById("NewMessageForm");
const nextSectionButton = document.getElementById("nextSection");
const previousSectionButton = document.getElementById("previousSection");
let currentSection = "myGamesSection";
const sections = ["myGamesSection", "myFriendsGamesSection"];

window.addEventListener("DOMContentLoaded", () => {
  loadAsync("myGamesSection");
  for (let section of sections) {
    const sectionButton = document.getElementById(section);
    sectionButton.addEventListener("click", (e) => {
      loadAsync(section);
    });
  }
  nextSectionButton.addEventListener("click", (e) => {
    currentSection === "myGamesSection"
      ? loadAsync("myGamesSection")
      : loadAsync("myFriendsGamesSection");
  });
  previousSectionButton.addEventListener("click", (e) => {
    currentSection === "myGamesSection"
      ? loadAsync("myGamesSection")
      : loadAsync("myFriendsGamesSection");
  });
});
const loadAsync = async (content) => {
  currentSection = content;
  try {
    let res = await fetch(`./page1/${content}.html`);
    let web = await res.text();
    for (let section of sections) {
      const sectionButton = document.getElementById(section);
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
