/**
 * Internal imports
 */
import { patternFinder } from '../pattern-finder';
import { ANIMALS_WITH_RY } from './mock-data';

describe( 'Pattern Finder', () => {
    const cliArgs: string[] = [
        'path/to/node/binary',
        'path/to/script'
    ];

    it( 'should return only Animals which name satisfy the given pattern', () => {
        // Adding options relevant to that spec
        const argv: string[] = cliArgs.concat( [
            '--filter=ry'
        ] );

        expect( patternFinder( argv ) ).toEqual( ANIMALS_WITH_RY );
    } );
} );
