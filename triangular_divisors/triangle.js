// n^2 = x-n+x
// Find a triangle number N
class TriangleFactorizer
{
  getNthTriangle = (n) => {
    return ((n*n)/2.0)+(n/2.0);
  }

  getFactorCount = (n) => {
    if (n<2) {
      return 1;
    }
    let root = Math.sqrt(n);
    let carry = n;
    let currentFactor = 2;
    let factorCounter = {};
    while(currentFactor <= root) {
      if (carry%currentFactor === 0) {
        carry /= currentFactor;
        factorCounter[currentFactor] = factorCounter[currentFactor] ?
          factorCounter[currentFactor] + 1 : 1;
      } else {
        if (currentFactor === 2) {
          currentFactor += 1;
        } else {
          currentFactor += 2;
        }
      }
    }
    if (Object.keys(factorCounter).length === 0) {
      return 2;
    }
    return Object.keys(factorCounter).reduce((acc,key) => acc*(factorCounter[key]+1),1);
  }
}

let factorizer = new TriangleFactorizer;
let limit = +process.argv[4] ? +process.argv[4] : 500000;
let start = +process.argv[2] ? +process.argv[2] : 1;
let factorTarget = +process.argv[3] ? +process.argv[3] : 500;
for (i=1; i < limit; i++)
{
  let triangle = factorizer.getNthTriangle(i);
  let count = factorizer.getFactorCount(triangle);
  if (count > factorTarget) {
    console.log('triangle('+i+') = '+factorizer.getNthTriangle(i)+' with '+count+' factors.');
    break;
  }
}
