(() => {
  const canvas = document.querySelector('canvas');
  const sandbox = new GlslCanvas(canvas);

  const sizer = () => {
    const size = window.innerWidth * 0.4;
    const dpi = window.devicePixelRatio;

    canvas.width = size * dpi;
    canvas.height = size * dpi;

    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
  };

  sizer();

  window.addEventListener('resize', () => {
    sizer();
  });

  sandbox.load(frag);

  sandbox.setUniform('innerColors',
                        [0.963, 0.649, 0.646, 1.0],
                        [0.773, 0.711, 1.000, 1.0],
                        [0.977, 0.989, 0.641, 1.0]
                    );

  sandbox.setUniform('midColors',
                        [0.533, 0.941, 1.000, 1.0],
                        [0.730, 0.901, 0.201, 1.0],
                        [1.000, 0.713, 0.216, 1.0]
                    );

  sandbox.setUniform('outerColors',
                        [0.000, 0.206, 0.758, 1.0],            
                        [0.071, 0.557, 0.300, 1.0],
                        [1.000, 0.245, 0.226, 1.0]
                    );
  
  sandbox.setUniform('scroll', 0);

  window.addEventListener('scroll', () => {
    // How far have scrolled
    const scrollDist = window.scrollY;

    // How tall is the browser
    const wh = window.innerHeight;

    sandbox.setUniform('scroll', scrollDist/wh);
  });

})();