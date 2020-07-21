/**
 * @author Jason Anderson <jason@gearsandwires.com>
 * @copyright 2016-2019 Gears & Wires
 * @license See vendor/wireframe/LICENSE file
 */
export declare type Dict = {
    [key: string]: string;
};
export declare type UnmatchedTokenBehavior = "ignore" | "remove" | "error";
export declare function stringWithReplacedTokens(input: string, variables: Dict, unmatchedTokenBehavior: UnmatchedTokenBehavior): string;
