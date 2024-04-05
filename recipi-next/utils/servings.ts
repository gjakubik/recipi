export function parseServings(servings?: string): [number, number] {
  if (!servings) {
    return [0, 0]
  }
  //Check if string is a single number
  if (!servings.includes('-')) {
    const num = parseInt(servings)
    return [num, num]
  }

  const [min, max] = servings.split('-').map((s) => parseInt(s))

  return [min, max]
}
