export type TLastFmError<T> =
  | (T & { message: undefined; error: undefined })
  | {
      message: string;
      error: number;
    };
