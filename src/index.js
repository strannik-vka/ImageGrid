import './helpers';

import Img from "./img";

class ImageGrid {

    constructor(obj) {
        this.styles();

        this.dimensions = {};
        this.container = obj.container;
        this.onInit = obj.onInit;
        this.breakpoints = obj.breakpoints;
        this.margin = typeof obj.margin !== 'undefined' ? obj.margin : 8;
        this.columns = typeof obj.columns !== 'undefined' ? obj.columns : 6;

        this.restart();

        window.addEventListener('resize', () => {
            this.restart();
        }, true);
    }

    restart() {
        this.setBreakpoint();
        this.each();
    }

    setBreakpoint() {
        if (typeof this.breakpoints === 'object' && this.breakpoints != null) {
            var keys = Object.keys(this.breakpoints);

            keys.forEach(key => {
                if (window.screen.width >= key) {
                    var breakpointKeys = Object.keys(this.breakpoints[key]);
                    breakpointKeys.forEach(breakpointKey => {
                        this[breakpointKey] = this.breakpoints[key][breakpointKey];
                    });
                }
            });
        }
    }

    styles() {
        document.querySelector('head').innerHTML += '<style>.image-grid-parent {position: relative;}.image-grid-item {position: absolute;}</style>';
    }

    each() {
        var parents = document.querySelectorAll(this.container),
            ImageClass = new Img();

        parents.forEach((parent) => {
            parent.classList.add('image-grid-parent');

            var imgs = parent.querySelectorAll('img'),
                parentWidth = elementWidth(parent);

            ImageClass.getDimensionsAll(imgs, (dimensions) => {
                this.dimensions = dimensions;

                var heightAll = 0;

                for (var i = 0; i < imgs.length; i++) {
                    imgs[i].classList.add('image-grid-item');

                    var isFirst = (i + 1) % this.columns == 1;

                    if (isFirst || this.columns == 1) {
                        // Рамеры фотографий
                        var imageSizes = this.calcRowSizes(i, parentWidth, this.columns),
                            rowImagesCount = Object.keys(imageSizes).length;

                        // Позиции справа
                        var rightPositions = this.calcRowPositions(imageSizes, rowImagesCount);

                        // Вставка стилей
                        for (var q = 0; q < rowImagesCount; q++) {
                            imgs[i + q].style.top = heightAll + 'px';
                            imgs[i + q].style.right = rightPositions[q + 1] + 'px';
                            imgs[i + q].style.width = imageSizes[q + 1].width + 'px';
                            imgs[i + q].style.height = imageSizes[q + 1].height + 'px';
                        }

                        // Общая высота
                        heightAll += imageSizes[1].height + this.margin;
                    }
                }

                heightAll = heightAll - this.margin;

                parent.style.height = heightAll + 'px';
                parent.style.opacity = '1';

                if (typeof this.onInit === 'function') {
                    this.onInit();
                }
            });
        });
    }

    calcRowSizes(index, container_width, columns) {
        var sizes = {};

        for (var i = 0; i < columns; i++) {
            if (typeof this.dimensions[index + i] !== 'undefined') {
                sizes[i + 1] = this.dimensions[index + i];
            }
        }

        var sizesCount = Object.keys(sizes).length;

        if (sizesCount == 1) {
            sizes[1] = {
                width: container_width,
                height: sizes[1].height * container_width / sizes[1].width
            }
        } else {
            container_width = container_width - (this.margin * (sizesCount - 1));

            var images_width = sizes[1].width,
                new_widths = { 1: sizes[1].width };

            // 1. действие: выровнять картинки
            for (var i = 1; i < sizesCount; i++) {
                var number = i + 1;

                if (sizes[1].height != sizes[number].height) {
                    var new_width = sizes[1].height * sizes[number].width / sizes[number].height;

                    images_width += new_width;
                    new_widths[number] = new_width;
                } else {
                    images_width += sizes[number].width;
                    new_widths[number] = sizes[number].width;
                }
            }

            // 2. действие: найти на сколько % измениить картинки, чтобы поместить в контейнер
            if (images_width != container_width) {
                for (var i = 0; i < sizesCount; i++) {
                    var number = i + 1;

                    // 1. На сколько процентов занимает ширина картинки
                    var percentWidthImage = 100 / (images_width / new_widths[number]);

                    // 2. Итоговая ширина картинки
                    var finalWidthImage = (container_width / 100) * percentWidthImage;

                    // 3. Итоговая высота
                    var finalHeightImage = sizes[number].height * finalWidthImage / sizes[number].width;

                    // 4. Ставим размеры
                    sizes[number] = {
                        width: finalWidthImage,
                        height: finalHeightImage
                    }
                }
            }
        }

        return sizes;
    }

    calcRowPositions(imageSizes, rowImagesCount) {
        var positions = {},
            startIndex = rowImagesCount - 1,
            widths = imageSizes[rowImagesCount].width;

        positions[rowImagesCount] = 0;

        for (var i = startIndex; i > 0; i--) {
            positions[i] = widths + this.margin;
            widths += imageSizes[i].width + this.margin;
        }

        return positions;
    }

    append(urls) {
        var parents = document.querySelectorAll(this.container);

        parents.forEach((parent) => {
            urls.forEach(url => {
                var img = document.createElement('img');

                img.src = url;

                parent.appendChild(img);
            });
        });

        this.restart();
    }

}

export default ImageGrid;