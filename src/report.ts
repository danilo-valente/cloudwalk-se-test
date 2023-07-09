import { Match } from './match';
import { LogHeader } from './model';

export class Report<T extends Match = Match> {

  private readonly matches: T[] = [];

  constructor(
    private readonly matchFactory: () => T
  ) {
  }

  get currentMatch(): T | null {
    return this.matches[this.matches.length - 1];
  }

  set currentMatch(match: T) {
    this.matches.push(match);
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
    const result = this.parseHeader(line, lineno);
    if (!result) {
      return;
    }

    const [header, data] = result;
    if (header.action === 'InitGame') {
      this.matches.push(this.matchFactory());
    } else {
      this.currentMatch ??= this.matchFactory();
      this.currentMatch.ingest(header, data);
    }
  }

  getDigest(): Record<string, ReturnType<T['getDigest']>> {
    return this.matches.reduce((digest, match, index) => ({
      ...digest,
      [`game_${index + 1}`]: match.getDigest()
    }), {});
  }
}
