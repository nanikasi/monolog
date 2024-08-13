import type { Entity } from "../../util/utility-type";
import { ID } from "../value-object/id";
import type { User } from "./user";

export class Post implements Entity<ID> {
  private _id: ID;
  private _author: User;
  private _content: string;
  private _createdAt: Date;

  constructor({
    id,
    content,
    author,
    createdAt,
  }: { id: ID; content: string; author: User; createdAt: Date }) {
    this._id = id;
    this._content = content;
    this._author = author;
    this._createdAt = createdAt;
  }
  identity(): ID {
    return this._id;
  }
  equal(other: Entity<ID>): boolean {
    return this.identity().equals(other.identity());
  }

  public static new({ content, author }: { content: string; author: User }) {
    if (!content) {
      throw new Error("require content");
    }
    if (content.length > 60) {
      throw new Error("Length of content must be 60 or less");
    }
    if (!author) {
      throw new Error("require author");
    }

    return new Post({
      id: ID.generate(),
      content: content,
      author: author,
      createdAt: new Date(),
    });
  }

  get content(): string {
    return this._content;
  }
  get author(): User {
    return this._author;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
}
