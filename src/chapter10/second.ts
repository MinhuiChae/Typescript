class Song {
  private singer: string = "";
  private title: string = "";

  constructor(singer: string, title: string) {
    this.singer = singer;
    this.title = title;
  }

  getSinger(): string {
    return this.singer;
  }

  getTitle(): string {
    return this.title;
  }
}

class PlayList {
  private tracks: Song[] = new Array();
  private singers = new Map<string, string>();

  append(song: Song):void {
    this.getTracks().push(song);
    this.singers.set(song.getSinger(), song.getTitle());
  }

  getTracks(): Song[] {
    return this.tracks;
  }

  getSingers(): Map<string, string> {
    return this.singers;
  }
}

class PersonalPlayList extends PlayList {
  remove(song: Song): void {
    const idx = this.getTracks().findIndex((item) => item === song);
    this.getTracks().splice(idx,1);
    this.getSingers().delete(song.getSinger());
  }
}


const p = new PersonalPlayList();
const s = new Song("ㅇ", "ㅇ");
const s2 = new Song("ㅇd", "ㅇd");
const s1 = new Song("s", "s");
p.append(s);
p.append(s1);
p.append(s2);


p.remove(s2);
console.log(p.getTracks());
console.log(p);


