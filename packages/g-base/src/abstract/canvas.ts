import Container from './container';
import { ICanvas } from '../interfaces';
import { CanvasCfg, Point, Renderer, Cursor } from '../types';
import { isBrowser, isString } from '../util/util';
import Timeline from '../animate/timeline';
import EventController from '@antv/g-base/lib/event/event-contoller';

const PX_SUFFIX = 'px';

abstract class Canvas extends Container implements ICanvas {
  constructor(cfg: CanvasCfg) {
    super(cfg);
    this.initContainer();
    this.initDom();
    this.initEvents();
    this.initTimeline();
  }

  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    // set default cursor style for canvas
    cfg['cursor'] = 'default';
    return cfg;
  }

  /**
   * @protected
   * 初始化容器
   */
  initContainer() {
    let container = this.get('container');
    if (isString(container)) {
      container = document.getElementById(container);
      this.set('container', container);
    }
  }

  /**
   * @protected
   * 初始化 DOM
   */
  initDom() {
    const el = this.createDom();
    this.set('el', el);
    // 附加到容器
    const container = this.get('container');
    container.appendChild(el);
    // 设置初始宽度
    this.setDOMSize(this.get('width'), this.get('height'));
  }

  /**
   * 创建画布容器
   * @return {HTMLElement} 画布容器
   */
  abstract createDom(): HTMLElement | SVGSVGElement;

  /**
   * @protected
   * 初始化绑定的事件
   */
  initEvents() {
    const eventController = new EventController({
      canvas: this,
    });
    eventController.init();
    this.set('eventController', eventController);
  }

  /**
   * @protected
   * 初始化时间轴
   */
  initTimeline() {
    const timeline = new Timeline(this);
    this.set('timeline', timeline);
  }

  /**
   * @protected
   * 修改画布对应的 DOM 的大小
   * @param {number} width  宽度
   * @param {number} height 高度
   */
  setDOMSize(width: number, height: number) {
    const el = this.get('el');
    if (isBrowser) {
      el.style.width = width + PX_SUFFIX;
      el.style.height = height + PX_SUFFIX;
    }
  }

  // 实现接口
  changeSize(width: number, height: number) {
    this.setDOMSize(width, height);
    this.set('width', width);
    this.set('height', height);
    this.onCanvasChange('changeSize');
  }

  /**
   * 获取当前的渲染引擎
   * @return {Renderer} 返回当前的渲染引擎
   */
  getRenderer(): Renderer {
    return this.get('renderer');
  }

  /**
   * 获取画布的 cursor 样式
   * @return {Cursor}
   */
  getCursor(): Cursor {
    return this.get('cursor');
  }

  /**
   * 设置画布的 cursor 样式
   * @param {Cursor} cursor  cursor 样式
   */
  setCursor(cursor: Cursor) {
    this.set('cursor', cursor);
    const el = this.get('el');
    if (isBrowser && el) {
      // 直接设置样式，不等待鼠标移动时再设置
      el.style.cursor = cursor;
    }
  }

  // 实现接口
  getPointByClient(clientX: number, clientY: number): Point {
    const el = this.get('el');
    const bbox = el.getBoundingClientRect();
    return {
      x: clientX - bbox.left,
      y: clientY - bbox.top,
    };
  }

  // 实现接口
  getClientByPoint(x: number, y: number): Point {
    const el = this.get('el');
    const bbox = el.getBoundingClientRect();
    return {
      x: x + bbox.left,
      y: y + bbox.top,
    };
  }

  // 实现接口
  draw() {}

  /**
   * @protected
   * 销毁 DOM 容器
   */
  removeDom() {
    const el = this.get('el');
    el.parentNode.removeChild(el);
  }

  /**
   * @protected
   * 清理所有的事件
   */
  clearEvents() {
    const eventController = this.get('eventController');
    eventController.destroy();
  }

  isCanvas() {
    return true;
  }

  getParent() {
    return null;
  }

  destroy() {
    const timeline = this.get('timeline');
    if (this.get('destroyed')) {
      return;
    }
    this.clear();
    // 同初始化时相反顺序调用
    if (timeline) {
      // 画布销毁时自动停止动画
      timeline.stop();
    }
    this.clearEvents();
    this.removeDom();
    super.destroy();
  }
}

export default Canvas;
