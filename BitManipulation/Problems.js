/*
3. swap 2 numbers
4. check if ith bit is set or not?
5. extract the ith bit
6. set the ith bit
7. clear the ith bit
8. toggle the ith bit
9. remove the last set bit
10. count the number of set bits
11. check if number is a power of 2 or not
12. minimum bit flip to convert a number
13. power set (print all subset)
14. single number 1: In a given array, every element appears exactly twice, except for one element that appears only once. Find the element that appears only once.
15. single nimber 2: In a given array, every element appears exactly thrice, except for one element that appears only once. Find the element that appears only once.
16. single number 3: In a given array, every element appears exactly twice, but two distinct number is appearing once
17. XOR of  numbers in given range
18. divide two integers without using division operators  
*/

// Code 3:
function swapNum(x, y){
 x = x ^ y; 
 y = x ^ y;
 x = x ^ y;
 return [{"x":x, "y":y}];
}

let x = 5;
let y = 11;
// console.log(swapNum(x, y));

// code 4:
function ithBitSet(num, ith){
    console.log(num.toString(2));
    let shiftedbit = num << ith;
    console.log(shiftedbit);
    let ans = (num & (1 << shiftedbit) != 0)? true: false;
    return ans;
}
let num = 50;
let ith = 2;
console.log(ithBitSet(num, ith));
