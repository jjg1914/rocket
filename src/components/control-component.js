export default class ControlComponent {
  constructor(options = {}) {
    this.xAccel = options.xAccel != null ? options.xAccel : 0;
    this.yAccel = options.yAccel != null ? options.yAccel : 0;
    this.jumpSpeed = options.jumpSpeed != null ? options.jumpSpeed : 0;
  }
}
