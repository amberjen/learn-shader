const images = [
  { src: './img/01.jpg', loc: 'Tainan, Taiwan'},
  { src: './img/02.jpg', loc: 'Seoul, South Korea'},
  { src: './img/03.jpg', loc: 'Tokyo, Japan'},
  { src: './img/04.jpg', loc: 'Melbourn, Australia'},
  { src: './img/05.jpg', loc: 'New York, United States'}
];

const prevBtn = document.querySelector('nav a.prev');
const nextBtn = document.querySelector('nav a.next');
const canvas = document.querySelector('.canvas-wrapper canvas');
let loc = document.querySelector('header .location');

const sandbox = new GlslCanvas(canvas);
sandbox.load(frag(images));

const sizer = () => {
  let ww = window.innerWidth;
  let wh = window.innerHeight;
  let size = Math.min(ww, wh);
  let dpi = window.devicePixelRatio;

  canvas.width = 0.60 * size * dpi; // from css
  canvas.height = 0.90 * size * dpi; // from css
  canvas.style.width = Math.round(0.55 * size) + 'px';
  canvas.style.height = Math.round(0.75 * size) + 'px';
};

let startIndex = 0;
let endIndex = 0;

let timeline = performance.now() - 9999;

const next = () => {
  endIndex++;

  if(endIndex >= images.length) {
    endIndex = 0;
  }

  setTimeout(()=> {
    loc.textContent = images[endIndex].loc;
  }, 1300);

  updateCanvas();
};

const prev = () => {
  endIndex--;

  if(endIndex <= 0) {
    endIndex = images.length - 1;
  }

  setTimeout(()=> {
    loc.textContent = images[endIndex].loc;
  }, 1300);

  updateCanvas();
};

const updateCanvas = () => {
  timeline = performance.now();

  sandbox.setUniform('startIndex', startIndex);
  sandbox.setUniform('endIndex', endIndex);

  tick();

  startIndex = endIndex;
};

const tick = () => {
  let diff = (performance.now() - timeline) / 1000;
  sandbox.setUniform('timeline', diff);
  requestAnimationFrame(tick);

};

const load = () => {
  sizer();
  tick();

  images.forEach((img, index) => {
    sandbox.setUniform(`textures[${index}]`, img.src);
  })
  
  loc.textContent = images[0].loc;
};

load();

prevBtn.addEventListener('click', (e) => {
  e.preventDefault();
  prev();
});

nextBtn.addEventListener('click', (e) => {
  e.preventDefault();
  next();
});

window.addEventListener('resize', () => {
  sizer();
});