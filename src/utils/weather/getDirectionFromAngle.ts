export function getDirection(angle: number): string {
  if (angle < 0 || angle > 360) {
    throw new Error("Angle must be between 0 and 360 degrees");
  }

  const directions = [
    "N", // North
    "NNE", // North-North-East
    "NE", // North-East
    "ENE", // East-North-East
    "E", // East
    "ESE", // East-South-East
    "SE", // South-East
    "SSE", // South-South-East
    "S", // South
    "SSW", // South-South-West
    "SW", // South-West
    "WSW", // West-South-West
    "W", // West
    "WNW", // West-North-West
    "NW", // North-West
    "NNW", // North-North-West
  ];

  const anglePerDirection = 360 / directions.length;
  const directionIndex =
    Math.floor((angle + anglePerDirection / 2) / anglePerDirection) % directions.length;

  return directions[directionIndex];
}
