import { isArray } from '@antv/util';
import type { ParsedPolylineStyleProps } from '../../display-objects';
import type { GeometryAABBUpdater } from './interfaces';

export class PolylineUpdater
  implements GeometryAABBUpdater<ParsedPolylineStyleProps>
{
  update(parsedStyle: ParsedPolylineStyleProps) {
    if (parsedStyle.points && isArray(parsedStyle.points.points)) {
      const { points } = parsedStyle.points;

      // FIXME: account for miter lineJoin
      const minX = Math.min(...points.map((point) => point[0]));
      const maxX = Math.max(...points.map((point) => point[0]));
      const minY = Math.min(...points.map((point) => point[1]));
      const maxY = Math.max(...points.map((point) => point[1]));

      const width = maxX - minX;
      const height = maxY - minY;

      return {
        width,
        height,
      };
    }
    return {
      width: 0,
      height: 0,
    };
  }
}
