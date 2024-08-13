import type { Entity } from "../../util/utility-type";
import { ID } from "../value-object/id";

export class Post implements Entity<ID> {
  private _id: ID;
  private _content: string;
  private _createdAt: Date;

  constructor({
    id,
    content,
    createdAt,
  }: { id: ID; content: string; createdAt: Date }) {
    this._id = id;
    this._content = content;
    this._createdAt = createdAt;
  }
  identity(): ID {
    return this._id;
  }
  equal(other: Entity<ID>): boolean {
    return this.identity().equals(other.identity());
  }

  public static new(content: string) {
    if (!content) {
      throw new Error("require content");
    }
    if (content.length > 60) {
      throw new Error("Length of content must be 60 or less");
    }

    return new Post({
      id: ID.generate(),
      content: content,
      createdAt: new Date(),
    });
  }

  get content(): string {
    return this._content;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
