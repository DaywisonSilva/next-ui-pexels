let timer: NodeJS.Timeout = 0 as unknown as NodeJS.Timeout
const debounce = (fn: () => void, timeout: number) => {
  clearTimeout(timer)
  timer = setTimeout(fn, timeout)
}

export default debounce
