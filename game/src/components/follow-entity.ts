import { Component } from "./component";

export class FollowEntity extends Component {
  constructor(
    public entityId: number,
    public radius = 0,
  ) {
    super("FollowEntity");
  }

  public toJSON() {
    return { ...super.toJSON(), entityId: this.entityId, radius: this.radius };
  }

  public static fromJSON({
    entityId,
    radius,
  }: Omit<ReturnType<typeof FollowEntity.prototype.toJSON>, "name">) {
    return new FollowEntity(entityId, radius);
  }
}
