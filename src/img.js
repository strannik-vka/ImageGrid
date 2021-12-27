class Img {

    constructor(obj) {
        if (typeof obj === 'object' && obj != null) {
            this.img = obj.img;
        }
    }

    isLoaded() {
        if (!this.img.complete) {
            return false;
        }

        if (typeof this.img.naturalWidth !== "undefined" && this.img.naturalWidth === 0) {
            return false;
        }

        return true;
    }

    getDimensionsAll(imgs, callback) {
        var dimensions = {};

        var getDimensionsCallback = (i, img) => {
            this.img = img;

            dimensions[i] = this.getDimensions();

            if (Object.keys(dimensions).length == imgs.length) {
                callback(dimensions);
            }
        }

        imgs.forEach((img, i) => {
            this.img = img;

            if (this.isLoaded()) {
                getDimensionsCallback(i, img);
            } else {
                img.onload = () => {
                    getDimensionsCallback(i, img);
                }
            }
        });
    }

    getDimensions() {
        if (this.img.naturalWidth) {
            var width = this.img.naturalWidth,
                height = this.img.naturalHeight;
        } else {
            var helpImg = new Image();
            helpImg.src = this.img.src;

            var width = helpImg.width,
                height = helpImg.height;
        }

        return {
            width: width,
            height: height,
        }
    }

    getOrientation(dimensions) {
        if (!dimensions && !dimensions.real_width) {
            dimensions = this.getDimensions();
        }

        return (dimensions.width / dimensions.height > 1) ? 'landscape' : 'portrait';
    }

}

export default Img;