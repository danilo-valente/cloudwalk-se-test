import { parseFileDetailed } from '../src/parser';
import { DetailedDigest } from '../src/model';

describe('parser', () => {
  let consoleWarnSpy: jest.SpyInstance;
  let digest: Record<string, DetailedDigest>;

  beforeAll(async () => {
    consoleWarnSpy = jest.spyOn(console, 'warn');

    digest = await parseFileDetailed({
      filepath: 'test-data/qgames.log'
    });
  });

  afterAll(() => {
    consoleWarnSpy.mockRestore();
  });

  it('should warn about invalid lines', () => {
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      '[97] Unexpected line format:  26  0:00 ------------------------------------------------------------'
    );
  });

  it('should compute players list', () => {
    expect(digest['game_1'].players.sort()).toMatchObject(["Isgalamido"])
    expect(digest['game_2'].players.sort()).toMatchObject(["Isgalamido","Mocinha"])
    expect(digest['game_3'].players.sort()).toMatchObject(["Dono da Bola","Isgalamido","Zeh"])
    expect(digest['game_4'].players.sort()).toMatchObject(["Assasinu Credi","Dono da Bola","Isgalamido","Zeh"])
    expect(digest['game_5'].players.sort()).toMatchObject(["Assasinu Credi","Isgalamido","Zeh","Zeh"])
    expect(digest['game_6'].players.sort()).toMatchObject(["Assasinu Credi","Dono da Bola","Isgalamido","Mal","Oootsimo","Zeh"])
    expect(digest['game_7'].players.sort()).toMatchObject(["Assasinu Credi","Chessus","Dono da Bola","Isgalamido","Mal","Oootsimo","Zeh"])
    expect(digest['game_8'].players.sort()).toMatchObject(["Assasinu Credi","Dono da Bola","Isgalamido","Mal","Oootsimo","Zeh"])
    expect(digest['game_9'].players.sort()).toMatchObject(["Assasinu Credi","Chessus","Dono da Bola","Mal","Oootsimo","Zeh"])
    expect(digest['game_10'].players.sort()).toMatchObject(["Assasinu Credi","Chessus","Dono da Bola","Isgalamido","Mal","Oootsimo","Zeh"])
    expect(digest['game_11'].players.sort()).toMatchObject(["Assasinu Credi","Chessus","Dono da Bola","Isgalamido","Mal","Oootsimo","Zeh"])
    expect(digest['game_12'].players.sort()).toMatchObject(["Assasinu Credi","Chessus","Dono da Bola","Isgalamido","Mal","Oootsimo","Zeh"])
    expect(digest['game_13'].players.sort()).toMatchObject(["Assasinu Credi","Chessus","Dono da Bola","Isgalamido","Mal","Oootsimo","Zeh"])
    expect(digest['game_14'].players.sort()).toMatchObject(["Assasinu Credi","Chessus","Dono da Bola","Isgalamido","Mal","Oootsimo","Zeh"])
    expect(digest['game_15'].players.sort()).toMatchObject(["Assasinu Credi","Assasinu Credi","Dono da Bola","Isgalamido","Oootsimo"])
    expect(digest['game_16'].players.sort()).toMatchObject(["Assasinu Credi","Dono da Bola","Isgalamido","Oootsimo","Zeh"])
    expect(digest['game_17'].players.sort()).toMatchObject(["Assasinu Credi","Dono da Bola","Isgalamido","Mal","Oootsimo","Zeh"])
    expect(digest['game_18'].players.sort()).toMatchObject(["Assasinu Credi","Dono da Bola","Isgalamido","Mal","Oootsimo","Zeh"])
    expect(digest['game_19'].players.sort()).toMatchObject(["Assasinu Credi","Dono da Bola","Isgalamido","Mal","Oootsimo","Zeh"])
    expect(digest['game_20'].players.sort()).toMatchObject(["Assasinu Credi","Dono da Bola","Isgalamido","Mal","Oootsimo","Zeh"])
    expect(digest['game_21'].players.sort()).toMatchObject(["Assasinu Credi","Dono da Bola","Isgalamido","Mal","Oootsimo","Zeh"])
  });

  it('should compute total_kills', () => {
    expect(digest['game_1'].total_kills).toBe(0)
    expect(digest['game_2'].total_kills).toBe(11)
    expect(digest['game_3'].total_kills).toBe(4)
    expect(digest['game_4'].total_kills).toBe(105)
    expect(digest['game_5'].total_kills).toBe(14)
    expect(digest['game_6'].total_kills).toBe(29)
    expect(digest['game_7'].total_kills).toBe(130)
    expect(digest['game_8'].total_kills).toBe(89)
    expect(digest['game_9'].total_kills).toBe(67)
    expect(digest['game_10'].total_kills).toBe(60)
    expect(digest['game_11'].total_kills).toBe(20)
    expect(digest['game_12'].total_kills).toBe(160)
    expect(digest['game_13'].total_kills).toBe(6)
    expect(digest['game_14'].total_kills).toBe(122)
    expect(digest['game_15'].total_kills).toBe(3)
    expect(digest['game_16'].total_kills).toBe(0)
    expect(digest['game_17'].total_kills).toBe(13)
    expect(digest['game_18'].total_kills).toBe(7)
    expect(digest['game_19'].total_kills).toBe(95)
    expect(digest['game_20'].total_kills).toBe(3)
    expect(digest['game_21'].total_kills).toBe(131)
  });

  it('should compute kills', () => {
    expect(digest['game_1'].kills).toMatchObject({"Isgalamido":0})
    expect(digest['game_2'].kills).toMatchObject({"Isgalamido":-9,"Mocinha":0})
    expect(digest['game_3'].kills).toMatchObject({"Dono da Bola":-1,"Isgalamido":1,"Zeh":-2})
    expect(digest['game_4'].kills).toMatchObject({"Dono da Bola":5,"Isgalamido":19,"Zeh":20,"Assasinu Credi":11})
    expect(digest['game_5'].kills).toMatchObject({"Zeh":0,"Isgalamido":2,"Assasinu Credi":-3})
    expect(digest['game_6'].kills).toMatchObject({"Oootsimo":8,"Isgalamido":3,"Zeh":7,"Dono da Bola":2,"Mal":0,"Assasinu Credi":1})
    expect(digest['game_7'].kills).toMatchObject({"Oootsimo":20,"Isgalamido":12,"Zeh":7,"Dono da Bola":8,"Mal":-3,"Assasinu Credi":16,"Chessus":0})
    expect(digest['game_8'].kills).toMatchObject({"Oootsimo":14,"Isgalamido":20,"Zeh":12,"Dono da Bola":-1,"Mal":-4,"Assasinu Credi":8})
    expect(digest['game_9'].kills).toMatchObject({"Oootsimo":7,"Dono da Bola":0,"Zeh":12,"Chessus":9,"Mal":1,"Assasinu Credi":4})
    expect(digest['game_10'].kills).toMatchObject({"Oootsimo":-1,"Dono da Bola":3,"Zeh":7,"Chessus":5,"Mal":1,"Assasinu Credi":3,"Isgalamido":4})
    expect(digest['game_11'].kills).toMatchObject({"Isgalamido":3,"Dono da Bola":-2,"Zeh":0,"Oootsimo":4,"Chessus":0,"Assasinu Credi":-3,"Mal":0})
    expect(digest['game_12'].kills).toMatchObject({"Isgalamido":22,"Dono da Bola":3,"Zeh":9,"Oootsimo":11,"Chessus":11,"Assasinu Credi":16,"Mal":-8})
    expect(digest['game_13'].kills).toMatchObject({"Isgalamido":-1,"Dono da Bola":-1,"Zeh":2,"Oootsimo":0,"Chessus":0,"Assasinu Credi":0,"Mal":0})
    expect(digest['game_14'].kills).toMatchObject({"Isgalamido":22,"Dono da Bola":0,"Zeh":3,"Oootsimo":9,"Chessus":7,"Assasinu Credi":-1,"Mal":-8})
    expect(digest['game_15'].kills).toMatchObject({"Dono da Bola":0,"Oootsimo":0,"Isgalamido":-3,"Assasinu Credi":0})
    expect(digest['game_16'].kills).toMatchObject({"Dono da Bola":0,"Oootsimo":0,"Isgalamido":0,"Assasinu Credi":0,"Zeh":0})
    expect(digest['game_17'].kills).toMatchObject({"Dono da Bola":-2,"Oootsimo":-1,"Isgalamido":0,"Assasinu Credi":-3,"Zeh":0,"Mal":-1})
    expect(digest['game_18'].kills).toMatchObject({"Isgalamido":1,"Oootsimo":0,"Dono da Bola":-1,"Assasinu Credi":2,"Zeh":2,"Mal":-1})
    expect(digest['game_19'].kills).toMatchObject({"Isgalamido":12,"Oootsimo":10,"Dono da Bola":10,"Assasinu Credi":7,"Zeh":20,"Mal":2})
    expect(digest['game_20'].kills).toMatchObject({"Isgalamido":0,"Oootsimo":1,"Dono da Bola":0,"Assasinu Credi":0,"Zeh":0,"Mal":0})
    expect(digest['game_21'].kills).toMatchObject({"Isgalamido":17,"Oootsimo":20,"Dono da Bola":10,"Assasinu Credi":13,"Zeh":19,"Mal":6})
  });

  it('should match computed scores with logged scores', () => {
    expect(digest['game_4'].kills).toMatchObject(digest['game_4'].log_score);
    expect(digest['game_7'].kills).toMatchObject(digest['game_7'].log_score);
    expect(digest['game_8'].kills).toMatchObject(digest['game_8'].log_score);
    expect(digest['game_19'].kills).toMatchObject(digest['game_19'].log_score);
    expect(digest['game_20'].kills).toMatchObject(digest['game_20'].log_score);
  });

  it('should compute reasons report', () => {
    expect(digest['game_1'].reasons).toMatchObject({})
    expect(digest['game_2'].reasons).toMatchObject({"MOD_TRIGGER_HURT":7,"MOD_ROCKET_SPLASH":3,"MOD_FALLING":1})
    expect(digest['game_3'].reasons).toMatchObject({"MOD_ROCKET":1,"MOD_TRIGGER_HURT":2,"MOD_FALLING":1})
    expect(digest['game_4'].reasons).toMatchObject({"MOD_TRIGGER_HURT":9,"MOD_FALLING":11,"MOD_ROCKET":20,"MOD_RAILGUN":8,"MOD_ROCKET_SPLASH":51,"MOD_MACHINEGUN":4,"MOD_SHOTGUN":2})
    expect(digest['game_5'].reasons).toMatchObject({"MOD_ROCKET":4,"MOD_ROCKET_SPLASH":4,"MOD_TRIGGER_HURT":5,"MOD_RAILGUN":1})
    expect(digest['game_6'].reasons).toMatchObject({"MOD_ROCKET":5,"MOD_RAILGUN":2,"MOD_SHOTGUN":4,"MOD_ROCKET_SPLASH":13,"MOD_TRIGGER_HURT":3,"MOD_FALLING":1,"MOD_MACHINEGUN":1})
    expect(digest['game_7'].reasons).toMatchObject({"MOD_FALLING":7,"MOD_TRIGGER_HURT":20,"MOD_ROCKET_SPLASH":49,"MOD_ROCKET":29,"MOD_SHOTGUN":7,"MOD_RAILGUN":9,"MOD_MACHINEGUN":9})
    expect(digest['game_8'].reasons).toMatchObject({"MOD_TRIGGER_HURT":9,"MOD_ROCKET":18,"MOD_ROCKET_SPLASH":39,"MOD_FALLING":6,"MOD_RAILGUN":12,"MOD_MACHINEGUN":4,"MOD_SHOTGUN":1})
    expect(digest['game_9'].reasons).toMatchObject({"MOD_TRIGGER_HURT":8,"MOD_ROCKET_SPLASH":25,"MOD_SHOTGUN":1,"MOD_ROCKET":17,"MOD_MACHINEGUN":3,"MOD_FALLING":3,"MOD_RAILGUN":10})
    expect(digest['game_10'].reasons).toMatchObject({"MOD_TELEFRAG":25,"MOD_TRIGGER_HURT":17,"MOD_ROCKET":4,"MOD_ROCKET_SPLASH":1,"MOD_RAILGUN":7,"MOD_BFG_SPLASH":2,"MOD_BFG":2,"MOD_MACHINEGUN":1,"MOD_CRUSH":1})
    expect(digest['game_11'].reasons).toMatchObject({"MOD_TRIGGER_HURT":7,"MOD_CRUSH":1,"MOD_ROCKET_SPLASH":4,"MOD_BFG_SPLASH":3,"MOD_MACHINEGUN":1,"MOD_RAILGUN":4})
    expect(digest['game_12'].reasons).toMatchObject({"MOD_TRIGGER_HURT":37,"MOD_RAILGUN":38,"MOD_ROCKET_SPLASH":35,"MOD_BFG_SPLASH":8,"MOD_ROCKET":25,"MOD_MACHINEGUN":7,"MOD_BFG":8,"MOD_FALLING":2})
    expect(digest['game_13'].reasons).toMatchObject({"MOD_TRIGGER_HURT":2,"MOD_ROCKET":1,"MOD_ROCKET_SPLASH":1,"MOD_BFG_SPLASH":1,"MOD_BFG":1})
    expect(digest['game_14'].reasons).toMatchObject({"MOD_RAILGUN":20,"MOD_TRIGGER_HURT":31,"MOD_ROCKET":23,"MOD_ROCKET_SPLASH":24,"MOD_MACHINEGUN":4,"MOD_BFG_SPLASH":10,"MOD_FALLING":5,"MOD_BFG":5})
    expect(digest['game_15'].reasons).toMatchObject({"MOD_TRIGGER_HURT":3})
    expect(digest['game_16'].reasons).toMatchObject({})
    expect(digest['game_17'].reasons).toMatchObject({"MOD_FALLING":3,"MOD_TRIGGER_HURT":6,"MOD_RAILGUN":2,"MOD_ROCKET_SPLASH":2})
    expect(digest['game_18'].reasons).toMatchObject({"MOD_ROCKET_SPLASH":4,"MOD_ROCKET":1,"MOD_FALLING":1,"MOD_TRIGGER_HURT":1})
    expect(digest['game_19'].reasons).toMatchObject({"MOD_TRIGGER_HURT":12,"MOD_ROCKET":27,"MOD_ROCKET_SPLASH":32,"MOD_SHOTGUN":6,"MOD_RAILGUN":10,"MOD_MACHINEGUN":7,"MOD_FALLING":1})
    expect(digest['game_20'].reasons).toMatchObject({"MOD_ROCKET_SPLASH":2,"MOD_ROCKET":1})
    expect(digest['game_21'].reasons).toMatchObject({"MOD_ROCKET":37,"MOD_TRIGGER_HURT":14,"MOD_RAILGUN":9,"MOD_ROCKET_SPLASH":60,"MOD_MACHINEGUN":4,"MOD_SHOTGUN":4,"MOD_FALLING":3})
  });
});
