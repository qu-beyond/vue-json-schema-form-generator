import jsonPointers from 'json-pointer'
import Ajv from 'ajv'
import { deepEquals, isObject, mergeObjects } from './helpers'

let ajv = createAjvInstance()

let formerCustomFormats = null
let formerMetaSchema = null

function createAjvInstance() {
  const ajv = new Ajv({
    errorDataPath: 'property',
    allErrors: true,
    multipleOfPrecision: 8,
    schemaId: 'auto',
    unknownFormats: 'ignore',
    jsonPointers: true
  })

  // add custom formats
  ajv.addFormat(
    'data-url',
    /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/
  )
  ajv.addFormat(
    'color',
    /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/
  )
  return ajv
}

function toErrorSchema(errors) {
  // Transforms a ajv validation errors list:
  // [
  //   {dataPath: ['level1', 'level2', 2, 'level3'], message: 'err a'},
  //   {dataPath: ['level1', 'level2', 2, 'level3'], message: 'err b'},
  //   {dataPath: ['level1', 'level2', 4, 'level3'], message: 'err b'},
  // ]
  // Into an error tree:
  // {
  //   level1: {
  //     level2: {
  //       2: {level3: {errors: ['err a', 'err b']}},
  //       4: {level3: {errors: ['err b']}},
  //     }
  //   }
  // }
  if (!errors.length) {
    return {}
  }
  return errors.reduce((errorSchema, error) => {
    const { dataPath, message } = error
    const path = [...dataPath]
    let parent = errorSchema

    for (const segment of path.slice(0)) {
      if (!(segment in parent)) {
        parent[segment] = {}
      }
      parent = parent[segment]
    }

    if (Array.isArray(parent.__errors)) {
      // We store the list of errors for this node in a property named __errors
      // to avoid name collision with a possible sub schema field named
      // 'errors' (see `validate.createErrorHandler`).
      parent.__errors = parent.__errors.concat(message)
    } else {
      if (message) {
        parent.__errors = [message]
      }
    }
    return errorSchema
  }, {})
}

export function toErrorList(errorSchema, fieldName = 'root') {
  // XXX: We should transform fieldName as a full field path string.
  let errorList = []
  if ('__errors' in errorSchema) {
    errorList = errorList.concat(
      errorSchema.__errors.map(stack => {
        return {
          stack: `${fieldName}: ${stack}`
        }
      })
    )
  }
  return Object.keys(errorSchema).reduce((acc, key) => {
    if (key !== '__errors') {
      acc = acc.concat(toErrorList(errorSchema[key], key))
    }
    return acc
  }, errorList)
}

export function hasErrors(errorSchema) {
  const { __errors: errors = [], ...rest } = errorSchema
  return errors.length > 0 || Object.getOwnPropertyNames(rest).length > 0
}

function transformAjvErrors(errors = [], schema) {
  if (errors === null) {
    return []
  }

  return errors.map(e => {
    let { dataPath, keyword, message, params, schemaPath } = e
    dataPath = jsonPointers.parse(dataPath)
    schemaPath = jsonPointers.parse(schemaPath.slice(1))
    let auxSchemaPath = schemaPath.slice(0, schemaPath.length - 1)

    if (keyword === 'required') {
      auxSchemaPath = auxSchemaPath.concat([
        'properties',
        params.missingProperty
      ])
    }
    const { title } = jsonPointers.get(schema, auxSchemaPath) || {}

    // put data in expected format
    return {
      keyword,
      title,
      dataPath,
      message,
      params, // specific to ajv
      schemaPath
    }
  })
}

function createErrorHandler(formData) {
  const handler = {
    // We store the list of errors for this node in a property named __errors
    // to avoid name collision with a possible sub schema field named
    // 'errors' (see `utils.toErrorSchema`).
    __errors: [],
    addError(message) {
      this.__errors.push(message)
    }
  }
  if (isObject(formData)) {
    return Object.keys(formData).reduce((acc, key) => {
      return { ...acc, [key]: createErrorHandler(formData[key]) }
    }, handler)
  }
  if (Array.isArray(formData)) {
    return formData.reduce((acc, value, key) => {
      return { ...acc, [key]: createErrorHandler(value) }
    }, handler)
  }
  return handler
}

function unwrapErrorHandler(errorHandler) {
  return Object.keys(errorHandler).reduce((acc, key) => {
    if (key === 'addError') {
      return acc
    } else if (key === '__errors') {
      return { ...acc, [key]: errorHandler[key] }
    }
    return { ...acc, [key]: unwrapErrorHandler(errorHandler[key]) }
  }, {})
}

/**
 * This function processes the formData with a user `validate` contributed
 * function, which receives the form data and an `errorHandler` object that
 * will be used to add custom validation errors for each field.
 */
export function validateFormData(
  formData,
  schema,
  customValidate,
  transformErrors,
  additionalMetaSchemas = [],
  customFormats = {}
) {
  const newMetaSchemas = !deepEquals(formerMetaSchema, additionalMetaSchemas)
  const newFormats = !deepEquals(formerCustomFormats, customFormats)

  if (newMetaSchemas || newFormats) {
    ajv = createAjvInstance()
  }

  // add more schemas to validate against
  if (
    additionalMetaSchemas &&
    newMetaSchemas &&
    Array.isArray(additionalMetaSchemas)
  ) {
    ajv.addMetaSchema(additionalMetaSchemas)
    formerMetaSchema = additionalMetaSchemas
  }

  // add more custom formats to validate against
  if (customFormats && newFormats && isObject(customFormats)) {
    Object.keys(customFormats).forEach(formatName => {
      ajv.addFormat(formatName, customFormats[formatName])
    })

    formerCustomFormats = customFormats
  }

  let validationError = null
  try {
    ajv.validate(schema, formData)
  } catch (err) {
    validationError = err
  }

  let errors = transformAjvErrors(ajv.errors, schema)

  // Clear errors to prevent persistent errors
  ajv.errors = null

  const noProperMetaSchema =
    validationError &&
    validationError.message &&
    typeof validationError.message === 'string' &&
    validationError.message.includes('no schema with key or ref ')

  if (noProperMetaSchema) {
    errors = [
      ...errors,
      {
        stack: validationError.message
      }
    ]
  }
  if (typeof transformErrors === 'function' && errors.length) {
    errors = transformErrors(errors)
  }

  const errorSchema = toErrorSchema(errors)

  if (noProperMetaSchema) {
    errorSchema.$schema = {
      __errors: [validationError.message]
    }
  }

  if (typeof customValidate !== 'function') {
    return { errors, errorSchema }
  }

  const errorHandler = customValidate(formData, createErrorHandler(formData))
  const userErrorSchema = unwrapErrorHandler(errorHandler)
  const newErrorSchema = mergeObjects(errorSchema, userErrorSchema, true)
  // XXX: The errors list produced is not fully compliant with the format
  // exposed by the jsonschema lib, which contains full field paths and other
  // properties.
  const newErrors = toErrorList(newErrorSchema)

  return {
    errors: newErrors,
    errorSchema: newErrorSchema
  }
}

/**
 * Validates data against a schema, returning true if the data is valid, or
 * false otherwise. If the schema is invalid, then this function will return
 * false.
 */
export function isValid(schema, data) {
  try {
    return ajv.validate(schema, data)
  } catch (e) {
    return false
  }
}
