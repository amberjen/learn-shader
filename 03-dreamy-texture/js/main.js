(() => {
  const canvas = document.createElement('canvas');
  const sandbox = new GlslCanvas(canvas);

  document.body.appendChild(canvas);

  const sizer = () => {
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    const dpi = window.devicePixelRatio;

    const size = Math.max(ww, wh);

    canvas.width = dpi * size;
    canvas.height = dpi * size;

    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
  }

  sizer();

  window.addEventListener('resize', () => {
    sizer();
  })

  sandbox.load(frag);
  sandbox.setUniform('seed', Math.random());

})();