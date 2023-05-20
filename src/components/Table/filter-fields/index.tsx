
// import { RadioFieldFilter } from './RadioFieldFilter'
// import { DateFieldFilter } from './DateFieldFilter'
// import { DateRangeFieldFilter } from './DateRangeFieldFilter'
import { FilterFieldsI } from '../../../models/tableComponent.model'
import TextFieldFilter from './TextFieldFilter'
import NumberFieldFilter from './NumberFieldFilter'
import SelectFieldFilter from './SelectFieldFilter'

interface FieldTypeI {
  text: JSX.Element,
  number: JSX.Element,
  select: JSX.Element,
  // radio: JSX.Element,
  // date: JSX.Element,
  // dateRange: JSX.Element,

}

export function FieldSelector (props: FilterFieldsI)  {
  const { field, form } = props

  const fieldType: FieldTypeI|any = {
    text: (<TextFieldFilter field={field} form={form} />),
    number: (<NumberFieldFilter field={field} form={form} />),
    select: (<SelectFieldFilter field={field} form={form} />),
    // radio: (<RadioFieldFilter control={control} field={field} />),
    // date: (<DateFieldFilter control={control} field={field} />),
    // dateRange: (<DateRangeFieldFilter control={control} field={field} />)
  }
  
  return fieldType[field.type] || (<></>)
}