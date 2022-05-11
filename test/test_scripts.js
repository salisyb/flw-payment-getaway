function generate(count) {
  const characters = "1234567890abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let x = 0; x < count; x++) {
    result += characters[Math.floor(Math.random() * 36)];
  }
  return result;
}

console.log(generate(11));
