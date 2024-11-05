# Bit Manipulation in Programming

**Bit manipulation** is the act of algorithmically manipulating bits (binary digits), which is foundational in programming. Each bit represents a power of 2, with the rightmost bit (least significant) representing \(2^0\), the next \(2^1\), and so on. Since computers operate in binary, bit manipulation allows us to optimize code by directly working with data at the bit level. Common uses of bit manipulation include optimizing storage, setting flags, encryption, graphics, and networking protocols.

---

## Understanding Binary Number Conversion

### Binary Numbers
A binary number uses only 0 and 1 to represent any value. For instance, `101` in binary equals `5` in decimal.

### 1's Complement
This flips all bits in a binary number. For example, the 1's complement of `1010` is `0101`.

### 2's Complement
This is a method for representing negative numbers. To find the 2's complement of a number:
1. Take the 1's complement (flip all bits).
2. Add 1 to the result.

**Example**: For the binary number `1010`, the 1's complement is `0101`. Adding 1 gives `0110`.

---

## Bitwise Operators

Bitwise operators perform operations on the individual bits of numbers.

### AND (`&`)
Performs logical conjunction. A bit is set to 1 only if both corresponding bits are 1.

**Example**: `1010 & 1100` results in `1000`.

### OR (`|`)
Performs logical disjunction. A bit is set to 1 if either corresponding bit is 1.

**Example**: `1010 | 1100` results in `1110`.

### XOR (`^`)
Performs logical exclusive OR. A bit is set to 1 only if one of the corresponding bits is 1 (but not both).

**Example**: `1010 ^ 1100` results in `0110`.

### NOT (`~`)
Inverts each bit (i.e., 1 becomes 0 and 0 becomes 1).

**Example**: `~1010` results in `0101` (considering only 4 bits).

---

## SHIFT Operators

### Left Shift (`<<`)
Shifts bits to the left by a specified number of positions. Zeros are added from the right.

**Example**: `1010 << 1` results in `10100`.

### Right Shift (`>>`)
Shifts bits to the right by a specified number of positions. Zeros are added from the left for unsigned numbers; for signed numbers, the sign bit is used to fill.

**Example**: `1010 >> 1` results in `0101`.


### python bits 
```
# Define two numbers for demonstration
a = 0b1010  # 10 in decimal
b = 0b1100  # 12 in decimal

print("Binary representation:")
print("a:", bin(a))
print("b:", bin(b))

# AND Operation
print("\na & b (AND):", bin(a & b))  # Result: 0b1000

# OR Operation
print("a | b (OR):", bin(a | b))  # Result: 0b1110

# XOR Operation
print("a ^ b (XOR):", bin(a ^ b))  # Result: 0b0110

# NOT Operation
print("~a (NOT):", bin(~a))  # Result: -(a + 1) in binary (Two's complement representation)

# Left Shift
print("a << 1 (Left Shift):", bin(a << 1))  # Shifts bits of 'a' to the left by 1

# Right Shift
print("a >> 1 (Right Shift):", bin(a >> 1))  # Shifts bits of 'a' to the right by 1

```

### javascript bits
```
// Define two numbers for demonstration
let a = 0b1010;  // 10 in decimal
let b = 0b1100;  // 12 in decimal

console.log("Binary representation:");
console.log("a:", a.toString(2));
console.log("b:", b.toString(2));

// AND Operation
console.log("\na & b (AND):", (a & b).toString(2));  // Result: 1000

// OR Operation
console.log("a | b (OR):", (a | b).toString(2));  // Result: 1110

// XOR Operation
console.log("a ^ b (XOR):", (a ^ b).toString(2));  // Result: 0110

// NOT Operation
console.log("~a (NOT):", (~a).toString(2));  // Two's complement result of NOT operation

// Left Shift
console.log("a << 1 (Left Shift):", (a << 1).toString(2));  // Shifts bits of 'a' to the left by 1

// Right Shift
console.log("a >> 1 (Right Shift):", (a >> 1).toString(2));  // Shifts bits of 'a' to the right by 1

```