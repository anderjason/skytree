import { Color } from "../../Color";
import { ArrayUtil } from "../../ArrayUtil";

export function colorsGivenCanvas(
  inputCanvas: HTMLCanvasElement,
  maxColors: number
): Color[] {
  const internalCanvas = document.createElement("canvas");
  internalCanvas.width = 50;
  internalCanvas.height = 50;

  const ctx = inputCanvas.getContext("2d")!;
  ctx.drawImage(inputCanvas, 0, 0, internalCanvas.width, internalCanvas.height);

  const frequencyByHexString = new Map<string, number>();

  const samplePixel = (x: number, y: number) => {
    const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;

    if (a === 255) {
      const color = Color.givenRgb255(r, g, b);
      const hexColor = color.toHexString();

      if (!frequencyByHexString.has(hexColor)) {
        frequencyByHexString.set(hexColor, 1);
      } else {
        frequencyByHexString.set(
          hexColor,
          frequencyByHexString.get(hexColor)! + 1
        );
      }
    }
  };

  const imgPixelCount = inputCanvas.width * inputCanvas.height;
  if (imgPixelCount <= maxColors) {
    for (let x = 0; x < inputCanvas.width; x++) {
      for (let y = 0; y < inputCanvas.height; y++) {
        samplePixel(x, y);
      }
    }
  } else {
    // random sampling
    const sampleCount = maxColors * 8;
    for (let n = 0; n < sampleCount; n++) {
      const x = Math.floor(Math.random() * inputCanvas.width);
      const y = Math.floor(Math.random() * inputCanvas.height);

      samplePixel(x, y);
    }
  }

  let results = [];
  for (const [hexColor, frequency] of frequencyByHexString) {
    results.push({
      hexColor,
      frequency,
    });
  }

  results = ArrayUtil.arrayWithOrderFromValue(
    results,
    (r) => r.frequency,
    true
  );

  const clusters = [];
  let needsCluster = [...results];
  const distanceThreshold = 10;

  while (needsCluster.length > 1) {
    const targetColor = Color.givenHex(needsCluster[0].hexColor);

    const removeHexColors = new Set<string>();

    const cluster = needsCluster.filter((item) => {
      const itemColor = Color.givenHex(item.hexColor);
      const distance = targetColor.toDistanceGivenColor(itemColor);

      const inCluster = distance < distanceThreshold;
      if (inCluster) {
        removeHexColors.add(item.hexColor);
      }

      return inCluster;
    });

    clusters.push(cluster);

    needsCluster = needsCluster.filter(
      (item) => !removeHexColors.has(item.hexColor)
    );
  }

  if (needsCluster.length > 0) {
    clusters.push([needsCluster[0]]);
  }

  results = clusters.map((cluster) => cluster[0]);

  results = results.slice(0, maxColors);

  let colors = results.map((r) => Color.givenHex(r.hexColor));

  const firstColor = colors[0];
  colors = ArrayUtil.arrayWithOrderFromValue(colors, (color) => {
    return firstColor.toDistanceGivenColor(color);
  });

  return colors;
}
