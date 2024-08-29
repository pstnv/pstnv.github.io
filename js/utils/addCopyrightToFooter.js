import { getElement } from "./index.js";

// добавить copyright в футер
const footer = getElement(".parFooter");
function addCopyrightToFooter() {
    const today = new Date();
    const year = today.getFullYear();
    footer.textContent = `© ${year} @irinapstnv`;
}
export default addCopyrightToFooter;
