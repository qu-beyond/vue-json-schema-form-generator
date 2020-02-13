import AdditionalPropWrapper from './AdditionalPropWrapper'
import ArrayWrapper from './ArrayWrapper'
import DefaultWrapper from './DefaultWrapper'
import BooleanWrapper from './BooleanWrapper'
import ObjectWrapper from './ObjectWrapper'

export const wrapperMap = {
  additional: AdditionalPropWrapper,
  array: ArrayWrapper,
  boolean: BooleanWrapper,
  default: DefaultWrapper,
  object: ObjectWrapper
}