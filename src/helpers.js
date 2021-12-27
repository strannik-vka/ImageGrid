// Ширина элемента
window.elementWidth = function (element) {
    var computedStyle = getComputedStyle(element, null);
    return parseInt(computedStyle.getPropertyValue('width'));
}