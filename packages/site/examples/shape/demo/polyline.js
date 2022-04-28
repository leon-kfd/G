import { Polyline, Canvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import * as lil from 'lil-gui';
import Stats from 'stats.js';

// create a renderer
const canvasRenderer = new CanvasRenderer();
const webglRenderer = new WebGLRenderer();
const svgRenderer = new SVGRenderer();

// create a canvas
const canvas = new Canvas({
  container: 'container',
  width: 600,
  height: 500,
  renderer: canvasRenderer,
});

// create a line
const points = [
  [50, 50],
  [100, 50],
  [100, 100],
  [150, 100],
  [150, 150],
  [200, 150],
  [200, 200],
  [250, 200],
  [250, 250],
  [300, 250],
  [300, 300],
  [350, 300],
  [350, 350],
  [400, 350],
  [400, 400],
  [450, 400],
];
const polyline = new Polyline({
  style: {
    points,
    stroke: '#1890FF',
    lineWidth: 2,
  },
});

canvas.appendChild(polyline);

// stats
const stats = new Stats();
stats.showPanel(0);
const $stats = stats.dom;
$stats.style.position = 'absolute';
$stats.style.left = '0px';
$stats.style.top = '0px';
const $wrapper = document.getElementById('container');
$wrapper.appendChild($stats);
canvas.on('afterrender', () => {
  if (stats) {
    stats.update();
  }
});

// GUI
const gui = new lil.GUI({ autoPlace: false });
$wrapper.appendChild(gui.domElement);
const rendererFolder = gui.addFolder('renderer');
const rendererConfig = {
  renderer: 'canvas',
};
rendererFolder.add(rendererConfig, 'renderer', ['canvas', 'webgl', 'svg']).onChange((renderer) => {
  canvas.setRenderer(
    renderer === 'canvas' ? canvasRenderer : renderer === 'webgl' ? webglRenderer : svgRenderer,
  );
});
rendererFolder.open();

const lineFolder = gui.addFolder('polyline');
const lineConfig = {
  stroke: '#1890FF',
  lineWidth: 2,
  lineJoin: 'miter',
  lineCap: 'butt',
  lineDash: 0,
  lineDashOffset: 0,
  strokeOpacity: 1,
  firstPointX: 50,
  firstPointY: 50,
  visible: true,
};
lineFolder.add(lineConfig, 'firstPointX', 0, 200).onChange((firstPointX) => {
  const newPoints = [...points];
  newPoints[0] = [firstPointX, lineConfig.firstPointY];
  polyline.style.points = newPoints;
});
lineFolder.add(lineConfig, 'firstPointY', 0, 200).onChange((firstPointY) => {
  const newPoints = [...points];
  newPoints[0] = [lineConfig.firstPointX, firstPointY];
  polyline.style.points = newPoints;
});
lineFolder.addColor(lineConfig, 'stroke').onChange((color) => {
  polyline.attr('stroke', color);
});
lineFolder.add(lineConfig, 'lineWidth', 1, 20).onChange((lineWidth) => {
  polyline.attr('lineWidth', lineWidth);
});
lineFolder.add(lineConfig, 'lineJoin', ['miter', 'round', 'bevel']).onChange((lineJoin) => {
  polyline.attr('lineJoin', lineJoin);
});
lineFolder.add(lineConfig, 'lineCap', ['butt', 'round', 'square']).onChange((lineCap) => {
  polyline.attr('lineCap', lineCap);
});
lineFolder.add(lineConfig, 'lineDash', 0, 100).onChange((lineDash) => {
  polyline.style.lineDash = [lineDash];
});
lineFolder.add(lineConfig, 'lineDashOffset', 0, 100).onChange((lineDashOffset) => {
  polyline.style.lineDashOffset = lineDashOffset;
});
lineFolder.add(lineConfig, 'strokeOpacity', 0, 1, 0.1).onChange((opacity) => {
  polyline.attr('strokeOpacity', opacity);
});
lineFolder.add(lineConfig, 'visible').onChange((visible) => {
  if (visible) {
    polyline.style.visibility = 'visible';
    // polyline.show();
  } else {
    polyline.style.visibility = 'hidden';
    // polyline.hide();
  }
});

const transformFolder = gui.addFolder('transform');
const transformConfig = {
  x: 200,
  y: 100,
  scale: 1,
  transformOrigin: 'left top',
  eulerAngles: 0,
  anchorX: 0,
  anchorY: 0,
};
transformFolder
  .add(transformConfig, 'transformOrigin', [
    'left top',
    'center',
    'right bottom',
    '50% 50%',
    '50px 50px',
  ])
  .onChange((transformOrigin) => {
    polyline.style.transformOrigin = transformOrigin;
  });
transformFolder.add(transformConfig, 'x', 0, 400).onChange((x) => {
  polyline.setLocalPosition(x, polyline.style.y);
  // or
  // polyline.style.x = x;
});
transformFolder.add(transformConfig, 'y', 0, 400).onChange((y) => {
  polyline.setLocalPosition(polyline.style.x, y);
  // or
  // polyline.style.y = y;
});
transformFolder.add(transformConfig, 'scale', 0.2, 5).onChange((scaling) => {
  polyline.setLocalScale(scaling);
});
transformFolder.add(transformConfig, 'eulerAngles', 0, 360).onChange((eulerAngles) => {
  polyline.setLocalEulerAngles(eulerAngles);
});
transformFolder.add(transformConfig, 'anchorX', 0, 1).onChange((anchorX) => {
  polyline.style.anchor = [anchorX, transformConfig.anchorY];
});
transformFolder.add(transformConfig, 'anchorY', 0, 1).onChange((anchorY) => {
  polyline.style.anchor = [transformConfig.anchorX, anchorY];
});
transformFolder.open();
