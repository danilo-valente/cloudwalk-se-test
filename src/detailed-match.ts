import { Action, DetailedDigest, Exit, LogHeader } from './model';
import { Match } from './match';

export class DetailedMatch extends Match {

  private readonly logScore: Record<string, number> = {};

  private exit: Exit | null = null;

  ingest(header: LogHeader, data: string) {
    if (header.action === 'Exit') {
      this.ingestExit(data);
      return true;
    }

    if (header.action === 'score') {
      this.ingestScore(data);
      return true;
    }

    return super.ingest(header, data);
  }

  private ingestExit(data: string) {
    const [, reason] = data.match(/^(.*)\s* hit\.$/) ?? [];

    if (this.exit) {
      console.warn(`Already exited, but received another exit event: ${this.exit} -> ${reason}`);
    } else if (this.debug) {
      console.log(`Exit: ${reason}`);
    }

    this.exit = reason;
  }

  private ingestScore(data: string) {
    const [, score, clientId, name] = data.match(/^(-?\d+)\s*ping:\s+\d+\s*client:\s+(\d+)\s*(.+)$/) ?? [];

    if (this.debug) {
      console.log(`[${name}] score: ${score}`);
    }

    const player = this.buildPlayer(clientId, name);

    if (player && !player.isWorld) {
      // Memoize player
      this.addPlayer(player);
      // Register score
      this.logScore[player.clientId] = parseInt(score, 10);
    } else {
      console.error(`Invalid user info change data: ${data}`);
    }
  }

  getDigest(): DetailedDigest {

    const logScore = Object.entries(this.logScore)
      .reduce((map, [clientId, score]) => ({
        ...map,
        [this.players[clientId].name]: score
      }), {});

    return {
      ...super.getDigest(),
      exit: this.exit,
      log_score: logScore
    };
  }
}
