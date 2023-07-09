import events from 'events';
import fs from 'fs';
import readline from 'readline';

import { DetailedDigest } from './model';
import { Match } from './match';
import { Report } from './report';
import { DetailedMatch } from './detailed-match';

type Options = {
  filepath: string;
  detailed: boolean;
  compare: boolean;
  debug: boolean;
};

export default async ({ filepath, detailed, compare, debug }: Options) => {
  if (!detailed) {
    const report = new Report(() => new Match(debug));

    await ingestFile(filepath, report);

    return report.getDigest();
  }

  const report = new Report(() => new DetailedMatch(debug));

  await ingestFile(filepath, report);

  const digest = report.getDigest();

  if (compare) {
    Object.entries(digest).forEach(verifyDigest);
  }

  return digest;
}

function verifyDigest([matchId, digest]: [string, DetailedDigest]) {

  if (!digest.exit) {
    console.log(`[${matchId}] Game ended prematurely`);
    return;
  }

  if (digest.exit !== 'Fraglimit') {
    console.log(`[${matchId}] Game ended due to ${digest.exit}`);
    return;
  }

  const mismatches = digest.players
    .sort((left, right) => left.localeCompare(right))
    .reduce<string[]>((list, player) => {
      const base = digest.kills[player] ?? 0;
      const target = digest.log_score[player] ?? 0;

      if (base === target) {
        return list;
      }

      return [...list, `${player}: ${base} (computed) vs ${target} (logged)`];
    }, []);

  if (mismatches.length === 0) {
    console.log(`[${matchId}] Computed kill score matches log`);
  } else {
    console.log(
      `[${matchId}] Computed kill score mismatches:`,
      mismatches.map(entry => `\n  - ${entry}`).join('')
    );
  }
}

async function ingestFile<T extends Match>(filepath: string, report: Report<T>) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filepath),
    crlfDelay: Infinity
  });

  let lineCount = 0;

  rl.on('line', (line) => {
    report.ingestLine(line, ++lineCount);
  });

  return new Promise<number>(async (resolve, reject) => {
    rl.on('error', reject);
    rl.on('close', () => resolve(lineCount));

    await events.once(rl, 'close');
  });
}
