export type BulkDocument = {
  body: Buffer | ArrayBuffer;
  originalname: string;
};

export type DocumentBody = {
  buffer: ArrayBuffer | Buffer;
  originalname: string;
};
