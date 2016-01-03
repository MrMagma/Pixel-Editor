var _private = new WeakMap();

// According to wikipedia, HSL, HSB and HSV are being used
// interchangably, apparently, for the colorspace HSV.
// In order to avoid confusion about what color space we
// are in, we will ignore the naming conventions of css
// and use the correct colorspace term for the color
// space we are actually using - HSV.
// https://en.wikipedia.org/wiki/HSL_and_HSV
//
// If this is in fact incorrect then these algorithms should
// be changed to reflect the correct representation.

class RGB_HSVConverter {
    constructor(h = 360, s = 100, v = 100, a = 1.0){
        let params = "HSVA".split('');
        let values = [h, s, v, a];
        for(let i=0; i<params.length; i++){
            if(values[i] < 1){
                throw new TypeError("invalid parameter " + values[i] + ": " + params[i] + "must be >= 1.0");
            }
        }
        
        // store input values privately and use get() syntax to
        // make them constant for this converter instance
        _private.set(this, {range: {H: h, S: s, V: v, A: a}});
    }
    
    get Hrange(){
        return _private.get(this).range.H;
    }
    
    get Srange(){
        return _private.get(this).range.S;
    }
    
    get Vrange(){
        return _private.get(this).range.V;
    }
    
    get Arange(){
        return _private.get(this).range.A;
    }
    
    // http://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
    getRGBA(h = 0, s = 0, v = 0, a = 0, components = false){
        let r, g, b, i, f, p, q, t;
        if (arguments.length === 1) {
            s = h.s, v = h.v, a = h.a, h = h.h;
        }
        
        // values are normalized
        // h is wrapped,
        // s, v and a are clamped
        h = (h / this.Hrange) % 1;
        s = (s / this.Srange);
        v = (v / this.Vrange);
        a = (a / this.Arange);
        s = s > 1.0 ? 1.0 : s;
        v = v > 1.0 ? 1.0 : v;
        a = a > 1.0 ? 1.0 : a;
        
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }
        
        r = Math.round(r * 255);
        g = Math.round(g * 255);
        b = Math.round(b * 255);
        a = Math.round(a * 255);
        
        // when true returns separate components
        if(components){
            return {r: r, g: g, b: b, a: a};
        }
        
        // otherwise returns 32-bit color
        return r | g << 8 | b << 16 | a << 24;
    }
    
    // http://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
    getHSVA(r = 0, g = 0, b = 0, a = 0){
        if (arguments.length === 1) {
            g = r.g, b = r.b, a = r.a, r = r.r;
        }
        
        let max = Math.max(r, g, b), min = Math.min(r, g, b),
            d = max - min,
            h,
            s = (max === 0 ? 0 : d / max),
            v = max / 255;
        
        switch (max) {
            case min: h = 0; break;
            case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
            case g: h = (b - r) + d * 2; h /= 6 * d; break;
            case b: h = (r - g) + d * 4; h /= 6 * d; break;
        }
        
        // componentwise representation is the most practical for HSV
        // unless you want to use use the 0-255 range and optionally
        // return a 32-bit representation, but that would be odd and
        // prone to human error
        return {
            
            // no rounding, HSV does not assume discrete values
            // also the range may be small or even 1.0!
            
            h: h * this.Hrange,
            s: s * this.Srange,
            v: v * this.Vrange,
            a: a * this.Arange
        };
    }
}

module.exports = HSVConverter;
