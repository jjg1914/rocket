export default class Entity {
  addComponent(component) {
    Object.assign(this, component);

    return this;
  }

  removeComponent(component) {
    delete this[component];

    return this;
  }

  destroy() {
    this.meta.engine.destroy(this);
  }
}
