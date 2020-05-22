import { assertStrictEq } from "https://deno.land/std@0.52.0/testing/asserts.ts";

import wcwidth, { config } from "./mod.ts";

Deno.test("handles regular strings", () => {
  assertStrictEq(wcwidth("abc"), 3);
});

Deno.test("handles multibyte strings", () => {
  assertStrictEq(wcwidth("字的模块"), 8);
});

Deno.test("handles multibyte characters mixed with regular characters", () => {
  assertStrictEq(wcwidth("abc 字的模块"), 12);
});

Deno.test("ignores control characters e.g. \\n", () => {
  assertStrictEq(wcwidth("abc\n字的模块\ndef"), 14);
});

Deno.test("ignores nul (charcode 0)", () => {
  assertStrictEq(wcwidth(String.fromCharCode(0)), 0);
});

Deno.test("ignores nul mixed with chars", () => {
  assertStrictEq(wcwidth("a" + String.fromCharCode(0) + "\n字的"), 5);
});

Deno.test("can have custom value for nul", () => {
  assertStrictEq(
    config({
      nul: 10,
    })(String.fromCharCode(0) + "a字的"),
    15,
  );
});

Deno.test("can have custom control char value", () => {
  assertStrictEq(
    config({
      control: 1,
    })("abc\n字的模块\ndef"),
    16,
  );
});

Deno.test("negative custom control chars == -1", () => {
  assertStrictEq(
    config({
      control: -1,
    })("abc\n字的模块\ndef"),
    -1,
  );
});
