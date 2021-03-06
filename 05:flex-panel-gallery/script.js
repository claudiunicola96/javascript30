
function toggleOpen() {
    this.classList.toggle('open');
}

function toggleActive(event) {
    if (event.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => panel.addEventListener('click', toggleOpen));
    panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
});
