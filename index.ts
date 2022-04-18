import {Song, PlayList, PersonalPlayList} from './src/chapter10/second'

const p = new PersonalPlayList();
const s = new Song("ㅇ", "ㅇ");
const s2 = new Song("ㅇd", "ㅇd");
const s1 = new Song("s", "s");
p.append(s);
p.append(s1);


 p.remove(s2);
 // p.remove(s);
console.log(p);

