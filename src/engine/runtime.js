export default function(engine, f) {
  f((event) => {
    engine.emit(event);
  });
}
