import test from "node:test";
import assert from "node:assert/strict";
import { copyText } from "../src/shared/utils/copyText.mjs";

test("copyText writes the requested address to the clipboard", async () => {
  const writes = [];
  const clipboard = {
    async writeText(value) {
      writes.push(value);
    },
  };

  const copied = await copyText("alfi@example.com", clipboard);

  assert.equal(copied, true);
  assert.deepEqual(writes, ["alfi@example.com"]);
});

test("copyText reports unavailable clipboard access without claiming success", async () => {
  const copied = await copyText("alfi@example.com", {
    async writeText() {
      throw new Error("permission denied");
    },
  });

  assert.equal(copied, false);
  assert.equal(await copyText("alfi@example.com"), false);
});
