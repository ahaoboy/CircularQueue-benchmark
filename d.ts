import Benchmark from 'benchmark'
const suite = new Benchmark.Suite()
function arrayDelete(n: number) {
  const a = new Array(n)
  for (let i = 0; i < n; i++) {
    delete a[i]
  }
}
function arraySet(n: number) {
  const a = new Array(n)
  for (let i = 0; i < n; i++) {
    a[i] = undefined
  }
}
for (let i = 0; i < 4; i++) {
  suite.add(`delete#${1 << i}`, () => {
    arrayDelete(1 << i)
  })
  suite.add(`set#${1 << i}`, () => {
    arraySet(1 << i)
  })

  suite.add(`delete#${16 << i}`, () => {
    arrayDelete(16 << i)
  })
  suite.add(`set#${16 << i}`, () => {
    arraySet(16 << i)
  })
}
suite
  .on('cycle', function (event) {
    console.log('event:', String(event.target))
  })
  .on('complete', function () {
    // console.log('this', this)
    console.log('Fastest is ', this.filter('fastest').map('name'))
    console.log('name is ', this.map('name'))
    console.log(
      'mean is ',
      this.map('stats').map((x) => x.mean)
    )
  })
  .run({ async: true })
/*
event: delete#1 x 16,946,088 ops/sec ±0.97% (91 runs sampled)
event: set#1 x 103,974,888 ops/sec ±0.21% (90 runs sampled)
event: delete#1 x 1,245,201 ops/sec ±3.80% (89 runs sampled)
event: set#1 x 30,539,004 ops/sec ±2.51% (93 runs sampled)
event: delete#2 x 9,252,355 ops/sec ±3.41% (87 runs sampled)
event: set#2 x 84,671,186 ops/sec ±4.94% (83 runs sampled)
event: delete#2 x 615,936 ops/sec ±4.14% (90 runs sampled)
event: set#2 x 17,177,292 ops/sec ±1.20% (93 runs sampled)
event: delete#4 x 4,695,160 ops/sec ±1.95% (92 runs sampled)
event: set#4 x 72,783,720 ops/sec ±0.16% (91 runs sampled)
event: delete#4 x 346,525 ops/sec ±0.58% (94 runs sampled)
event: set#4 x 8,165,963 ops/sec ±5.55% (82 runs sampled)
event: delete#8 x 1,944,867 ops/sec ±5.70% (79 runs sampled)
event: set#8 x 45,344,285 ops/sec ±0.70% (91 runs sampled)
event: delete#8 x 143,000 ops/sec ±4.54% (84 runs sampled)
event: set#8 x 4,002,133 ops/sec ±2.61% (84 runs sampled)
*/
