function scrollToTop() {
    window.scrollTo({ top: 0 }) ||
        document.documentElement.scrollTo({ top: 0 });
}

export default scrollToTop;
