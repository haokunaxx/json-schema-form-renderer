const toStr = Object.prototype.toString

export enum TypeMap {
  NUMBER = '[object Number]',
  STRING = '[object String]',
  BOOLEAN = '[object Boolean]',
  ARRAY = '[object Array]',
  OBJECT = '[object Object]',
  FUNCTION = '[object Function]'
}

export const isString = (target: unknown): target is string =>
  toStr.call(target) === TypeMap.STRING

export const isArray = (target: unknown): target is any[] =>
  toStr.call(target) === TypeMap.ARRAY

export const isFn = (target: unknown): target is Function =>
  toStr.call(target) === TypeMap.FUNCTION

export const isObject = (target: unknown): target is Object =>
  toStr.call(target) === TypeMap.OBJECT

export const isNull = (target: unknown): target is null => target === null

export const isEmpty = (target: unknown): boolean => {
  if (isObject(target)) {
    return Object.keys(target).length === 0
  }
  if (isArray(target)) {
    return target.length === 0
  }

  if (target instanceof Map || target instanceof Set) {
    return target.size === 0
  }

  return false
}

export const isDef = (target: unknown): boolean => target !== undefined

export const isUnDef = (target: unknown): boolean => !isDef(target)

export function isNullOrUnDef(target: unknown): target is null | undefined {
  return isUnDef(target) || isNull(target)
}

export const isBoolean = (target: unknown): target is boolean =>
  toStr.call(target) === TypeMap.BOOLEAN

export const isNumber = (target: unknown): target is number =>
  toStr.call(target) === TypeMap.NUMBER
