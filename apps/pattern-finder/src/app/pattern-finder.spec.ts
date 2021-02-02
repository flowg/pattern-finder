/**
 * Internal imports
 */
import { patternFinder } from './pattern-finder';

describe( 'Pattern Finder', () => {
    const cliArgs: string[] = [
        'path/to/node/binary',
        'path/to/script'
    ];

    it( 'should work', () => {
        // Adding options relevant to that spec
        const argv: string[] = cliArgs.concat( [
            '--filter=ry'
        ] );
        expect( patternFinder( argv ) ).not.toEqual( argv );
    } );
} );
