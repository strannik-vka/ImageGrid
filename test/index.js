import ImageGrid from '../../ImageGrid';

var MyImageGrid = new ImageGrid({
    container: '#photos',
    breakpoints: {
        320: {
            margin: 4,
            columns: 2
        },
        768: {
            margin: 4,
            columns: 4
        },
        1200: {
            margin: 8,
            columns: 6
        }
    }
});

setTimeout(() => {
    var images = [
        './img/17.jpg', './img/18.jpg', './img/19.jpg',
        './img/20.jpg', './img/21.jpg', './img/22.jpg',
        './img/23.jpg', './img/24.jpg'
    ];

    MyImageGrid.append(images);
}, 5000);