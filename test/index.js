import ImageGrid from '../../ImageGrid';

new ImageGrid({
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