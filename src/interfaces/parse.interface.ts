/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Parse<S = any, T = any> {
  parse(source: S): T;

  isEmpty(source: S): boolean;
}
