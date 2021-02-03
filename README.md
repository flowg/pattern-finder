# Pattern Finder

This program exposes a CLI command able to filter out data in the shape of Countries ( name & people ), having Persons
( name & animals ), having Animals ( name ).
One can provide the pattern they want to only display the Countries, having Persons, having Animals, which name satisfies
the provided pattern.
Another option can be used to add a count of Persons and Animals that are gonna be displayed.

## Prerequisites

To build and use this project, you need to have [Node.js](https://nodejs.org/en/) installed on your machine.

## How to build & use

1. First, once you've retrieved the project, place yourself at the root in your Terminal and type :
```
npm i
```

2. Then, build the project :
```
npm run build
```

3. Finally, you can use the program with this special command :
```
npm run app -- <your-options>

// To filter the data
npm run app -- --filter=ry

// To display a counted data
npm run app -- --count

// Combine the two ;)
npm run app -- --filter=ry --count
```
