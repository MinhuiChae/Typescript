function solution2(n: number, lost: number[], reserve: number[]) {
  return n - lost.filter(a => {
    const b = reserve.find(r => Math.abs(r-a) <= 1)
    if(!b) return true
    reserve = reserve.filter(r => r !== b)
}).length
}



console.log(solution2(5, [2,4], [1, 3, 5]));