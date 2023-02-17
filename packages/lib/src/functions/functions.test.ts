import { describe, it, expect } from "vitest";

import { range } from "./functions";

describe("range()", () => {
	it("constructs a range of consecutive natural numbers starting from 0, and ending with the number given as parameter excluding it", () => {
		const numbers = range(5);
		expect(numbers).toStrictEqual([0, 1, 2, 3, 4]);
	});

	it('throws an error if the "end" parameter is a negative number', () => {
		expect(() => range(-5)).toThrow(RangeError);
	});
});
