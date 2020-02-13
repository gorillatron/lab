import { Bong, Token } from "src/bong/bong.model";

export class BongCreated {
  constructor(
    public readonly bong: Bong
  ) {}
}