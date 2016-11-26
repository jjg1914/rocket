export default class MovementComponent {
  constructor(options = {}) {
    this.xSpeed = options.xSpeed != null ? options.xSpeed : 0;
    this.ySpeed = options.ySpeed != null ? options.ySpeed : 0;
    this.xAccel = options.xAccel != null ? options.xAccel : 0;
    this.yAccel = options.yAccel != null ? options.yAccel : 0;
    this.xMax = options.xMax != null ? options.xMax : null;
    this.yMax = options.yMax != null ? options.yMax : null;
    this.gravity = options.gravity != null ? options.gravity : null;
    this.friction = options.friction != null ? options.friction : null;
  }
}
