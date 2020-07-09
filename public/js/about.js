import * as page from "../exports.js";

const tl = page.tl;
const content = document.getElementById("content");
const description = document.getElementById("description");
const contact = document.getElementById("contact");
const navbar = document.getElementById("navbar");

navbar.style.display = "flex";
content.style.display = "flex";

content.style.opacity = 0;
contact.style.opacity = 0;
description.style.opacity = 0;
map.style.opacity = 0;

let items = [description, contact, map];

setTimeout(() => {
  content.style.opacity = "1";
  //prettier-ignore
  tl.fromTo( content,1.5,{ marginLeft: '45%', width: "0%"},{marginLeft: "0%", width: "90%", ease: Power3.easeInOut })

  setTimeout(() => {
    for (let i = 0; i < items.length; i++) items[i].style.display = "block";
  }, 1000);

  tl.fromTo(description, 1, { opacity: "0" }, { opacity: "1" })
    .fromTo(contact, 1, { opacity: "0" }, { opacity: "1" }, "-=0.6")
    .fromTo(map, 1, { opacity: "0" }, { opacity: "1" }, "-=0.6");
}, 500);

page.addSearchFunctionality();
page.addPageSwitchFunctionality();
page.addLoginButtonFunctionality();
page.addLoginSubmitFunctionality();
page.addRegButtonFunctionality();
page.addRegSubmitFunctionality();
page.addLogOutButtonFunctionality();
page.removeCover();

particlesJS("particles", {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 789.1476416322727,
      },
    },
    color: {
      value: "#ff0000",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#ff0000",
      },
    },
    opacity: {
      value: 1,
      random: false,
      anim: {
        enable: true,
        speed: 0.2,
        opacity_min: 0.2,
        sync: false,
      },
    },
    size: {
      value: 2,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  retina_detect: true,
});
