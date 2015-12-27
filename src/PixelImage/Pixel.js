var Pixel = (function() {
    
    class Pixel {
        constructor() {
            this.red = 0;
            this.green = 0;
            this.blue = 0;
            this.alpha = 0.0;
        }
        get rgb() {
            return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
        }
        getRGB() {
            return this.rgb;
        }
        setRGB([r, g, b, a = 1.0]) {
            this.red = r;
            this.green = g;
            this.blue = b;
            this.alpha = a;
        }
    }
    
    module.exports = Pixel;
    return Pixel;
    
})();
