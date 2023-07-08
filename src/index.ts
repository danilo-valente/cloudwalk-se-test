import events from 'events';
import fs from 'fs';
import readline from 'readline';
import { Report } from './report';

async function parseFile(filepath: string): Promise<Report> {
  const rl = readline.createInterface({
    input: fs.createReadStream(filepath),
    crlfDelay: Infinity
  });

  const report = new Report();

  let lineCount = 0;

  rl.on('line', (line) => {
    report.ingestLine(line, ++lineCount);
  });

  await events.once(rl, 'close');

  return report;
}

parseFile(process.argv[2])
  .then(report => console.log(report.getDigest()))
  .catch(err => console.error(err));
