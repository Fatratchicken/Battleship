import { Ship } from "../src/ship";

describe('Class Ship', () => {
    test('Is Defined', () => {
        expect(Ship).toBeDefined();
    })

    describe('Hit Function', () => {
        const shipObj = new Ship();

        test('Is Defined', () => {
            expect(shipObj.hit).toBeDefined();
        })

        test('hit() adds 1 to hitCount', () => {
            shipObj.hit();

            expect(shipObj.hitCount).toBe(1);
        })
    })

    describe('IsSunk Function', () => {
        const shipObj = new Ship(3);

        test('Is Defined', () => {
            expect(shipObj.isSunk).toBeDefined();
        }) 

        test('length = 3, hitCount = 2, return false', () => {
            for(let i = 0; i < 2; i++) shipObj.hit();

            expect(shipObj.isSunk()).toBeFalsy();
        })

        test('length = 3, hitCount = 3, return true', () => {
            shipObj.hit();

            expect(shipObj.isSunk()).toBeTruthy();
        })

        test('length = 3, hitCount = 4, return true', () => {
            shipObj.hit();

            expect(shipObj.isSunk()).toBeTruthy();
        })
    })
})

