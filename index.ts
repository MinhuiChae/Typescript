function solution(arr: number[]) {
  let min: number = 0;
  if(arr.length === 1) {
    arr.shift();
    arr.push(-1)
    return arr;
  } else {

      min = math(arr[0], arr[1]);
      
      for(let i =2; i< arr.length; i++) {
        if(math(min, arr[i]) === arr[i]) {
          min = arr[i];
        }
      }

      console.log(min);
      console.log(arr);

    const minIndex = arr.findIndex((a) => a === min);
    arr.splice(minIndex, 1);
    return arr;
  }
}

function math(a: number, b: number) {
  if(a<b) return a;
  else return b;
}


console.log(solution([8,4,9,7]));

