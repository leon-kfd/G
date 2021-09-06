import { ParsedBaseStyleProps } from '@antv/g';

export const PathGeneratorFactory = 'PathGeneratorFactory';
export const PathGenerator = 'Path';

/**
 * generate path in local space
 */
export type PathGenerator<T extends ParsedBaseStyleProps> = (
  context: CanvasRenderingContext2D,
  attributes: T,
) => void;

export { generatePath as CirclePath } from './Circle';
export { generatePath as EllipsePath } from './Ellipse';
export { generatePath as RectPath } from './Rect';
export { generatePath as LinePath } from './Line';
export { generatePath as PolylinePath } from './Polyline';
export { generatePath as PolygonPath } from './Polygon';
export { generatePath as PathPath } from './Path';
