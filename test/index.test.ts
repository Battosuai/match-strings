import { describe, it, expect } from 'bun:test';
import StringMatcher, { stringMatcher } from '../src';

describe('StringMatcher class', () => {
    it('should return perfect match for identical strings', () => {
        const matcher = new StringMatcher();
        const result = matcher.match('hello', 'hello');
        expect(result.score).toBe(1);
        expect(result.lengthDifference).toBe(0);
        expect(result.commonCharacters.sort()).toEqual(
            ['h', 'e', 'l', 'o'].sort()
        );
    });

    it('should return zero score for empty input', () => {
        const matcher = new StringMatcher();
        const result = matcher.match('', '');
        expect(result.score).toBe(0);
        expect(result.lengthDifference).toBe(0);
        expect(result.commonCharacters).toEqual([]);
    });

    it('should return reasonable score for similar words', () => {
        const matcher = new StringMatcher();
        const result = matcher.match('hello', 'hallo');
        expect(result.score).toBeGreaterThan(0);
        expect(result.score).toBeLessThan(1);
        expect(result.lengthDifference).toBe(0);
        expect(result.commonCharacters).toContain('h');
        expect(result.commonCharacters).toContain('l');
        expect(result.commonCharacters).toContain('o');
    });
});

describe('stringMatcher instance', () => {
    it('should match strings using the exported instance', () => {
        const result = stringMatcher.match('test', 'taste');
        expect(result.score).toBeGreaterThan(0);
        expect(result.lengthDifference).toBe(1);
        expect(result.commonCharacters).toContain('t');
        expect(result.commonCharacters).toContain('e');
        expect(result.commonCharacters).toContain('s');
    });

    it('should match sentences using the exported instance', () => {
        const result = stringMatcher.match(
            'the quick brown fox',
            'the quick brown dog'
        );
        expect(result.score).toBeGreaterThan(0);
        expect(result.lengthDifference).toBe(0);
        expect(result.commonCharacters).toContain('t');
        expect(result.commonCharacters).toContain('h');
        expect(result.commonCharacters).toContain('e');
        expect(result.commonCharacters).toContain('q');
        expect(result.commonCharacters).toContain('u');
        expect(result.commonCharacters).toContain('i');
        expect(result.commonCharacters).toContain('c');
        expect(result.commonCharacters).toContain('k');
        expect(result.commonCharacters).toContain('b');
        expect(result.commonCharacters).toContain('r');
        expect(result.commonCharacters).toContain('o');
        expect(result.commonCharacters).toContain('w');
        expect(result.commonCharacters).toContain('n');
    });
});
