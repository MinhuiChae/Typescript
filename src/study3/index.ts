
function solution(id_list: any[], report: any, k: any) {
  let reports: any[] = [...Array.from(new Set(report))].map((a: string)=>{return a.split(' ')});
    let counts = new Map<string, number>();
    for (const bad of reports){
        counts.set(bad[1],counts.get(bad[1])+1||1)
    }
    let good = new Map();
    for(const report of reports){
        if(counts.get(report[1])>=k){
            good.set(report[0],good.get(report[0])+1||1)
        }
    }
    let answer = id_list.map(a=>good.get(a)||0)
    return answer;
}


const ab = solution(	["muzi", "frodo", "apeach", "neo"], ["muzi frodo", "apeach frodo", "frodo neo", "muzi neo", "apeach muzi"], 2);



let fruit: any = {"a": "apple", "b":"banana", "c": "cherry"};

for(let prop in fruit) {
  console.log(prop, fruit[prop]);
}
console.log(fruit);