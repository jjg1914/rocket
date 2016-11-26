export default class State {
  constructor(builder) {
    this._listeners = {};

    if (builder != null) {
      builder(this);
    }
  }

  send(event, engine) {
    const type = (event instanceof Error ? "error" : event.type);

    if (this._listeners[type]) {
      for (let handler of this._listeners[type]) {
        handler(event, engine);
      }
      return true;
    } else {
      return false;
    }
  }

  on(event, handler) {
    if (this._listeners[event] == null) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(handler);

    return this;
  }
}
