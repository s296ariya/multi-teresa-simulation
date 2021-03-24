export class Enemy {
  numMarks: number;

  constructor() {
    this.numMarks = 0;
  }

  isMarked(): boolean {
    return this.numMarks % 2 == 1;
  }

  isSealed(): boolean {
    return this.isSealedAtLeastOnce() && this.numMarks % 2 == 0;
  }

  isSealedAtLeastOnce(): boolean {
    return this.numMarks >= 2;
  }
}
