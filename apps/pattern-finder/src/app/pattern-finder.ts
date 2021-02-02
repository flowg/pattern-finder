/**
 * Internal imports
 */
import { DATA } from './data';

/**
 * TypeScript entities and constants
 */
enum CommandOption {
    FILTER = 'filter',
    COUNT = 'count'
}

export const NO_VALID_OPTION_PROVIDED_MSG: string = `Please, enter at least one option among these valid ones :

--filter=<pattern> : return the animals which name satisfy this pattern.

--count : return all the data ( eventually filtered if used with --filter ) with the number
    of people by country and the number of animals by person.`;

function getValidOptions(args: string): any {
    if ( args[ 2 ] ) {
        // There is at least one option
        const firstOption: string = args[ 2 ];
    } else {
        // No option provided by user
    }
}

export function patternFinder( args: string[] ) {
    if ( args[ 2 ] ) {
        // There is at least one option
        const firstOption: string = args[ 2 ];
    } else {
        // No option provided by user
    }
    console.log(NO_VALID_OPTION_PROVIDED_MSG)
    return args;
}
