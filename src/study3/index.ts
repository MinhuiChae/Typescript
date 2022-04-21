
//1번 문제 : 회원신고
// function solution (id_list: any[], report: any, k: number) {
//   let reports: any[] = [...Array.from(new Set(report))].map((a: string) => {return a.split(' ')});
//     let count = new Map<string, number>();
//     for(const i of reports) {
//       count.set(i[1], count.get(i[1])+1 || 1);
//     }

//     let b = new Map<string, number>();
    
//     for(const i of reports) {
//       if(count.get(i[1]) >= k) {
//         b.set(i[0], b.get(i[0])+1 || 1);
//       }
//     }

//     let answer = id_list.map(a => b.get(a) || 0);

// }

// const ab = solution(	["muzi", "frodo", "apeach", "neo"], ["muzi frodo", "apeach frodo", "frodo neo", "muzi neo", "apeach muzi", "apeach neo"], 2);

// console.log(ab);


// 2번 문제 : 로또당첨

// function solution(lottos: number[], win_nums: number[]) {
//   let list:number[] = [];
//   let score = new Array();
//   let count: number = 0;
//   lottos.map(a => {
//     if(a === 0) {
//       count ++;
//     }
//   })

//   win_nums.map((a: number) => {
//     lottos.map((b: number) => {
//       if(a == b) {
//         list.push(a);
//       }
//     })
//   })

//   const c = list.length;

//   for(let i=1; i<=count; i++) {
//     let a:number = Math.floor(Math.random()*44+1);
    
//     if(lottos.indexOf(a) === -1) {
//       lottos.push(a);

//       if(win_nums.indexOf(a) >0) {
//         list.push(a);
//       }

//     }else i--
    
//   }

//   let index = lottos.indexOf(0);

//   if(index > -1) {
//   lottos.splice(index, count);
//   }
//   const f = list.length; 


//   switch(f) {
//     case 6:
//       score[0] = 1;
//       break;
//     case 5:
//       score[0] = 2;
//       break;
//     case 4:
//       score[0] = 3;
//       break;
//     case 3:
//       score[0] = 4;
//       break;
//     case 2:
//       score[0] = 5;
//       break;
//     default:
//       score[0] = 6;
//       break;
//   }

//   switch(c) {
//     case 6:
//       score[1] = 1;
//       break;
//     case 5:
//       score[1] = 2;
//       break;
//     case 4:
//       score[1] = 3;
//       break;
//     case 3:
//       score[1] = 4;
//       break;
//     case 2:
//       score[1] = 5;
//       break;
//     default:
//       score[1] = 6;
//       break;
//   }

  
//   console.log(list);
//   console.log(lottos);
//   console.log(c);
//   console.log(f);
//   return score;
// }


// const a = solution([44,1,0,45,31,25] , [31,10,45,1,6,19]);

// console.log(a);


// 3번문제 : 체육복


