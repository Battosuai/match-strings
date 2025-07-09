/**
 * Result of string matching analysis
 */
export interface StringMatchResult {
    /** Similarity score between 0 and 1 (1 = identical, 0 = no similarity) */
    score: number;
    /** Common characters found in both strings */
    commonCharacters: string[];
    /** Length difference between the strings */
    lengthDifference: number;
}

/**
 * String matcher class that analyzes similarity between two strings
 */
class StringMatcher {
    /**
     * Calculate how much two strings match
     * @param string1 First string to compare
     * @param string2 Second string to compare
     * @returns StringMatchResult with score
     */
    public match(string1: string, string2: string): StringMatchResult {
        // Normalize inputs
        const normalizedString1 = string1.toLowerCase().trim();
        const normalizedString2 = string2.toLowerCase().trim();

        // Handle edge cases
        if (normalizedString1.length === 0 || normalizedString2.length === 0) {
            return {
                score: 0.0,
                commonCharacters: [],
                lengthDifference: Math.abs(
                    normalizedString1.length - normalizedString2.length
                ),
            };
        }

        if (normalizedString1 === normalizedString2) {
            return {
                score: 1.0,
                commonCharacters: Array.from(
                    new Set(normalizedString1.split(''))
                ),
                lengthDifference: 0,
            };
        }

        // Calculate various similarity metrics
        const commonChars = this.getCommonCharacters(
            normalizedString1,
            normalizedString2
        );
        const lengthDiff = Math.abs(
            normalizedString1.length - normalizedString2.length
        );
        const longestCommonSub = this.getLongestCommonSubstring(
            normalizedString1,
            normalizedString2
        );
        const levenshteinDistance = this.calculateLevenshteinDistance(
            normalizedString1,
            normalizedString2
        );

        // Calculate composite score
        const maxLength = Math.max(
            normalizedString1.length,
            normalizedString2.length
        );
        const charSimilarity = commonChars.length / maxLength;
        const lengthSimilarity = 1 - lengthDiff / maxLength;
        const substringSimilarity = longestCommonSub.length / maxLength;
        const editSimilarity = 1 - levenshteinDistance / maxLength;

        // Weighted average of different similarity measures
        const score =
            charSimilarity * 0.3 +
            lengthSimilarity * 0.2 +
            substringSimilarity * 0.3 +
            editSimilarity * 0.2;

        return {
            score: Math.round(score * 100) / 100, // Round to 2 decimal places
            commonCharacters: commonChars,
            lengthDifference: lengthDiff,
        };
    }

    /**
     * Find common characters between two strings
     */
    private getCommonCharacters(string1: string, string2: string): string[] {
        const chars1 = new Set(string1.split(''));
        const chars2 = new Set(string2.split(''));
        return Array.from(chars1).filter((char) => chars2.has(char));
    }

    /**
     * Find the longest common substring between two strings
     */
    private getLongestCommonSubstring(
        string1: string,
        string2: string
    ): string {
        let longest = '';

        for (let i = 0; i < string1.length; i++) {
            for (let j = i + 1; j <= string1.length; j++) {
                const substring = string1.substring(i, j);
                if (
                    string2.includes(substring) &&
                    substring.length > longest.length
                ) {
                    longest = substring;
                }
            }
        }

        return longest;
    }

    /**
     * Calculate Levenshtein distance (edit distance) between two strings
     */
    private calculateLevenshteinDistance(
        string1: string,
        string2: string
    ): number {
        const matrix = Array(string2.length + 1)
            .fill(null)
            .map(() => Array(string1.length + 1).fill(null));

        for (let i = 0; i <= string1.length; i++) {
            matrix[0][i] = i;
        }

        for (let j = 0; j <= string2.length; j++) {
            matrix[j][0] = j;
        }

        for (let j = 1; j <= string2.length; j++) {
            for (let i = 1; i <= string1.length; i++) {
                const indicator = string1[i - 1] === string1[j - 1] ? 0 : 1;
                matrix[j][i] = Math.min(
                    matrix[j][i - 1] + 1, // deletion
                    matrix[j - 1][i] + 1, // insertion
                    matrix[j - 1][i - 1] + indicator // substitution
                );
            }
        }

        return matrix[string2.length][string1.length];
    }
}

/**
 * Default instance of StringMatcher for direct usage
 */
export const stringMatcher = new StringMatcher();

// Default export
export default StringMatcher;
