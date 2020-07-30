// function hash(key, arrayLen) {
//   let total = 0
//   for (let char of key) {
//     let value = char.charCodeAt(0) - 96
//     total = (total + value) % arrayLen
//   }
//   return total
// }



class HashTable {
  constructor(size = 53) {
    this.KeyMap = new Array(size);
  }

  _hash(key) {
    let total = 0
    let WEIRD_PRIME = 31
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i]
      let value = char.charCodeAt(0) - 96
      total = (total + value + WEIRD_PRIME) % this.KeyMap.length
    }
    return total
  }


}


console.log(hash("Purple", 10))