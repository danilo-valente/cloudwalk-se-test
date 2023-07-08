import { Action, MEANS_OF_DEATH } from './model';
import * as console from 'console';

export class Match {

  private totalKills = 0;

  private readonly players = new Set<string>();

  private readonly playerScores: Record<string, number> = {};

  private readonly reasonScores: Record<string, number> = {};

  ingest(action: Action, data: string) {
    if (action === 'Kill') {
      return this.ingestKill(data);
    }

    if (action === 'ClientUserinfoChanged') {
      return this.ingestClientUserinfoChanged(data);
    }
  }

  private addPlayer(player: string) {
    this.players.add(player);
    this.playerScores[player] ??= 0;
  }

  private ingestKill(data: string) {
    const [, killer, victim, reason] = data.match(/^\d+ \d+ \d+: (.*) killed (.*) by (.*)$/) ?? [];

    this.totalKills++;
    this.addPlayer(victim);

    if (MEANS_OF_DEATH.includes(reason)) {
      this.reasonScores[reason] ??= 0;
      this.reasonScores[reason]++;
    } else {
      console.warn(`Received invalid kill reason: ${reason}`);
    }

    // console.log(killer, victim, this.playerScores[killer], this.playerScores[victim]);

    if (killer === '<world>') {
      this.playerScores[victim]--;
    } else if (killer !== victim) {
      this.addPlayer(killer);
      this.playerScores[killer]++;
    }
  }

  private ingestClientUserinfoChanged(data: string) {
    const [, player] = data.match(/^\d+ n\\(.*)\\t\\/) ?? [];
    if (player) {
      this.addPlayer(player);
    }
  }

  getDigest() {
    return {
      total_kills: this.totalKills,
      players: [...this.players.values()],
      kills: this.playerScores,
      reasons: this.reasonScores
    };
  }
}
