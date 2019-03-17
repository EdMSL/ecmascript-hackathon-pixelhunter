import ErrorView from './error-view.js';

class ErrorController {
  constructor(error) {
    this.errorView = new ErrorView(error);
  }
}

export default ErrorController;
