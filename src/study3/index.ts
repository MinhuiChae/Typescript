
function solution (id_list: any[], report: any, k: number) {
  let reports: any[] = [...Array.from(new Set(report))].map((a: string) => {return a.split(' ')});
    let count = new Map<string, number>();
    for(const i of reports) {
      count.set(i[1], count.get(i[1])+1 || 1);
    }

    let b = new Map<string, number>();
    
    for(const i of reports) {
      if(count.get(i[1]) >= k) {
        b.set(i[0], b.get(i[0])+1 || 1);
      }
    }

    let answer = id_list.map(a => b.get(a) || 0);

    return answer;

}

const ab = solution(	["muzi", "frodo", "apeach", "neo"], ["muzi frodo", "apeach frodo", "frodo neo", "muzi neo", "apeach muzi", "apeach neo"], 2);

console.log(ab);

// let f = new Map<number, number>();

// f.set(1,5||2);

// console.log(f.get(1));

// let fruit: any = {"a": "apple", "b":"banana", "c": "cherry"};

// for(let prop in fruit) {
//   console.log(prop, fruit[prop]);
// }


