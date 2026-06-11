export class DomainEvent {
  constructor(
    public readonly name: string,
    public readonly data: Record<string, unknown>,
  ) {}

  public static fromPrimitives(
    name: string,
    data: Record<string, unknown>,
  ): DomainEvent {
    return new DomainEvent(name, data);
  }
}
