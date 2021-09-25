/**
 * @description Removes all the spaces, lowercase and adds `-` between the words
 * @param rawName Book name
 * @returns {string} Formated book name
 * @example
 * `My Book` -> `my-book`
 */
export function formatBookName(rawName: string): string {
  return rawName.toLowerCase().replace(/\s+/g, "-").trim();
}
