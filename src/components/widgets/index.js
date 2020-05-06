import CheckboxesWidget from './CheckboxesWidget'
import CheckboxWidget from './CheckboxWidget'
import ColorWidget from './ColorWidget'
import DateWidget from './DateWidget'
import EmailWidget from './EmailWidget'
import FileWidget from './FileWidget'
import HiddenWidget from './HiddenWidget'
import PasswordWidget from './PasswordWidget'
import RadioWidget from './RadioWidget'
import SelectWidget from './SelectWidget'
import SwitchWidget from './SwitchWidget'
import TextareaWidget from './TextareaWidget'
import TextWidget from './TextWidget'

export const widgetMap = {
  boolean: {
    checkbox: CheckboxWidget,
    radio: RadioWidget,
    select: SelectWidget,
    switch: SwitchWidget,
    hidden: HiddenWidget
  },
  string: {
    text: TextWidget,
    password: PasswordWidget,
    email: EmailWidget,
    hostname: TextWidget,
    ipv4: TextWidget,
    ipv6: TextWidget,
    uri: TextWidget,
    'data-url': FileWidget,
    radio: RadioWidget,
    select: SelectWidget,
    textarea: TextareaWidget,
    hidden: HiddenWidget,
    date: DateWidget,
    // TODO: implement missing widgets
    // datetime: 'DateTimeWidget',
    // 'date-time': 'DateTimeWidget',
    color: ColorWidget,
    file: FileWidget
  },
  number: {
    text: TextWidget,
    select: SelectWidget,
    // updown: 'UpDownWidget',
    // range: 'RangeWidget',
    radio: RadioWidget,
    hidden: HiddenWidget
  },
  integer: {
    text: TextWidget,
    select: SelectWidget,
    // updown: 'UpDownWidget',
    // range: 'RangeWidget',
    radio: RadioWidget,
    hidden: HiddenWidget
  },
  array: {
    select: SelectWidget,
    checkboxes: CheckboxesWidget,
    files: FileWidget,
    hidden: HiddenWidget
  }
}
