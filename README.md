# match-strings

A simple, fast, and flexible string similarity matcher for JavaScript and TypeScript.  
Supports both class and instance usage. Built with [Bun](https://bun.sh/), works in Node.js and modern browsers.

---

## Features

-   Compare any two strings and get a similarity score (0 to 1)
-   See common characters and length difference
-   Use as a class or a ready-to-use instance
-   TypeScript types included
-   Lightweight and dependency-free

---

## Installation

```bash
bun install match-strings
# or
npm install match-strings
# or
yarn add match-strings
```

---

## Usage

### 1. Using the default export (class)

```typescript
import StringMatcher from 'match-strings';

const matcher = new StringMatcher();
const result = matcher.match('hello world', 'hello there');
console.log(result);
// { score: 0.67, commonCharacters: [ 'h', 'e', 'l', 'o', ' ', 't', 'r' ], lengthDifference: 0 }
```

### 2. Using the named export (instance)

```typescript
import { stringMatcher } from 'match-strings';

const result = stringMatcher.match('test string', 'taste strong');
console.log(result);
// { score: 0.58, commonCharacters: [ 't', 'e', 's', ' ', 'r', 'n', 'g' ], lengthDifference: 0 }
```

---

## API

### `match(str1: string, str2: string): StringMatchResult`

Returns an object:

-   `score`: number (0 to 1, 1 = identical)
-   `commonCharacters`: string[] (unique characters found in both strings)
-   `lengthDifference`: number (absolute difference in string lengths)

---

## Example

```typescript
import StringMatcher, { stringMatcher } from 'match-strings';

const result1 = new StringMatcher().match('apple pie', 'apple pies');
const result2 = stringMatcher.match('kitten', 'sitting');

console.log(result1);
console.log(result2);
```

---

## Testing

```bash
bun test
```

---

## Build

```bash
bun run build
```

---

## License

MIT

---

## Author

MD. Asifur Rahman
[GitHub](https://github.com/Battosuai)
[LinkedIn](https://www.linkedin.com/in/iamjiban/)
