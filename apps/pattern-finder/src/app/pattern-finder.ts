/**
 * Internal imports
 */
import { DATA } from './data';
import {
    Animal,
    Country,
    Person
} from './models';

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

export const NO_RESULT_AFTER_FILTERING_MSG: string = 'It seems there is no animal which name satisfies this pattern...';

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
    const result: Country[] = [];
    const regex: RegExp = new RegExp( pattern );

    for ( const country of data ) {
        const peopleMatching: Person[] = [];

        for ( const person of country.people ) {
            const animalsMatching: Animal[] = person.animals.filter(
                ( animal: Animal ) => regex.test( animal.name )
            );

            if ( animalsMatching.length ) {
                /*
                 * Some animals, for this person, have a name that satisfies the pattern.
                 * Adding that partial Person object with only the matching Animals
                 */
                peopleMatching.push( {
                    name:    person.name,
                    animals: animalsMatching
                } );
            }
        }

        if ( peopleMatching.length ) {
            /*
             * Some people, for this country, have an animal with a name that satisfies the pattern.
             * Adding that partial Country object with only the matching People
             */
            result.push( {
                name:   country.name,
                people: peopleMatching
            } );
        }
    }

    return result;
}

function applyCounting2Data( data: Country[] ): Country[] {
    const result: Country[] = [];

    for ( const country of data ) {
        const currentCountry: Country = {
            name:   `${country.name} [${country.people.length}]`,
            people: []
        };

        for ( const person of country.people ) {
            const currentPerson: Person = {
                name:    `${person.name} [${person.animals.length}]`,
                animals: person.animals
            };

            currentCountry.people.push( currentPerson );
        }

        result.push( currentCountry );
    }

    return result;
}

export function patternFinder( args: string[] ): string | Country[] {
    const options: ProvidedOptions = getValidOptions( args );
    if ( options ) {
        let result: Country[] = DATA;

        if ( options.filter ) {
            // Filtering data according to provided pattern
            result = applyFiltering2Data( options.filter, result );

            if ( result.length === 0 ) {
                // Empty arrays after filtering are NOT returned
                return NO_RESULT_AFTER_FILTERING_MSG;
            }
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
