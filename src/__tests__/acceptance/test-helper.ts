import {
  Client,
  createRestAppClient,
  givenHttpServerConfig
} from "@loopback/testlab";
import {CodingTestApplication} from "../..";

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.PORT,
  });

  const app = new CodingTestApplication({
    rest: restConfig
  });

  await app.boot();

  // add test database
  app.bind("datasources.config.db").to({
    name: "db",
    connector: "memory"
  });

  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: CodingTestApplication;
  client: Client;
}
