import Entity from "./entity";

export default class Engine {
  constructor() {
    this._entityCounter = 0;
    this._entities = new Map();

    this._states = [];
    this._events = [];
  }

  run(target, filters, f) {
    if (target instanceof Array) {
      f = filters;
      filters = target;

      for (let entity of this._entities) {
        if (filters.every((e) => entity[1].hasOwnProperty(e))) {
          f(entity[1]);
        }
      }
    } else if (target != null) {
      if (filters.every((e) => target.hasOwnProperty(e))) {
        f(target);
      }
    }

    return this;
  }

  emit(event) {
    try {
      this._events.push(event);

      if (this._events.length === 1) {
        while (this._events.length > 0) {

          for (let state of this._states) {
            if (state.send(this._events[0], this)) {
              break;
            }
          }

          this._events.shift();
        }
      }

      return this;
    } catch (e) {
      this._events.length = 0;
      throw e;
    }
  }

  push(state) {
    this._states.unshift(state);
    this.emit({ type: "enter" });

    return this;
  }

  pop() {
    if (this._states.length > 0) {
      this.emit({ type: "leave" });
      this._states.shift();
    }

    return this;
  }

  swap(state) {
    return this.pop().push(state);
  }

  create() {
    this._entityCounter += 1;

    const entity = new Entity();
    this._entities.set(this._entityCounter, entity);

    return entity.addComponent({
      meta: {
        id: this._entityCounter,
        engine: this,
      },
    });
  }

  destroy(entity) {
    this._entities.delete(entity.meta.id);
  }
}
