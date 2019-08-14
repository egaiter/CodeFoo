// Command line nodejs script. Accepts 3 optional arguments:
// node triangle.js <start> <targetFactorCount> <limit>
// start: Specifies where in the sequence of triangular numbers to begin
// targetFactorCount: Specifies the desired number of factors to exceed
// limit: Upper limit on the number of iterations. Exists primarily as a sanity check

class TriangleFactorizer
{
  factors = {}
  // Mathematical calulation for the nth triangular number
  getNthTriangle = (n) => {
    return ((n*n)/2.0)+(n/2.0);
  }

  // Get the count of total factors for a given positive integer.
  // To do this, the number of prime factors is counted and then multiplied together
  getFactorCount = (n) => {
    // Special case for 1
    if (n<2) {
      return 1;
    }
    // Special case for 2 and 3.
    if (n<4) {
      return 2;
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
    this.factors = factorCounter;
    return Object.keys(factorCounter).reduce((acc,key) => {
      return acc*(factorCounter[key]+1);
    },1);
  }

  getPrimeFactors = () => {
    return Object.keys(this.factors).map((key) => {
      return key+'^'+this.factors[key];
    },1);
  }
}

let factorizer = new TriangleFactorizer;
// Command Line Arguments
let start = +process.argv[2] ? +process.argv[2] : 1;
let factorTarget = +process.argv[3] ? +process.argv[3] : 500;
let limit = +process.argv[4] ? +process.argv[4] : 500000;
// Let's find those factors!
for (i=start; i < start+limit; i++)
{
  let triangle = factorizer.getNthTriangle(i);
  let count = factorizer.getFactorCount(triangle);
  if (count > factorTarget) {
    console.log('triangle('+i+') = '+triangle+' with '+count+' factors.');
    console.log('Prime Factors: '+factorizer.getPrimeFactors());
    break;
  }
}
