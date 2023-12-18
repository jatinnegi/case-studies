# Get prime numbers between a range

## Live Demo

https://majestic-crumble-bd191c.netlify.app/

```js
function isNumPrime(num) {
  if (num <= 1) return false;

  for (let i = 2; i <= Math.sqrt(num); i++) if (num % i === 0) return false;

  return true;
}

function getPrimesInRange(start, end) {
  const result = {};
  let totalNums = 0;
  const startTime = performance.now();

  for (let num = start; num <= end; num++) {
    totalNums += 1;
    const singleStart = performance.now();
    const isPrime = isNumPrime(num);
    const singleEnd = performance.now();

    const timeTaken = singleEnd - singleStart;

    result[num] = {
      isPrime,
      timeTaken,
    };
  }

  const endTime = performance.now();
  const timeTaken = endTime - startTime;
  const averageTime = timeTaken / totalNums;

  return {
    result,
    timeTaken,
    averageTime,
  };
}
```

### Time Complexity for getPrimesInRange

**O(n \* sqrt(m))**
Since we are looping through n values and for each value 'm' in the range we are looping through square root of m.

### Space Compexity for getPrimesInRange

**O(n)**
Space consumtion will increase as the input size or as the range grows.
