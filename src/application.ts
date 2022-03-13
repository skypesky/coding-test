import {BootMixin} from "@loopback/boot";
import {ApplicationConfig} from "@loopback/core";
import {RepositoryMixin} from "@loopback/repository";
import {RestApplication, RestBindings} from "@loopback/rest";
import {
  RestExplorerBindings,
  RestExplorerComponent
} from "@loopback/rest-explorer";
import {ServiceMixin} from "@loopback/service-proxy";
import path from "path";
import {MySequence} from "./sequence";
import {AppProxy} from "./type";

export {ApplicationConfig};

export class CodingTestApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication))
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static("/", path.join(__dirname, "../public"));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: "/explorer"
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ["controllers"],
        extensions: [".controller.js"],
        nested: true
      }
    };

    // 显示详细报错到前端
    this.bind(RestBindings.ERROR_WRITER_OPTIONS).to({debug: true});

    // 绑定代理配置
    this.bind("appProxy").to(this.getCurrentProxy());
  }

  public getCurrentProxy(): AppProxy {
    const [host, port] = [
      process.env.proxy_host,
      +(process.env.proxy_port ?? 0) || undefined
    ];

    return host && port ? {host, port} : undefined;
  }
}
