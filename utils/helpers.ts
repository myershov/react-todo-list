/**
 * Recursively removes all properties with `null` or `undefined` values from an object or array.
 * Also removes empty objects and arrays.
 *
 * @param obj - The object or array to clean.
 * @returns A new object or array with `null`, `undefined`, and empty values removed, or `null` if the input was falsy.
 */
export function toCleanObject<T = unknown>(obj: T): Partial<T> | null {
  if (obj === undefined || obj === null) {
    return null
  }

  if (Array.isArray(obj)) {
    const cleanedArray = obj.map((item) => toCleanObject(item)).filter((item) => item !== undefined && item !== null)

    return cleanedArray.length > 0 ? (cleanedArray as unknown as T) : null
  }

  if (typeof obj === 'object') {
    const cleanedObject = Object.keys(obj).reduce((acc: Partial<T>, key) => {
      const value = (obj as any)[key]

      const cleanedValue = toCleanObject(value)

      if (cleanedValue !== undefined && cleanedValue !== null) {
        ;(acc as any)[key] = cleanedValue
      }

      return acc
    }, {})

    return Object.keys(cleanedObject).length > 0 ? cleanedObject : null
  }

  return obj
}

/**
 * Transforms an object into a MongoDB update query with $set and $unset operators.
 *
 * @template T - The type of the object to transform.
 * @param {T} obj - The object to transform into an update query.
 * @returns {Object} The update query containing $set and $unset operators.
 *
 * @example
 * const updateQuery = toUpdateQuery({ field1: 'value', field2: undefined });
 * // updateQuery will be: { $set: { field1: 'value' }, $unset: { field2: '' } }
 */
export function toUpdateQuery<T>(obj: T): Record<string, any> {
  const set: { [key: string]: any } = {}
  const unset: { [key: string]: any } = {}

  for (const key in obj) {
    if (obj[key] === undefined || obj[key] === null) {
      unset[key] = ''
    } else {
      set[key] = obj[key]
    }
  }

  return {
    ...(Object.keys(set).length && { $set: set }),
    ...(Object.keys(unset).length && { $unset: unset })
  }
}
