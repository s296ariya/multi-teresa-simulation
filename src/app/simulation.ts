import { Enemy } from "./enemy.model";
import { Result } from "./result.model";
import { Teresa } from "./teresa.model";

export function runSimulation(setup): Result {
  let numRuns: number = setup.numRuns;
  let teresas: Teresa[] = [];
  for (let teresa of setup.teresas) {
    teresas.push(new Teresa(teresa.useEnergyAccessory, teresa.useLeftE2Talent));
  }
  let counts: number[] = Array.from({ length: 7 }).fill(0) as number[];

  for (let i = 0; i < numRuns; i++) {
    counts[simulateRun(teresas)]++;
  }

  return new Result(numRuns, counts);
}

function simulateRun(teresas: Teresa[]): number {
  let enemies: Enemy[] = Array.from({ length: 6 }, () => new Enemy());

  for (let teresa of teresas) {
    // Mark attack target
    let attackTarget = randomEnemy();
    markEnemy(enemies, attackTarget, teresas);
    // Roll splash Marks if Teresa is running Energy accessory
    if (teresa.useEnergyAccessory) {
      for (let i in enemies) {
        if (+i != attackTarget) {
          if (enemies[i].isMarked() && rollActiveSplashMark()) {
            markEnemy(enemies, +i, teresas);
          }
        }
      }
    }
    // Roll passive Marks
    for (let i in enemies) {
      if (rollPassiveMark()) {
        markEnemy(enemies, +i, teresas);
      }
    }
  }

  return enemies.filter(enemy => enemy.isSealedAtLeastOnce()).length;
}

function randomEnemy(): number {
  return randomInt(0, 5);
}

function randomInt(min, max): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollActiveSplashMark(): boolean {
  return randomInt(0, 99) < 75;
}

function rollPassiveMark(): boolean {
  return randomInt(0, 99) < 30;
}

function markEnemy(enemies: Enemy[], index: number, teresas: Teresa[]): void {
  enemies[index].numMarks++;
  if (enemies[index].isSealed() && enemies.filter(enemy => enemy.isSealedAtLeastOnce()).length < 6) {
    teresas
        .filter(teresa => teresa.useLeftE2Talent)
        .forEach(_ => markEnemy(enemies, randomEnemy(), teresas));
  }
}
