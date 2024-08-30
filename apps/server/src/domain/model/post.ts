import dayjs from "dayjs";
import type { Entity } from "../../util/utility-type";
import { ID } from "../value-object/id";

export class Post implements Entity<ID> {
  private _id: ID;
  private _authorId: ID;
  private _content: string;
  private _createdAt: dayjs.Dayjs;

  constructor({
    id,
    content,
    authorId,
    createdAt,
  }: { id: ID; content: string; authorId: ID; createdAt: dayjs.Dayjs }) {
    this._id = id;
    this._content = content;
    this._authorId = authorId;
    this._createdAt = createdAt;
  }
  identity(): ID {
    return this._id;
  }
  equal(other: Entity<ID>): boolean {
    return this.identity().equals(other.identity());
  }

  public static new({ content, authorId }: { content: string; authorId: ID }) {
    if (!content) {
      throw new Error("require content");
    }
    if (content.length > 60) {
      throw new Error("Length of content must be 60 or less");
    }
    if (!authorId) {
      throw new Error("require author ID");
    }

    return new Post({
      id: ID.generate(),
      content: content,
      authorId: authorId,
      createdAt: new dayjs.Dayjs(),
    });
  }

  get content(): string {
    return this._content;
  }
  get authorId(): ID {
    return this._authorId;
  }
  get createdAt(): dayjs.Dayjs {
    return this._createdAt;
  }
}
