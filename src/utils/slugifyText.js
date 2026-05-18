export function slugifyText (text) {
  return text
    .toLowerCase()
    .normalize("NFD")                 // split accented chars
    .replace(/[\u0300-\u036f]/g, "")  // remove accents
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
    // .toLowerCase()
    // .replace(/\s+/g, "-")
    // .replace(/[^\w-]/g, "")
}