var basicTimeline = anime.timeline({
  autoplay: false,
});
const textButtons = document.querySelectorAll(".text");
var pathEls = document.querySelectorAll(".check");
console.log(pathEls);

for (var i = 0; i < pathEls.length; i++) {
  var pathEl = pathEls[i];
  console.log(pathEl);

  var offset = anime.setDashoffset(pathEl);
  pathEl.setAttribute("stroke-dashoffset", offset);
}

basicTimeline

  .add({
    targets: ".buyButton",
    duration: 1,
    width: 150,
  })
  .add({
    targets: ".buyButton",
    duration: 1,
    opacity: "0",
  })
  .add({
    targets: ".buyButtonAnimated",
    duration: 1300,
    height: 10,
    width: 150,
    backgroundColor: "#2B2D2F",
    border: "0",
    borderRadius: 100,
  })
  .add({
    targets: ".progress-bar",
    duration: 0,
    backgroundColor: "#00d9ff",
  })
  .add({
    targets: ".progress-bar",
    duration: 2000,
    width: 150,
    easing: "linear",
    backgroundColor: "#00d9ff",
  })
  .add({
    targets: ".buyButtonAnimated",
    duration: 100,
    height: 0,
    width: 0,
  })
  .add({
    targets: ".buyButton",
    width: 0,
    duration: 1,
  })
  .add({
    targets: ".progress-bar",
    width: 80,
    height: 80,
    delay: 500,
    duration: 750,
    borderRadius: 80,
    backgroundColor: "#71DFBE",
  })
  .add({
    targets: pathEl,
    strokeDashoffset: [offset, 0],
    duration: 200,
    easing: "easeInOutSine",
  })
  .add({
    targets: pathEl,
    opacity: 0,
    delay: 500,
    duration: 500,
  })
  .add({
    targets: ".progress-bar",
    width: 0,
    height: 0,
    duration: 750,
    backgroundColor: "#71DFBE",
  })
  .add({
    targets: ".buyButtonAnimatedContainer",
    width: 0,
    height: 0,
    duration: 100,
  });

document.querySelectorAll(".buyButtonAnimated").forEach(function (element) {
  element.addEventListener("click", () => {
    basicTimeline.play();
  });
});

document.querySelectorAll(".buyButton").forEach(function (element) {
  element.addEventListener("click", () => {
    basicTimeline.play();
  });
});

document.querySelectorAll(".activate").forEach(function (element) {
  element.addEventListener("click", () => {
    basicTimeline.play();
    setTimeout(() => {
      console.log("hey");
      backdropSection.classList.add("ease-out");
      setTimeout(() => {
        backdropSection.classList.remove("ease-in-1");
      }, 0);
      setTimeout(() => {
        backdropSection.classList.add("hidden");
      }, 50);
    }, 6250);
  });
});
