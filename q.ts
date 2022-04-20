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
    // console.log('this', this)
    console.log("Fastest is ", this.filter("fastest").map("name"));
    console.log("name is ", this.map("name"));
    console.log(
      "mean is ",
      this.map("stats").map((x) => x.mean)
    );
  })
  .run({ async: true });
