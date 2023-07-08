import { Match } from './match';
import { LogHeader } from './model';

export class Report {

  private readonly matches: Match[] = [];

  get currentMatch(): Match | null {
    return this.matches[this.matches.length - 1];
  }

  private parseHeader(line: string, lineno: number): [LogHeader, string] | null {
    const matches = line.trim().match(/^(\d+:\d+)\s+(\w+):\s*(.*)$/);
    if (!matches) {
      if (!/^\s*\d+:\d+\s+-+\s*$/.test(line)) {
        console.warn(`[${lineno}] Unexpected line format: ${line}`);
      }

      return null;
    }

    const [, time, action, data] = matches;
    return [{ time, action }, data];
  }

  async ingestLine(line: string, lineno: number) {
    const header = this.parseHeader(line, lineno);
    if (!header) {
      return;
    }

    const [{ action }, data] = header;
    if (action === 'InitGame') {
      this.matches.push(new Match());
    } else {
      this.currentMatch?.ingest(action, data);
    }
  }

  getDigest() {
    const json = this.matches.reduce((digest, match, index) => ({
      ...digest,
      [`game_${index + 1}`]: match.getDigest()
    }), {});

    return JSON.stringify(json, null, 2);
  }
}
