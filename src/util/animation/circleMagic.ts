/*
 * @Description: 圆圈魔法动画
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-29 19:15:51
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-30 15:55:52
 */

export default function(
  element: HTMLElement,
  options: { color?: string; radius?: number; density?: number; clearOffset?: number; scrollElement?: HTMLElement }
): void {
  const circles: Circle[] = [];

  let width: number,
    height: number,
    canvasElement: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    animateHeader: boolean = true;

  const settings: {
    color: string;
    radius: number;
    density: number;
    clearOffset: number;
    scrollElement?: HTMLElement;
  } = {
    color: 'rgba(255, 255, 255, 0.5)',
    radius: 10,
    density: 0.3,
    clearOffset: 0.2,
    ...options
  };

  //  Canvas manipulation
  class Circle {
    private pos: { x: number; y: number };
    private alpha: number;
    private scale: number;
    private speed: number;
    private color: string;

    // constructor
    constructor() {
      this.pos = { x: 0, y: 0 };
      this.init();
    }

    private init() {
      this.pos.x = Math.random() * width;
      this.pos.y = height + Math.random() * 100;
      this.alpha = 0.1 + Math.random() * settings.clearOffset;
      this.scale = 0.1 + Math.random() * 0.3;
      this.speed = Math.random();
      this.color = settings.color === 'random' ? randomColor() : settings.color;
    }

    public draw() {
      if (this.alpha <= 0) this.init();
      this.pos.y -= this.speed;
      this.alpha -= 0.0005;
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.scale * settings.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  }

  //  Main
  initContainer();
  addListeners();

  function initContainer(): void {
    // get width and height
    width = element.offsetWidth;
    height = element.offsetHeight;

    //  create canvas element
    initCanvas();

    // get ctx
    ctx = canvasElement.getContext('2d');

    //  create circles
    for (let x: number = 0; x < width * settings.density; ++x) circles.push(new Circle());

    // create animation
    animate();
  }

  //Init canvas element
  function initCanvas(): void {
    canvasElement = document.createElement('canvas');
    element.appendChild(canvasElement);
    canvasElement.parentElement.style.position = 'relative';
    canvasElement.parentElement.style.overflow = 'hidden';
    canvasElement.width = width;
    canvasElement.height = height;
    canvasElement.style.position = 'absolute';
    canvasElement.style.left = '0';
    canvasElement.style.bottom = '0';
    canvasElement.style.zIndex = '1';
  }

  // Event handling
  function addListeners() {
    if (settings.scrollElement) window.addEventListener('scroll', scrollCheck, false);
    window.addEventListener('resize', resize, false);
  }

  function scrollCheck() {
    if (settings?.scrollElement.scrollTop > height) animateHeader = false;
    else animateHeader = true;
  }

  function resize() {
    width = element.clientWidth;
    height = element.clientHeight;
    canvasElement.width = width;
    canvasElement.height = height;
  }

  function animate() {
    if (animateHeader) {
      ctx.clearRect(0, 0, width, height);
      for (const i in circles) circles[i].draw();
    }
    requestAnimationFrame(animate);
  }

  function randomColor() {
    const r: number = Math.floor(Math.random() * 255);
    const g: number = Math.floor(Math.random() * 255);
    const b: number = Math.floor(Math.random() * 255);
    const alpha: string = Math.random().toPrecision(2);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
