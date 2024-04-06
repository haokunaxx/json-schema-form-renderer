/**
 * Performs a binary search on a sorted array and returns the index of the target element if found, otherwise -1.
 * @param arr The sorted array to search in.
 * @param target The target element to search for.
 * @returns The index of the target element if found, otherwise -1.
 */
export function binarySearch<T>(
  arr: T[],
  target: T,
  compareFn: (a: T, b: T) => number
): number {
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const cmp = compareFn(arr[mid], target)
    if (cmp === 0) {
      //相同
      return mid
    } else if (cmp < 0) {
      //中间的值小于目标值，查找的范围移动到中间至末尾区间
      left = mid + 1
    } else {
      //中间的值大于目标值，查找的范围移动到开始区间至中间
      right = mid - 1
    }
  }

  return -1
}

/**
 * Performs a binary search on a sorted array and returns the index of the closest element to the target if not found, otherwise the index of the target element.
 * @param arr The sorted array to search in.
 * @param target The target element to search for.
 * @param compareFn The function to compare elements in the array.
 * @returns The index of the closest element to the target if not found, otherwise the index of the target element.
 */
export function binarySearchClosest<T>(
  arr: T[],
  target: T,
  compareFn: (a: T, b: T) => number
): number {
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const cmp = compareFn(arr[mid], target)
    if (cmp === 0) {
      //相同
      return mid
    } else if (cmp < 0) {
      //中间的值小于目标值，查找的范围移动到中间至末尾区间
      left = mid + 1
    } else {
      //中间的值大于目标值，查找的范围移动到开始区间至中间
      right = mid - 1
    }
  }

  // If target is not found, return the index of the closest element
  if (right < 0) {
    return 0
  } else if (left >= arr.length) {
    return arr.length - 1
  } else {
    const leftDiff = Math.abs(compareFn(arr[right], target))
    const rightDiff = Math.abs(compareFn(arr[left], target))
    return leftDiff <= rightDiff ? right : left
  }
}
