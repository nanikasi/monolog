import type { Entity } from "../../util/utility-type";
import { ID } from "../value-object/id";

export class User implements Entity<ID> {
  private _id: ID;
  private _name: string;
  private _email: Email;

  constructor({ id, name, email }: { id: ID; name: string; email: Email }) {
    if (!id) {
      throw new Error("ID is required");
    }
    if (!name) {
      throw new Error("Name is required");
    }
    if (!email) {
      throw new Error("Email is required");
    }

    if (name.length > 20) {
      throw new Error("Name's length must be 20 or less");
    }

    this._id = id;
    this._name = name;
    this._email = email;
  }

  public static new({ name, email }: { name: string; email: Email }) {
    return new User({ id: ID.generate(), name, email });
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

  get email(): Email {
    return this._email;
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

  public changeEmail(email: Email): User {
    if (!email) {
      throw new Error("Email is required");
    }
    this._email = email;
    return this;
  }
}
