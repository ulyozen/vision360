export function updateState<T>() {
  return (state: T, change: Partial<T>) => ({
    ...state,
    ...change
  })
}
