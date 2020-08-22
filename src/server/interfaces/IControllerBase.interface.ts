// every controller must implement interface IControllerBase and define initRoutes method

interface IControllerBase {
  /**
   * to register all routes for controller
   */
  initRoutes(): void;
}

export default IControllerBase;
