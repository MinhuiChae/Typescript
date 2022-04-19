const randomNumber: number = Math.floor(Math.random()*99+1);
console.log(randomNumber);



interface Window {
  compareNumber: any;
}

((w: Window) => {
  function compareNumber (answer: number): string {
    if(randomNumber > answer) {
      return "더 높은 숫자를 선택하세요.";
    } else if(randomNumber === answer) {
      return "정답입니다.";
    } else {
      return "더 낮은 숫자를 선택하세요";
    }
  }
   w.compareNumber = compareNumber;
})(window);



  

