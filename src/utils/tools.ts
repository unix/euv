
export const tools = {
  assignChild: <T>(source: T, child: string, val: object): T => {
    return Object.assign({}, source, {
      [child]: Object.assign({}, source[child], val),
    })
  },
}


