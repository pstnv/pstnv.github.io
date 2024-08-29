import getElement from "./getElement.js";


// анимировать текст ("В настоящее время я изучаю...")
const studyNowSpanClass = ".studyNowSpan";
const studyNowSpan = getElement(studyNowSpanClass);

function animateStudyNow() {
    studyNowSpan.textContent = "";
    gsap.to(studyNowSpanClass, {
        scrollTrigger: studyNowSpanClass,
        text: "Node.JS, Express.",
        delay: 0.6,
        duration: 3,
        stagger: 0.5,
        ease: "power1",
        // repeat: -1,
        // repeatDelay: -5
    });
}

export default animateStudyNow;