export function numberWithQuantization(
  input: number,
  quantum: number,
  type: "cover" | "fit"
) {
  const remainder = input % quantum;
  const sign = input >= 0 ? 1 : -1;
  const mod = type == "cover" && remainder ? quantum : 0;

  return input - remainder + sign * mod;
}
