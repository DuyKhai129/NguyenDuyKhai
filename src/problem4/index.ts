/**
 * Method 1: Using a loop.
 * Calculate the sum by iterating from 1 to n and accumulating the total.
 * Complexity: O(n) - Since we iterate through all numbers from 1 to n.
*/
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Method 2: Using a mathematical formula.
 * Formula for the sum of natural numbers: n * (n + 1) / 2
 * Complexity: O(1) - Only a single arithmetic operation, very efficient
 */
function sum_to_n_b(n: number): number {
    return (n * (n + 1)) / 2;
}

/**
 * Method 3: Using recursion.
 * Complexity: O(n) - There are n recursive calls, which may cause stack overflow if n is too large.
 */
function sum_to_n_c(n: number): number {
    if (n <= 0) return 0;
    return n + sum_to_n_c(n - 1);
}