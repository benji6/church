const Benchmark = require('benchmark')
const {
  add,
  filter,
  five,
  gt,
  lt,
  map,
  mult,
  range,
  ten,
  three,
  zero
} = require('./dist')

const churchBenchmark = _ => {
  const data = range(zero)(mult(ten)(ten))
  const add10 = add(ten)
  const triple = mult(three)
  const greaterThan50 = x => gt(x)(mult(five)(ten))
  const lessThan100 = x => lt(x)(mult(ten)(ten))
  return filter(lessThan100)(filter(greaterThan50)(map(triple)(map(add10)(data))))
}

const nativeBenchmark = _ => {
  const data = Array.from({length: 99}, (_, i) => i)
  const add10 = x => x + 10
  const triple = x => 3 * x
  const greaterThan50 = x => x > 50
  const lessThan100 = x => x < 100
  return data
    .map(add10)
    .map(triple)
    .filter(greaterThan50)
    .filter(lessThan100)
}

new Benchmark.Suite()
  .add('church', function () { churchBenchmark() })
  .add('native', function () { nativeBenchmark() })
  .on('cycle', x => process.stdout.write(`${String(x.target)}\n`))
  .on('complete', function () {
    process.stdout.write(`Fastest is ${this.filter('fastest')[0].name}\n`)
  })
  .run({async: true})
