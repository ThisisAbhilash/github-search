// every external service like database / redis must implement interface IProviderBase,
// and define init, status & shutdown methods

interface IProviderBase {
  /**
   * to return status
   */
  status(): string;

  /**
   * to gracefully shutdown
   */
  shutdown(): void;
}

export default IProviderBase;
