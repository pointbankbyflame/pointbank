class Interpolator {
  overone = false;
  interpolation = function(frac) {return frac};
  getinterpolation(frac) {
    if (this.interpolation === null) {
      return frac;
    } else {
      return this.interpolation(frac);
    }
  }
  setinterpolation(interpolation) {
    this.interpolation = interpolation;
  }
}

class AccelerateInterpolator extends Interpolator {
  factor = 1;
  constructor(factor = 1) {
    super();
    this.factor = factor;
  }
  interpolation = function(frac) {
    return Math.pow(frac, 2 * this.factor);
  }
}

class DecelerateInterpolator extends Interpolator {
  factor = 1;
  constructor(factor = 1) {
    super();
    this.factor = factor;
  }
  interpolation = function(frac) {
    return 1 - Math.pow((1 - frac), 2 * this.factor);
  }
}

class AccelerateDecelerateInterpolator extends Interpolator {
  interpolation = function(frac) {
    return (Math.cos((frac + 1) * Math.PI) / 2) + 0.5;
  }
}

class LinearInterpolator extends Interpolator {
  interpolation = function(frac) {
    return frac;
  }
}

class CycleInterpolator extends Interpolator {
  cycles = 1;
  constructor(cycles = 1) {
    super();
    this.cycles = cycles;
  }
  interpolation = function(frac) {
    return Math.sin(2 * this.cycles * Math.PI * frac);
  }
}

class OvershotInterpolator extends Interpolator {
  tension = 2;
  constructor(tension = 2) {
    super();
    this.tension = tension;
  }
  interpolation = function(fr) {
    frac = fr - 1;
    return frac * frac * ((this.tension + 1) * frac + this.tension) + 1;
  }
}

class AnticipateInterpolator extends Interpolator {
  tension = 2;
  constructor(tension = 2) {
    super();
    this.tension = tension;
  }
  interpolation = function(frac) {
    return frac * frac * ((this.tension + 1) * frac - this.tension);
  }
}

class AnticipateOvershotInterpolator extends Interpolator {
  tension = 2 * 1.5;
  constructor(tension = 2, extraTension = 1.5) {
    super();
    this.tension = tension * extraTension;
  }
  _a(t, s) {
    return t * t * ((s + 1) * t - s);
  }
  
  _o(t, s) {
    return t * t * ((s + 1) * t + s);
  }
  interpolation = function(t) {
    if (t < 0.5) {return 0.5 * this._a(t * 2, this.tension);} else {return 0.5 * (this._o(t * 2 - 2, this.tension) + 2);}
    }
}

class BounceInterpolator extends Interpolator {
  _bounce(t) {
    return t * t * 8.0;
  }
  interpolation = function(frac) {
    var t = frac * 1.1226;
    if (t < 0.3535) {
      return this._bounce(t);
    } else if (t < 0.7408) {
      return this._bounce(t - 0.54719) + 0.7;
    } else if (t < 0.9644) {
      return this._bounce(t - 0.8526) + 0.9;
    } else {
      return this._bounce(t - 1.0435) + 0.95;
    }
  }
}