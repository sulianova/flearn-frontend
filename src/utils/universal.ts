export function invoke<Args extends unknown[], Result, Fallback>(target: ((...args: Args) => Result) | Fallback, ...args: Args): Result | Fallback {
  return typeof target === 'function' ? (target as (...args: Args) => Result)(...args) : target;
}
