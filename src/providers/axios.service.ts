import {
  /* inject, */ BindingKey,
  BindingScope,
  ContextTags,
  injectable,
  Provider
} from "@loopback/core";
import axios, {Axios} from "axios";

/*
 * Fix the service type. Possible options can be:
 * - import {Axios} from 'your-module';
 * - export type Axios = string;
 * - export interface Axios {}
 */

@injectable({
  scope: BindingScope.TRANSIENT,
  tags: {
    [ContextTags.KEY]: "providers.AxiosProvider"
  }
})
export class AxiosProvider implements Provider<Axios> {
  static KEY = BindingKey.create<AxiosProvider>(`providers.AxiosProvider`);

  constructor(/* Add @inject to inject parameters */) {}

  value() {
    return axios.create();
  }
}
