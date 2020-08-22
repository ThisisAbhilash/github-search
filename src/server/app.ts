import path from 'path';
import express, { Application, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import Config from './utils/config';
import Logger from './utils/logger';
import { swaggerDocument } from './swagger';

class App {
  private app: Application;
  private port: number;
  private logger: Logger;

  constructor(appInit: {
    port: number;
    middleWares: any;
    controllers: any;
    exceptionHandlers: any;
  }) {
    this.app = express();
    this.port = appInit.port;

    this.app.disable('x-powered-by');
    this.middlewares(appInit.middleWares);
    this.swagger();
    this.routes(appInit.controllers);
    this.assets();
    this.exceptionHandler(appInit.exceptionHandlers);
    this.fallback(); // fallback to index.html

    this.logger = new Logger();
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private swagger() {
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument),
    );
  }
  private routes(controllers: {
    forEach: (arg0: (controller: any) => void) => void;
  }) {
    controllers.forEach((controller) => {
      this.app.use('/api/', controller.router);
    });
  }

  private assets() {
    this.app.use(express.static('build'));
  }

  private exceptionHandler(exceptionHandlers: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    exceptionHandlers.forEach((handler) => {
      this.app.use('/api', handler);
    });
  }

  private fallback() {
    this.app.use('*', (_, res: Response): any =>
      res.sendFile(path.join(__dirname + '/index.html')),
    );
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      this.logger.info(
        `App listening on the ${Config.get('APP_URL', 'http://localhost')}:${
          this.port
        }`,
      );
    });
  }
}

export default App;
