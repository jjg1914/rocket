export default function(engine, f) {
  f((event) => {
    try {
      engine.emit(event);
    } catch (error) {
      engine.emit(error);
    }
  });
}
