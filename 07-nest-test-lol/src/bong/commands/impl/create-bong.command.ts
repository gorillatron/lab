import { Token } from "src/bong/bong.model";

export class CreateBongTokenCommand {
  constructor(
    public readonly tokens: Token[]
  ) {}
}