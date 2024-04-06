export * from './data'
export * from './key'

export const getPathObj = (pathArr: string[]) => {
  const modelPath: string[] = [],
    schemaPath: string[] = []
  for (let i = 0, len = pathArr.length; i < len; i++) {
    const temp = pathArr[i]
    const isStringNumber = !isNaN(Number(temp))
    if (isStringNumber) {
      modelPath.push(temp)
      continue
    }
    modelPath.push(temp)
    schemaPath.push(temp)
  }
  return {
    modelPath,
    schemaPath
  }
}
