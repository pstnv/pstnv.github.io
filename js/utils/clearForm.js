import getElement from "./getElement.js";
const form = getElement("form");

// при переходе со страницы форма будет очищена
function clearForm() {
    window.addEventListener("unload", () => {
        form.reset();
    });
}

export default clearForm;
