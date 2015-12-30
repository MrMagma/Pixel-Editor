var Pixel = (function() {
    
    class Pixel {
        constructor() {
            this.hue = 0;
            this.saturation = 0;
            this.lightness = 0;
            this.alpha = 0.0;
        }
        get hsl() {
            return `hsla(${this.hue}, ${this.saturation}%,` +
                `${this.lightness}%, ${this.alpha})`;
        }
        getHSL() {
            return this.hsl;
        }
        setHSL([h, s, l, a = 1.0]) {
            this.hue = h;
            this.saturation = s;
            this.lightness = l;
            this.alpha = a;
        }
    }
    
    module.exports = Pixel;
    return Pixel;
    
})();
