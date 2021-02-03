/**
 * Internal imports
 */
import {
    NO_VALID_OPTION_PROVIDED_MSG,
    patternFinder
} from '../pattern-finder';
import {
    ANIMALS_WITH_RY,
    COUNTED_ANIMALS_WITH_RY,
    DATA_COUNTED
} from './mock-data';

describe( 'Pattern Finder', () => {
    const cliArgs: string[] = [
        'path/to/node/binary',
        'path/to/script'
    ];

    it( 'should return a message to the user when no option is provided', () => {
        expect( patternFinder( cliArgs ) ).toEqual( NO_VALID_OPTION_PROVIDED_MSG );
    } );

    it( 'should return a message to the user when no valid option is provided', () => {
        // Adding options relevant for this spec
        const argv: string[] = cliArgs.concat( [
            '--tartempion',
            '--filter'
        ] );

        expect( patternFinder( argv ) ).toEqual( NO_VALID_OPTION_PROVIDED_MSG );
    } );

    it( 'should ignore invalid options when at least a valid one is provided', () => {
        // Adding options relevant for this spec
        const argv: string[] = cliArgs.concat( [
            '--tartempion',
            '--count'
        ] );

        expect( patternFinder( argv ) ).not.toEqual( NO_VALID_OPTION_PROVIDED_MSG );
    } );

    describe( 'when the filter option is provided', () => {
        // Adding options relevant for those specs
        const argv: string[] = cliArgs.concat( [
            '--filter=ry'
        ] );

        it( 'should return only Animals which name satisfy the given pattern', () => {
            expect( patternFinder( argv ) ).toEqual( ANIMALS_WITH_RY );
        } );
    } );

    describe( 'when the count option is provided', () => {
        // Adding options relevant for those specs
        const argv: string[] = cliArgs.concat( [
            '--count'
        ] );

        it( 'should return the data object with children counted for each parent', () => {
            expect( patternFinder( argv ) ).toEqual( DATA_COUNTED );
        } );
    } );

    describe( 'when both filter & count options are provided', () => {
        // Adding options relevant for those specs
        const argv: string[] = cliArgs.concat( [
            '--filter=ry',
            '--count'
        ] );

        it( 'should return the filtered data object with children counted for each parent', () => {
            expect( patternFinder( argv ) ).toEqual( COUNTED_ANIMALS_WITH_RY );
        } );
    } );
} );
