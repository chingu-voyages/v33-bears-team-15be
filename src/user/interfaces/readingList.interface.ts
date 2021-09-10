export interface IReadingList {
  name: string;
  description: string;
  books: string[];
  kind: ReadingListType;
}

export enum ReadingListKind {
  PUBLIC = "0",
  PRIVATE = "1",
}

export type ReadingListType = `${ReadingListKind}`;
