import cloneDeep from 'lodash/cloneDeep'
import { isObject } from '@/utils/is'
/**
 * 根据时间戳和指定格式生成对应格式日期时间字符串, 默认为当前
 * @param { number } 时间戳
 * @param { string } 需要生成的格式
 * @return { string } 生成的结果
 */
export function timeFormat(timestamp = Date.now(), format = 'YYYY-MM-DD') {
  const time = new Date(timestamp),
    timeDetailObj = {
      'Y+': time.getFullYear(),
      'M+': time.getMonth() + 1,
      'D+': time.getDate(),
      'h+': time.getHours(),
      'm+': time.getMinutes(),
      's+': time.getSeconds()
    }
  return Object.keys(timeDetailObj).reduce(
    (str, key) =>
      str.replace(new RegExp('(' + key + ')'), (_, $1) =>
        String(timeDetailObj[key]).padStart($1.length, '0')
      ),
    format
  )
}

// FIXME:
export function deepMerge(mergeBase: any = {}, mergeWith: any = {}) {
  const res = cloneDeep(mergeBase)
  for (const key in res) {
    console.log('dm: ', key, res[key])
    res[key] = isObject(res[key])
      ? deepMerge(res[key], mergeWith[key])
      : (res[key] = mergeWith[key] ? mergeWith[key] : res[key])
  }
  return res
}

export function omit(obj: any, keys: string[]) {
  return Object.keys(obj).reduce((res, key) => {
    if (!keys.includes(key)) {
      res[key] = obj[key]
    }
    return res
  }, {} as any)
}
