/**
 * Internal imports
 */
import { patternFinder } from './app/pattern-finder';
import { Country } from './app/models';

const result: string | Country[] = patternFinder( process.argv );

if ( typeof result === 'string' ) {
    console.log( result );
} else {
    console.dir( result, { depth: null } );
}

