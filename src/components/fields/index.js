import ArrayFieldSelector from './ArrayFieldSelector'
import BooleanField from './BooleanField'
import NumberField from './NumberField'
import ObjectField from './ObjectField'
import StringField from './StringField'
import NullField from './NullField'
import UnsupportedField from './UnsupportedField'

export const fieldMap = {
  array: ArrayFieldSelector,
  boolean: BooleanField,
  integer: NumberField,
  number: NumberField,
  object: ObjectField,
  string: StringField,
  null: NullField,
  unsupported: UnsupportedField
}