import { beforeAll } from "vitest";
(global as any).CSS = { supports: () => false }

beforeAll(() => {
  console.log("beforeAll")
  global.CSS.supports = (str: string) => false;
  global.CSS.escape = (str: string) => str;
})