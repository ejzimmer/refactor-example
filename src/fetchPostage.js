export const fetchPostage = (count, type) =>
  Promise.resolve(8 * count * (type === "plant" ? 3 : 1))
