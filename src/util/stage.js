export default class Stage {
  constructor(data) {
    this._data = data;
  }

  build(engine, config) {
    for (let e of this._data.entities) {
      let entity = {};

      for (let f in e) {
        if (e.hasOwnProperty(f)) {
          entity[f] = new config.components[f](e[f]);
        }
      }

      engine.addEntity(entity);
    }
  }
}
