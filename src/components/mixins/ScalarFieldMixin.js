import FieldBaseMixin from './FieldBaseMixin'
import { optionsList, getWidget, isSelect, hasWidget } from '../../utils/helpers'

export default function(Type, cast = a => a) {
  return {
    mixins: [FieldBaseMixin(Type, cast)],
    computed: {
      widget() {
        const { schema, widgets } = this
        const { format } = schema
        let defaultWidget = this.enumOptions ? 'select' : 'text'
        if (format && hasWidget(schema, format, widgets)) {
          defaultWidget = format
        }
        let { widget = defaultWidget } = this.uiOptions
        return getWidget(schema, widget, widgets)
      },
      enumOptions() {
        const { schema } = this
        if (isSelect(schema)) {
          return optionsList(schema)
        }
        return undefined
      }
    }
  }
}
