import {
  BasicDigest,
  ENTITYNUM_WORLD,
  HumanPlayer,
  Kill,
  LogHeader,
  MEANS_OF_DEATH,
  Player,
  worldTypeGuard
} from './model';

export class Match<T extends Required<BasicDigest> = Required<BasicDigest>> {

  private totalKills = 0;

  protected readonly players: Record<string, HumanPlayer> = {};

  private readonly reasonScores: Record<string, number> = {};

  constructor(
    protected readonly debug = false
  ) {
  }

  ingest(header: LogHeader, data: string): boolean {
    if (header.action === 'Kill') {
      const kill = this.parseKill(data);
      if (kill) {
        this.ingestKill(kill);
      } else {
        console.error(`Invalid kill data: ${data}`);
      }
      return true;
    }

    if (header.action === 'ClientUserinfoChanged') {
      this.ingestClientUserinfoChanged(data);
      return true;
    }

    // Unmapped actions are silently ignored
    if (this.debug) {
      console.log(`Ignoring unmapped action: ${header.action}`);
    }

    return false;
  }

  protected addPlayer(player: HumanPlayer) {
    if (this.players[player.clientId]) {
      this.players[player.clientId].name = player.name;
    } else {
      this.players[player.clientId] = player;
    }
  }

  protected buildPlayer(clientId: string, name: string): Player {
    if (worldTypeGuard(clientId)) {
      return {
        clientId,
        isWorld: true
      };
    }

    return {
      clientId,
      name,
      isWorld: false,
      score: 0
    };
  }

  private parseKill(data: string): Kill | null {
    const [, killerId, victimId, killerName, victimName, reason] = data.match(/^(\d+) (\d+) \d+: (.*) killed (.*) by (.*)$/) ?? [];

    const killer = this.buildPlayer(killerId, killerName);
    if (!killer) {
      console.error(`Invalid killer data: ${data}`);
      return null;
    }

    const victim = this.buildPlayer(victimId, victimName);
    if (!victim || victim.isWorld) {
      console.error(`Invalid victim data: ${data}`);
      return null;
    }

    if (!reason) {
      console.error(`Missing kill reason: ${data}`);
      return null;
    }

    if (!MEANS_OF_DEATH.includes(reason)) {
      console.warn(`Unexpected kill reason: ${reason}`);
    }

    return { killer, victim, reason };
  }

  private ingestKill({ killer, victim, reason }: Kill) {
    if (this.debug) {
      console.log(`[${killer.isWorld ? '<world>' : killer.name}] killed [${victim.name}] by [${reason}]`);
    }

    // Add kill reason to score
    this.reasonScores[reason] ??= 0;
    this.reasonScores[reason]++;

    // Add kill to total
    this.totalKills++;

    // Memoize victim player
    this.addPlayer(victim);

    if (killer.isWorld || killer.clientId === victim.clientId) {
      // Killed itself -> add penalty to score
      this.players[victim.clientId].score--;
    } else {
      // Memoize killer player
      this.addPlayer(killer);
      // Killed another player -> add kill to score
      this.players[killer.clientId].score++;
    }
  }

  private ingestClientUserinfoChanged(data: string) {
    const [, clientId, name] = data.match(/^(\d)+ n\\(.*)\\t\\/) ?? [];

    const player = this.buildPlayer(clientId, name);

    if (player && !player.isWorld) {
      // Memoize player
      this.addPlayer(player);
    } else {
      console.error(`Invalid user info change data: ${data}`);
    }
  }

  getDigest(): Required<BasicDigest> {

    const players = Object.values(this.players).map(({ name }) => name);

    const kills = Object.values(this.players)
      .reduce((map, { clientId, score }) => ({
        ...map,
        [this.players[clientId].name]: score
      }), {});

    return {
      total_kills: this.totalKills,
      players,
      kills,
      reasons: this.reasonScores
    };
  }
}
