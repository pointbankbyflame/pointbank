class ValueAnimator {
  static REPEAT_FOREVER = -1;
  static anims = [];
  listeners = [];
  duration = 1000;
  interpolator = new Interpolator();
  __internalinterpolator__ = new Interpolator();
  rep = false;
  repeatcount = -1;
  rev = false;
  running = false;
  started = false;
  __freshstart__ = true;
  v1 = 0;
  v2 = 1;
  onstart = new Function(); onresume = new Function(); onstop = new Function(); onend = new Function(); onrepeat = new Function(); onreverse = new Function();
  constructor() {
    ValueAnimator.anims.push(this);
    this.__internalinterpolator__.overone = true;
  }
  
  setduration(d = 1000) {
    this.duration = d === null ? 1000 : d;
  }
  
  setinterpolator(minterpolator = new Interpolator()) {
    var interpolator = minterpolator === null ? new Interpolator() : minterpolator;
    if (typeof interpolator === 'function') {
      var rinterpolator = new Interpolator();
      rinterpolator.setinterpolation(interpolator);
      interpolator = rinterpolator;
    } else if (!interpolator instanceof Interpolator) {return;}
    this.interpolator = interpolator;
    var anim = this;
    this.__internalinterpolator__.setinterpolation(function(frac) {
      if (anim.rep) {
       frac %= anim.rev ? 2 : 1;
       if (frac > 1) {
         frac = 2 - frac;
       }
      }
       return interpolator.getinterpolation(frac);
     });
  }
  
  setlisteners(ll = []) {
    this.listeners = ll === null ? [] : ll;
  }
  
  addlistener(l = new Function()) {
    this.listeners.push(l === null ? new Function() : l);
  }
  
  removealllisteners() {
    setlisteners();
  }
  
  setrepeatable(r) {
    this.rep = r;
  }
  
  setrepeatcount(c = -1) {
    this.repeatcount = c === null || c < -1 ? -1 : c;
  }
  
  setreversable(rv) {
    this.rev = rv;
  }
  
  setrange(v1 = 0, v2 = 1) {
    this.v1 = v1 === null ? 0 : v1;
    this.v2 = v2 === null ? 1 : v2;
  }
  
  setrangestart(v = 0) {
    this.setrange(v, this.v2);
  }
  
  setrangeend(v = 1) {
    this.setrange(this.v1, v);
  }
  
  start() {
    this.running = true;
    this.__freshstart__ = true;
    this.started = true;
  }
  
  resume() {
    if (!this.started) {return}
    this.running = true;
    this.__freshstart__ = false;
  }
  
  stop() {
    this.running = false;
    this.started = false;
    this.onstop();
  }
  
  getduration() {
    return this.duration;
  }
  
  getinterpolator() {
    return this.interpolator;
  }
  
  getlisteners() {
    return this.listeners;
  }
  
  isrepeatable() {
    return this.rep;
  }
  
  getrepeatcount() {
    return this.repeatcount;
  }
  
  isreversable() {
    return this.rev;
  }
  
  getrangestart() {
    return this.v1;
  }
  
  getrangeend() {
    return this.v2;
  }
  
  isrunning() {
    return this.running;
  }
  
  clone() {
    var vclone = new ValueAnimator();
    vclone.setduration(this.getduration());
    vclone.setinterpolator(this.getinterpolator());
    vclone.setrange(this.getrangestart(), this.getrangeend());
    vclone.setlistener(this.getlistener());
    vclone.setrepeatable(this.isrepeatable());
    vclone.setrepeatcount(this.getrepeatcount());
    vclone.setreversable(this.isreversable());
    return vclone;
  }
}

__vanimanimsstime__ = new Map();
__vanimanimsrev__ = new Map();
__vanimanimrepeatcount__ = new Map();
willend = false;
repeatcount = 0;
function __vaniminternalframefunction__() {
  for (let i = 0; i < ValueAnimator.anims.length; i++) {
    anim = ValueAnimator.anims[i];
    duration = anim.getduration();
    v1 = anim.getrangestart();
    v2 = anim.getrangeend();
    interpolator = anim.__internalinterpolator__;
    listeners = anim.getlisteners();
    isrep = anim.isrepeatable();
    isrev = anim.isreversable();
    isrun = anim.isrunning();
    rev = false;
    willend = false;
    if (isrun) {
      if (anim.__freshstart__) {
        anim.onstart();
        stime = Date.now();
        anim.__freshstart__ = false;
        rev = false;
        notrepeatcount = 0;
        repeatcount = 0;
        __vanimanimsrev__.set(anim, rev);
        __vanimanimsstime__.set(anim, stime);
        __vanimanimrepeatcount__.set(anim, repeatcount);
      } else {
        anim.onresume();
        stime = __vanimanimsstime__.get(anim);
        rev = __vanimanimsrev__.get(anim);
        repeatcount = __vanimanimrepeatcount__.get(anim);
      }
      var animrepeatcount = anim.getrepeatcount();
      isrep &= animrepeatcount === -1 ? true : repeatcount <= animrepeatcount;
      time = Date.now() - stime;
      if (!interpolator.overone && isrep) {
        frac = (time%duration)/duration;
      } else {
        frac = time / duration;
      }
      if (!isrep && frac >= 1) {frac = 1;anim.stop();willend = true;} else {willend=false;}
      if ((time%(duration+20)) >= duration) {
      
      if (isrev && !interpolator.overone) {
        rev = !rev;
        __vanimanimsrev__.set(anim, rev);
      }
      if (isrep) {
        repeatcount++;
        __vanimanimrepeatcount__.set(anim, repeatcount);
        if (repeatcount <= animrepeatcount || animrepeatcount === -1) {
        anim.onrepeat();
        }
      }
      if (isrev) {
        anim.onreverse();
      }
      }
      if (rev) {
        frac = 1 - frac;
      }
      frac = interpolator.getinterpolation(frac);
      dx = v2 - v1;
      for (var __i = 0; __i < listeners.length; __i++) {
      listener = listeners[__i];
      listener.call(this, v1 + dx*frac, time);
      }
    }
    if (willend) {
      anim.onend();
    }
  }
  requestAnimationFrame(__vaniminternalframefunction__);
}
requestAnimationFrame(__vaniminternalframefunction__);