/*
 * @Description: 圆圈魔法动画
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-29 19:15:51
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-03 16:42:50
 */

/**
 * @description: 圆圈魔法动画
 * @param {HTMLElement} 绑定元素dom节点 `必传参数`
 * @param {{ color?: string | 'random'; radius?: number; density?: number; clearOffset?: number; scrollElement?: HTMLElement }} 动画配置选项
 * `默认为{
    color: 'rgba(255, 255, 255, 0.5)',
    radius: 10,
    density: 0.3,
    clearOffset: 0.25}`
 * @return {void}
 * @author: dreamy-xay
 */
export default function(
  element: HTMLElement,
  options: {
    color?: string | 'random';
    radius?: number;
    density?: number;
    clearOffset?: number;
    scrollElement?: HTMLElement;
  } = {}
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
    color: 'rgba(255, 255, 255, 0.4)',
    radius: 12,
    density: 0.3,
    clearOffset: 0.25,
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
    settings?.scrollElement.addEventListener(
      'scroll',
      () => {
        animateHeader = settings.scrollElement.scrollTop <= height;
      },
      false
    );

    window.addEventListener(
      'resize',
      () => {
        width = element.clientWidth;
        height = element.clientHeight;
        canvasElement.width = width;
        canvasElement.height = height;
      },
      false
    );
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
