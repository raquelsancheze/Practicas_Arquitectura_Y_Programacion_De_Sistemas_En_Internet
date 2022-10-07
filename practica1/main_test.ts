import { assertEquals } from "https://deno.land/std@0.159.0/testing/asserts.ts";
import { toMultiply } from "./main.ts";

Deno.test(function allString() {
  assertEquals(toMultiply(["1","4","2","3"]) , [24 , 6, 12, 8]); 
});
Deno.test(function allNumbers() {
  assertEquals(toMultiply([1, 2, 3]), [6, 3, 2]); 
});
Deno.test(function allArray() {
  assertEquals(toMultiply([[1,2], [2, 3]]), [12, 6, 6, 4]); 
});
Deno.test(function goBigOrGoHomeArray() {
  assertEquals(toMultiply([[3,4], [1,[2,[3]]]]), [24, 18, 72, 36, 24]); 
});
Deno.test(function allrandom() {
  assertEquals(toMultiply([2, "4", [1,"3"]]), [12, 6, 24, 8]); 
});
Deno.test(function verifyLenght() {
  assertEquals(toMultiply([[1,2], [2, 3]]).length, [12, 6, 6, 4].length); 
});
Deno.test(function theyNumbers() {
  assertEquals(typeof toMultiply([[1,2], [2, 3]])==="number", typeof [12, 6, 6, 4]==="number"); 
});
