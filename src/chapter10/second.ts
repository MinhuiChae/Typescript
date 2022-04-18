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
  
  isExist(song: Song): boolean {
    return this.findIndex(song) > -1;
  }

  findIndex(song: Song): number {
    return this.getTracks().findIndex((item) => item === song);
  }

  remove(song: Song): void {
    const idx = this.findIndex(song);
    if (idx === -1) return;
    this.getTracks().splice(idx,1);
    this.getSingers().delete(song.getSinger());
  }
}



export {Song, PlayList, PersonalPlayList };