(() => {
  const canvas = document.querySelector('canvas');
  const sandbox = new GlslCanvas(canvas);


  const calcSize = () => {
    let ww = window.innerWidth; // window width
    let wh = window.innerHeight; // window height
    let dpi = window.devicePixelRatio; // for retina screen

    let size = Math.max(wh, ww + 300);

    canvas.width = size * dpi;
    canvas.height = size * dpi;

    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
  };

  calcSize();

  window.addEventListener('resize', () => {
    calcSize();
  })

  sandbox.load(frag);

  const images = [
    'https://images.unsplash.com/photo-1608209043220-85a864d69c4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1612429971410-e72083471235?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1604945423506-79b3f714707e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1431&q=80'
  ]

  let currentImg = 0;

  canvas.addEventListener('click', () => {
    currentImg += 1;

    if(currentImg >= images.length) {
      currentImg = 0;
    }

    sandbox.setUniform('image', images[currentImg]);
  });

  sandbox.setUniform('image', images[currentImg]);

})();
