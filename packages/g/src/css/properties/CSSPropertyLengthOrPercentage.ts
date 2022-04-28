import { singleton } from 'mana-syringe';
import { UnitType, CSSUnitValue, parseLengthOrPercentage, mergeDimensions } from '../..';
import type { StyleValueRegistry } from '../StyleValueRegistry';
import type { DisplayObject, CSSProperty } from '../..';

/**
 * <length> & <percentage>
 */
@singleton()
export class CSSPropertyLengthOrPercentage
  implements Partial<CSSProperty<CSSUnitValue, CSSUnitValue>>
{
  parser = parseLengthOrPercentage;
  mixer = mergeDimensions;

  /**
   * according to parent's bounds
   *
   * @example
   * CSS.percent(50) -> CSS.px(0.5 * parent.width)
   */
  calculator(
    name: string,
    oldParsed: CSSUnitValue,
    computed: CSSUnitValue,
    object: DisplayObject,
    registry: StyleValueRegistry,
  ): CSSUnitValue {
    if (CSSUnitValue.isRelativeUnit(computed.unit)) {
      if (computed.unit === UnitType.kPercentage) {
        // try to resolve according to parent's geometry bounds
        // if (object.parentElement) {
        //   // registry.registerParentGeometryBoundsChangedHandler(object, name);
        //   return this.calculateUsedValueWithParentBounds(object, name);
        // } else {

        //   registry.addUnresolveProperty(object, name);

        //   // defer calculation after mounted
        //   // object.addEventListener(
        //   //   ElementEvent.MOUNTED,
        //   //   () => {
        //   //     registry.registerParentGeometryBoundsChangedHandler(object, name);
        //   //   },
        //   //   { once: true },
        //   // );
        // }
        return new CSSUnitValue(0, 'px');
      } else if (computed.unit === UnitType.kEms) {
        // TODO: handle ems
        return new CSSUnitValue(0, 'px');
      }
    } else {
      // remove listener if exists
      // registry.unregisterParentGeometryBoundsChangedHandler(object, name);

      // return absolute value
      return computed.clone();
    }
  }

  private nameToBoundsIndex(name: string): number {
    if (name === 'x' || name === 'cx' || name === 'width') {
      return 0;
    } else if (name === 'y' || name === 'cy' || name === 'height') {
      return 1;
    }

    return 2;
  }

  private calculateUsedValueWithParentBounds(object: DisplayObject, name: string) {
    const bounds = (object.parentElement as DisplayObject).getGeometryBounds();
    const computedValue = object.computedStyle[name].value;
    return new CSSUnitValue(
      (bounds.halfExtents[this.nameToBoundsIndex(name)] * 2 * computedValue) / 100,
      'px',
    );
  }
}
