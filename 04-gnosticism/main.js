(() => {
  const canvases = document.querySelectorAll('canvas');

  canvases.forEach(canvas => {
    const imgSrc = canvas.getAttribute('data-image');
    const imgW = parseFloat(canvas.getAttribute('data-image-width'));
    const imgH = parseFloat(canvas.getAttribute('data-image-height'));

    const sandbox = new GlslCanvas(canvas);
    sandbox.load(frag);
    sandbox.setUniform('img', imgSrc);
    sandbox.setUniform('imgW', imgW);
    sandbox.setUniform('imgH', imgH);
    sandbox.setUniform('seed', Math.random());

    const sizer = () => {
      const cw = canvas.parentNode.clientWidth; // canvas width
      const ch = canvas.parentNode.clientHeight; // canvas height
      const dpi = window.devicePixelRatio;

      canvas.width = cw * dpi;
      canvas.height = ch * dpi;

      canvas.style.width = cw + 'px';
      canvas.style.height = ch + 'px';
    }

    sizer();

    window.addEventListener('resize', () => {
      sizer();
    });

  })

})();