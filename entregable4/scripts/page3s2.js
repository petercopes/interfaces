const section2 = document.getElementById("newGameSection2");
const section2text1 = document.getElementById("parallaxtext1");
const section2text2 = document.getElementById("parallaxtext2");
const section2img1 = document.getElementById("parallaxralph1");
const section2img2 = document.getElementById("parallaxralph2");

console.log("hola");
section2.addEventListener("wheel", (e) => {
  console.log("entra");
  console.log("section2img1");
  e.preventDefault();
  e.stopImmediatePropagation();
  if (e.deltaY > 0) {
    section2text1.classList.add("text-to-top-animated");
    section2text2.classList.add("text-to-bottom-animated");
    section2img1.classList.add("text-to-bottom-animated");
    section2img2.classList.add("text-to-top-animated");
    section2text1.classList.remove("text-to-top-animated-back");
    section2text2.classList.remove("text-to-bottom-animated-back");
    section2img1.classList.remove("text-to-bottom-animated-back");
    section2img2.classList.remove("text-to-top-animated-back");
  } else {
    section2text1.classList.add("text-to-top-animated-back");
    section2text2.classList.add("text-to-bottom-animated-back");
    section2img1.classList.add("text-to-bottom-animated-back");
    section2img2.classList.add("text-to-top-animated-back");
    section2text1.classList.remove("text-to-top-animated");
    section2text2.classList.remove("text-to-bottom-animated");
    section2img1.classList.remove("text-to-bottom-animated");
    section2img2.classList.remove("text-to-top-animated");
  }
});
