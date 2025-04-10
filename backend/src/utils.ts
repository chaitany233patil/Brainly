export function random(len: number) {
  const hashed: String =
    "skjdbeybasKDBSUDWQALMKLnoqwdwbDUSHDhdesbdsj346863435162844";
  let hash: String = "";
  for (let i = 0; i <= len; i++) {
    hash += hashed[Math.floor(Math.random() * hashed.length)];
  }
  return hash;
}
