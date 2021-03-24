export class Result {
  numRuns: number;
  counts: number[];

  constructor(numRuns: number=1, counts: number[]=[]) {
    this.numRuns = numRuns;
    this.counts = counts;
  }
}
