import type { Entity } from "../../util/utility-type";
import { ID } from "../value-object/id";

export class User implements Entity<ID> {
  private _id: ID;
  private _name: string;
  private _bio: string;

  constructor({ id, name, bio }: { id: ID; name: string; bio: string }) {
    if (!id) {
      throw new Error("ID is required");
    }
    if (!name) {
      throw new Error("Name is required");
    }
    if (!bio) {
      throw new Error("Bio is required");
    }

    if (name.length > 20) {
      throw new Error("Name's length must be 20 or less");
    }
    if (bio.length > 80) {
      throw new Error("Bio's length must be 80 or less");
    }

    this._id = id;
    this._name = name;
    this._bio = bio;
  }

  public static new({ name, bio }: { name: string; bio: string }) {
    return new User({ id: ID.generate(), name, bio });
  }

  identity(): ID {
    return this._id;
  }
  equal(other: Entity<ID>): boolean {
    return this._id.equals(other.identity());
  }

  get name(): string {
    return this._name;
  }

  get bio(): string {
    return this._bio;
  }

  public changeName(name: string): User {
    if (!name) {
      throw new Error("Name is required");
    }
    if (name.length > 20) {
      throw new Error("Name's length must be 20 or less");
    }

    this._name = name;

    return this;
  }

  public changeBio(bio: string): User {
    if (!bio) {
      throw new Error("Bio is required");
    }
    if (bio.length > 80) {
      throw new Error("Bio's length must be 80 or less");
    }

    this._bio = bio;

    return this;
  }
}
