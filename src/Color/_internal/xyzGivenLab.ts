import { LabColor, XyzColor } from "..";

export function xyzGivenLab(labColor: LabColor): XyzColor {
  let y = (labColor.l + 16) / 116;
  let x = labColor.a / 500 + y;
  let z = y - labColor.b / 200;

  if (Math.pow(y, 3) > 0.008856) {
    y = Math.pow(y, 3);
  } else {
    y = (y - 16 / 116) / 7.787;
  }

  if (Math.pow(x, 3) > 0.008856) {
    x = Math.pow(x, 3);
  } else {
    x = (x - 16 / 116) / 7.787;
  }

  if (Math.pow(z, 3) > 0.008856) {
    z = Math.pow(z, 3);
  } else {
    z = (z - 16 / 116) / 7.787;
  }

  return {
    x: x * 95.047,
    y: y * 100.0,
    z: z * 108.883
  };
}
