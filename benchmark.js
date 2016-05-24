const Benchmark = require('benchmark')
const church = require('./dist')

const churchBenchmark = _ => {
  const data = church.range(church.zero)(church.mult(church.ten)(church.ten))
  const add10 = church.add(church.ten)
  const triple = church.mult(church.three)
  const greaterThan50 = x => church.gt(x)(church.mult(church.five)(church.ten))
  const lessThan100 = x => church.lt(x)(church.mult(church.ten)(church.ten))
  return church.filter(lessThan100)(church.filter(greaterThan50)(church.map(triple)(church.map(add10)(data))))
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
