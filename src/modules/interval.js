const Now = (() => {
  if (Performance.now != null) {
    return () => Performance.now();
  } else {
    return () => Date.now();
  }
})();

export default function(fps, cb) {
  const start = Now();
  let last = start;

  setInterval(() => {
    const now = Now();

    try {
      cb({ type: "interval", t: start - now, dt: now - last });
    } catch (e) {
      cb(e);
    }

    last = now;
  }, 1000 / fps);
}
