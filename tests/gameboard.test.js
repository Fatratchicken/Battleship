import { Gameboard } from "../src/gameboard";
import { Ship } from "../src/ship";

describe('Class Gameboard', () => {
    test('Is Defined', () => {
        expect(Gameboard).toBeDefined();
    })

    describe('Board Attributes', () => {
        describe('Gameboard.board', () => {
            const output = [
                [null, null, null, null, null, null, null, null, null, null], 
                [null, null, null, null, null, null, null, null, null, null], 
                [null, null, null, null, null, null, null, null, null, null], 
                [null, null, null, null, null, null, null, null, null, null], 
                [null, null, null, null, null, null, null, null, null, null], 
                [null, null, null, null, null, null, null, null, null, null], 
                [null, null, null, null, null, null, null, null, null, null], 
                [null, null, null, null, null, null, null, null, null, null], 
                [null, null, null, null, null, null, null, null, null, null], 
                [null, null, null, null, null, null, null, null, null, null], 

            ]
            test(`board => ${JSON.stringify(output)}`, () => {
                expect(new Gameboard().board).toEqual(output);
            })
        })

        describe('Gameboard.ships', () => {
            test('constructor () => [ship, ship ...]', () => {
                expect(new Gameboard().ships).toEqual([
                    new Ship(5), new Ship(4), new Ship(3),
                    new Ship(3), new Ship(2)
                ])
            })
        })
    })

    describe('placeShip function', () => {
        describe('placement errors', () => {
            let gameboard = new Gameboard();

            const lengthOutOfRangeTest = [
                {ship: new Ship(2), x: 9, y: 0, vertical: false},
                {ship: new Ship(2), x: 0, y: 9, vertical: true} 
            ]

            lengthOutOfRangeTest.forEach(({ship, x, y, vertical}) => {
                test(`placeShip (len = ${ship.length}, ${x}, ${y}) => Error (length out of range)`, () => {
                    expect(() => gameboard.placeShip(ship, x, y, vertical)).toThrow('length out of range');            

                })
            })

           const shipOverlapTests = [
                {ship: new Ship(1), x: 0, y: 0, vertical: false, board: [
                    [new Ship(1), null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                ]},

                {ship: new Ship(5), x: 1, y: 0, vertical: true, board: [
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, new Ship(2), new Ship(2), null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                ]}
            ]

            shipOverlapTests.forEach(({ship, x, y, vertical, board}) => {
                const testboard = new Gameboard();
                testboard.board = board;

                test(`placeShip (${x}, ${y}), board [${board}] => Error (ship overlap)`, () => {
                    expect(() => testboard.placeShip(ship, x, y, vertical)).toThrow('ship overlap');
                })
            })
        })


        describe('placeShip placement', () => {
            const tests = [
                {ship: new Ship(1), x: 0, y: 0, vertical: false, output: [
                    [new Ship(1), null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null]
                ]},

                {ship: new Ship(1), x: 9, y: 9, vertical: false, output: [
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, new Ship(1)]
                ]},

                {ship: new Ship(2), x: 8, y: 9, vertical: false, output: [
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, new Ship(2), new Ship(2)], 
                ]},


                {ship: new Ship(2), x: 9, y: 8, vertical: true, output: [
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, new Ship(2)], 
                    [null, null, null, null, null, null, null, null, null, new Ship(2)], 
                ]}
            ]

            tests.forEach(({ship, x, y, vertical, output}) => {
                test(`placeShip (${ship.length}, ${x}, ${y}, ${vertical}) => ${output}`, () => {
                    const clearBoard = new Gameboard();
                    clearBoard.placeShip(ship, x, y, vertical);

                    expect(clearBoard.board).toEqual(output);
                })
            })
        })
    })


    describe('receiveAttack function', () => {
        const basicBoard = new Gameboard();

        describe('index errors', () => {
            const chosenTests = [
                {x: 0, y: 0, board: [
                    ['O', null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                ]},

                {x: 2, y: 3, board: [
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, 'X', null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null], 
                ]}
            ]

            chosenTests.forEach(({x, y, board}) => {
                test(`receiveAttack (${x}, ${y}, [${board}]) => Error (index previously chosen)`, () => {
                    const testBoard = new Gameboard();
                    testBoard.board = board

                    expect(() => testBoard.receiveAttack(x,y)).toThrow('index previously chosen');
                })
            })
        })

        describe('receiveAttack (x,y) => object', () => {
            const objectTests = [
                {x: 0, y: 0, board: [
                    [new Ship(1), null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null]
                ],
            
                output: [
                    ['X', null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                ]}
            ]

            objectTests.forEach(({x, y, board, output}) => {
                test(`(${x}, ${y}), board: ${board}, output: ${output}`, () => {
                    const testBoard = new Gameboard();
                    testBoard.board = board;

                    testBoard.receiveAttack(x,y);

                    expect(testBoard.board).toEqual(output);
                })
            })
        })

        describe('receiveAttack (x,y) => null', () => {
            const nullTests = [
                {x: 0, y: 0, board: [
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null]
                ],

                output: [
                    ['O', null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null]
                ]}
            ]

            nullTests.forEach(({x, y, board, output}) => {
                test(`(${x}, ${y}), board: ${board}, output: ${output}`, () => {  
                    const testBoard = new Gameboard();
                    testBoard.board = board;

                    testBoard.receiveAttack(x,y);

                    expect(testBoard.board).toEqual(output);
                })
            })
        })
        
    })
})