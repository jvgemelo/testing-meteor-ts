/**
 * 
 * @param str - string to check
 * @returns true if the string is empty or contains only whitespace, false otherwise
* Checks if a string is empty or contains only whitespace
 * @param allowUnderScore - if true, underscores are allowed in addition to letters and numbers
 * @returns true if the string is empty or contains only whitespace, false otherwise
 */

export const stringContainsOnlyLettersAndNumbers = (str: string, allowUnderScore?: boolean) => {
    if(allowUnderScore) return /^[A-Za-z0-9_]*$/.test(str);

    return /^[A-Za-z0-9]*$/.test(str);
}
