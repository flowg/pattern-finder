/**
 * Internal imports
 */
import { DATA } from './data';
import { Country } from './models';

/**
 * TypeScript entities and constants
 */
enum CommandOption {
    FILTER = 'filter',
    COUNT = 'count'
}

interface ProvidedOptions {
    filter?: string;
    count?: boolean;
}

export const NO_VALID_OPTION_PROVIDED_MSG: string = `Please, enter at least one option among these valid ones :

--filter=<pattern> : return the animals which name satisfy this pattern. <pattern> must be a non-empty string.

--count : return all the data ( eventually filtered if used with --filter ) with the number
    of people by country and the number of animals by person.`;

function getValidOptions( args: string[] ): any {
    const validOptions: ProvidedOptions = {};
    const possibleOptions: string[] = args.slice( 2 );

    if ( possibleOptions.length ) {
        // Options have been provided
        for ( const possibleOption of possibleOptions ) {
            if ( possibleOption === `--${CommandOption.COUNT}` ) {
                validOptions.count = true;
            }

            if ( possibleOption.startsWith( `--${CommandOption.FILTER}` ) ) {
                validOptions.filter = possibleOption.split( '=' )[ 1 ];
            }
        }

        if ( validOptions.count || validOptions.filter ) {
            // At least one valid option has been provided
            return validOptions;
        }
    }

    // No valid option provided by user
    return null;
}

function applyFiltering2Data( pattern: string, data: Country[] ): Country[] {

}

function applyCounting2Data( data: Country[] ): Country[] {

}

export function patternFinder( args: string[] ): string | Country[] {
    const options: ProvidedOptions = getValidOptions( args );
    if ( options ) {
        let result: Country[];

        if ( options.filter ) {
            // Filtering data according to provided pattern
            result = applyFiltering2Data( options.filter, DATA );
        }

        if ( options.count ) {
            // Adding number of children to parent nodes
            result = applyCounting2Data( result );
        }

        return result;
    }

    // No valid option provided by user
    return NO_VALID_OPTION_PROVIDED_MSG;
}
