class ImageGrid {

    constructor(obj) {
        this.styles();

        this.dimensions = {};
        this.container = obj.container;
        this.breakpoints = obj.breakpoints;
        this.margin = typeof obj.margin !== 'undefined' ? obj.margin : 0;

        this.setBreakpoint();
        this.each();

        window.addEventListener('resize', () => {
            this.setBreakpoint();
            this.each();
        }, true);
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
        var parents = document.querySelectorAll(this.container);

        parents.forEach((parent) => {
            parent.classList.add('image-grid-parent');

            var imgs = parent.querySelectorAll('img'),
                parentWidth = this.getElemWidth(parent);

            this.getDimensionsAll(imgs, (dimensions) => {
                var heightAll = 0;

                for (var i = 0; i < imgs.length; i++) {
                    imgs[i].classList.add('image-grid-item');

                    var isEven = i % 2;

                    if (!isEven) {
                        var calc = this.calcDimensions(i, parentWidth);

                        if (typeof calc === 'object' && calc != null) {
                            imgs[i].style.width = calc.width1 + 'px';

                            if (calc.width2) {
                                imgs[i + 1].style.width = calc.width2 + 'px';
                            }

                            this.dimensions[i].width = calc.width1;
                            this.dimensions[i].height = calc.height;

                            if (calc.width2) {
                                this.dimensions[i + 1].width = calc.width2;
                                this.dimensions[i + 1].height = calc.height;
                            }
                        }

                        var calcPosition1 = this.calcLeftPosition(i),
                            calcPosition2 = calc.width2 ? this.calcLeftPosition(i + 1) : null;

                        imgs[i].style.top = heightAll + 'px';
                        imgs[i].style.left = calcPosition1 + 'px';

                        if (calc.width2) {
                            imgs[i + 1].style.top = heightAll + 'px';
                            imgs[i + 1].style.left = calcPosition2 + 'px';
                        }

                        heightAll += this.dimensions[i].height + this.margin;
                    }
                }

                parent.style.height = heightAll + 'px';
                parent.style.opacity = '1';
            });
        });
    }

    calcLeftPosition(i) {
        return i % 2 ? this.dimensions[i - 1].width + this.margin : 0
    }

    calcDimensions(i, container_width) {
        var dimension1 = this.dimensions[i],
            dimension2 = typeof this.dimensions[i + 1] !== 'undefined' && this.dimensions[i + 1] != null
                ? this.dimensions[i + 1] : null;

        if (dimension2 === null) {
            return {
                width1: container_width,
                width2: null,
                height: dimension1.height * container_width / dimension1.width
            }
        }

        container_width = container_width - this.margin;

        // 1. действие: выровнять картинки
        if (dimension1.height != dimension2.height) {
            // Новая ширина для большой картинки
            var new_width = dimension1.height > dimension2.height
                ? dimension2.height * dimension1.width / dimension1.height
                : dimension1.height * dimension2.width / dimension2.height;

            var images_width = new_width + (dimension1.height > dimension2.height ? dimension2.width : dimension1.width);
        } else {
            var new_width = dimension1.width,
                images_width = dimension2.width + dimension1.width;
        }

        // 2. действие: найти на сколько % измениить картинки, чтобы поместить в контейнер
        if (images_width != container_width) {
            var percent_new_width = 100 / (images_width / new_width),
                width_new_width = (container_width / 100) * percent_new_width,
                new_height = dimension1.height * (dimension1.height > dimension2.height ? width_new_width : container_width - width_new_width) / dimension1.width;

            if (dimension1.height > dimension2.height) {
                return {
                    width1: width_new_width,
                    width2: container_width - width_new_width,
                    height: new_height
                }
            } else {
                return {
                    width1: container_width - width_new_width,
                    width2: width_new_width,
                    height: new_height
                }
            }
        }

        return false;
    }

    getElemWidth(elem) {
        var computedStyle = getComputedStyle(elem, null);
        return parseInt(computedStyle.getPropertyValue('width'));
    }

    getDimensionsAll(imgs, callback) {
        var dimensions = {};

        var getDimensionsCallback = (i, img) => {
            dimensions[i] = this.getDimensions(img);

            if (Object.keys(dimensions).length == imgs.length) {
                this.dimensions = dimensions;
                callback(dimensions);
            }
        }

        imgs.forEach((img, i) => {
            if (this.isImageLoaded(img)) {
                getDimensionsCallback(i, img);
            } else {
                img.onload = () => {
                    getDimensionsCallback(i, img);
                }
            }
        });
    }

    getDimensions(img) {
        if (img.naturalWidth) {
            var width = img.naturalWidth,
                height = img.naturalHeight;
        } else {
            var helpImg = new Image();
            helpImg.src = img.src;

            var width = helpImg.width,
                height = helpImg.height;
        }

        return {
            width: width,
            height: height,
        }
    }

    isImageLoaded(img) {
        if (!img.complete) {
            return false;
        }

        if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
            return false;
        }

        return true;
    }

    getOrientation(img, getDimensions) {
        if (!getDimensions && !getDimensions.real_width) {
            getDimensions = this.getDimensions(img);
        }

        return (getDimensions.width / getDimensions.height > 1) ? 'landscape' : 'portrait';
    }

}

export default ImageGrid;