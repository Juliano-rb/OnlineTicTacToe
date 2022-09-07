import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';
import Board from './Board';

describe("Board", () => {
    test('should renders Board', () => {
        let cells: string[] = Array(9).fill('');
        let player = "0"
        const setPlayer = (data: string) => { player = data }
        const setCells = (data: string[]) => { cells = data }
        act(() => {
            render(<Board cells={cells} player={player} setPlayer={setPlayer} setCells={setCells} />);
        })

        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.queryByText('0')).not.toBeInTheDocument();
        expect(screen.queryByText('1')).not.toBeInTheDocument();
    })

    test('should render correnctly cells', async () => {
        let cells: string[] = ['0','1','','0','','','0','','1'];
        let player = "0"
        const setPlayer = jest.fn()
        const setCells = jest.fn()

        render(<Board cells={cells} player={player} setPlayer={setPlayer} setCells={setCells} />);

        expect(screen.getByRole('table')).toBeInTheDocument();

        expect(screen.getByRole(`cell${0}`)).toHaveTextContent('0')
        expect(screen.getByRole(`cell${1}`)).toHaveTextContent('1')
        expect(screen.getByRole(`cell${2}`)).toHaveTextContent('')
        expect(screen.getByRole(`cell${3}`)).toHaveTextContent('0')
        expect(screen.getByRole(`cell${4}`)).toHaveTextContent('')
        expect(screen.getByRole(`cell${5}`)).toHaveTextContent('')
        expect(screen.getByRole(`cell${6}`)).toHaveTextContent('0')
        expect(screen.getByRole(`cell${7}`)).toHaveTextContent('')
        expect(screen.getByRole(`cell${8}`)).toHaveTextContent('1')
    })

    test('should call setPlayer and setCells when new movement', async () => {
        let cells: string[] = Array(9).fill('');
        let player = "0"
        const setPlayer = jest.fn()
        const setCells = jest.fn()

        render(<Board cells={cells} player={player} setPlayer={setPlayer} setCells={setCells} />);

        expect(screen.getByRole('table')).toBeInTheDocument();

        userEvent.click(screen.getByRole(`cell${0}`));
        userEvent.click(screen.getByRole(`cell${8}`));

        expect(setPlayer).toHaveBeenCalledTimes(2)
        expect(setCells).toHaveBeenCalledTimes(2)
    })
})