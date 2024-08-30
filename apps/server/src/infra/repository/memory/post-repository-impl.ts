import dayjs from "dayjs";
import { Post } from "../../../domain/model/post";
import type { PostRepository } from "../../../domain/repository/post-repository";
import { ID } from "../../../domain/value-object/id";

export class MemoryPostRepositoryImpl implements PostRepository {
  private memory: Post[];

  constructor() {
    const now = dayjs();
    this.memory = [
      new Post({
        id: new ID("1111"),
        content: "This is first",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("222222"),
        content: "This is second",
        authorId: new ID("b"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("3"),
        content: "This is third",
        authorId: new ID("c"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("1"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("2"),
        content: "神がコーヒーを作り、のちに人類がそれを発見した。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs("2024-08-30T03:51:16.841Z"),
      }),
      new Post({
        id: new ID("3"),
        content:
          "ブレンダン・アイクにDateの実装に10日しか与えなかったせいで、今日の私は非常に苦労している",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs("2024-08-30T04:51:16.841Z"),
      }),
      new Post({
        id: new ID("4"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("5"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("6"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("7"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("8"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("9"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("10"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("11"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("12"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("13"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("14"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("15"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("16"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("17"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("18"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("19"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("20"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("21"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("22"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("23"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("24"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("25"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("26"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("27"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("28"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("29"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("30"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("31"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("32"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("33"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("34"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("35"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("36"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("37"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("38"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("39"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("40"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("41"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("42"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("43"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("44"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("45"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("46"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("47"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("48"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("49"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("50"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("51"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("52"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("53"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("54"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("55"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("56"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("57"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("58"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("59"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("60"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("61"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("62"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("63"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("64"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("65"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("66"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("67"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("68"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("69"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("70"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("71"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("72"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("73"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("74"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("75"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("76"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("77"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("78"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
      new Post({
        id: new ID("79"),
        content:
          "カフェで作業してるなう。カフェの店員の元気が良くて気持ちがいい。last",
        authorId: new ID("102251917729564870565"),
        createdAt: dayjs(),
      }),
    ];
  }

  async list(limit: number, authorId: ID, start?: ID): Promise<Post[]> {
    const returnPosts: Post[] = [];
    let isStart = !start;
    for (const post of this.memory) {
      if (
        isStart &&
        returnPosts.length < limit &&
        post.authorId.equals(authorId)
      ) {
        returnPosts.push(post);
      }
      if (start && post.identity().equals(start)) {
        isStart = true;
      }
    }

    return returnPosts;
  }

  async findBy(id: ID): Promise<Post | null> {
    const found = this.memory.find((v) => v.identity().equals(id));
    return found ?? null;
  }

  async save(post: Post): Promise<void> {
    this.memory.push(post);
  }
  async delete(post: Post): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
