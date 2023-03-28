export class Roller {
  private _faces: number;
  private _distribution: Map<number, number>;
  private _lastRoll: number;

  constructor(faces: number = 6) {
    if (faces < 1) {
      throw new Error("Invalid number of faces. Must be greater than 0.");
    }
    this._faces = faces;
    this._distribution = new Map();
    for (let i = 1; i <= faces; i++) {
      this._distribution.set(i, 0);
    }
    this._lastRoll = 0;
  }

  public roll(value: number): number {
    if (value < 1 || value > this._faces) {
      return 0;
    }
    this._lastRoll = value;
    this._distribution.set(value, this._distribution.get(value)! + 1);
    return value;
  }

  public last(): number {
    return this._lastRoll;
  }

  public distribution(): Map<number, number> {
    return new Map(this._distribution);
  }

  public get faces(): number {
    return this._faces;
  }

  public set faces(value: number) {
    if (value < 1) {
      throw new Error("Invalid number of faces. Must be greater than 0.");
    }
    this._faces = value;
    this._distribution = new Map();
    for (let i = 1; i <= value; i++) {
      this._distribution.set(i, 0);
    }
    this._lastRoll = 0;
  }
}
