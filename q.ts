import Benchmark from "benchmark";
import { ArrayQueue } from "./ArrayQueue";
import { CircularQueue } from "./CircularQueue";
const suite = new Benchmark.Suite();

function TestCircular(size: number, n: number) {
  const q = new CircularQueue(size);
  for (let i = 0; i < n; i++) q.enQueue(i);
}

function TestArray(size: number, n: number) {
  const q = new ArrayQueue(size);
  for (let i = 0; i < n; i++) q.enQueue(i);
}

for (let i = 0; i < 4; i++) {
  suite.add(`Array#${1 << i}`, () => {
    TestArray(1 << i, 100);
  });
  suite.add(`Circular#${1 << i}`, () => {
    TestCircular(1 << i, 100);
  });
  suite.add(`Array#${16 << i}`, () => {
    TestArray(16 << i, 10000);
  });
  suite.add(`Circular#${16 << i}`, () => {
    TestCircular(16 << i, 10000);
  });
}
suite
  .on("cycle", function (event) {
    console.log("event:", String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is ", this.filter("fastest").map("name"));
  })
  .run({ async: true });
/*
event: Array#1 x 291,168 ops/sec ±0.29% (94 runs sampled)
event: Circular#1 x 2,745,702 ops/sec ±0.66% (92 runs sampled)
event: Array#16 x 2,701 ops/sec ±0.26% (97 runs sampled)
event: Circular#16 x 13,064 ops/sec ±0.77% (95 runs sampled)
event: Array#2 x 295,289 ops/sec ±0.25% (95 runs sampled)
event: Circular#2 x 1,248,051 ops/sec ±1.06% (96 runs sampled)
event: Array#32 x 2,654 ops/sec ±0.48% (96 runs sampled)
event: Circular#32 x 13,160 ops/sec ±0.18% (98 runs sampled)
event: Array#4 x 269,338 ops/sec ±0.26% (95 runs sampled)
event: Circular#4 x 1,264,973 ops/sec ±0.25% (96 runs sampled)
event: Array#64 x 2,440 ops/sec ±0.54% (97 runs sampled)
event: Circular#64 x 13,031 ops/sec ±0.69% (97 runs sampled)
event: Array#8 x 262,999 ops/sec ±0.27% (96 runs sampled)
event: Circular#8 x 1,275,477 ops/sec ±0.26% (93 runs sampled)
event: Array#128 x 2,241 ops/sec ±0.21% (95 runs sampled)
event: Circular#128 x 13,078 ops/sec ±0.35% (98 runs sampled)
*/