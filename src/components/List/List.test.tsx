import React from 'react';
import { render, screen } from '@testing-library/react';
import _uniqueId from "lodash/uniqueId";
import { wait } from '@testing-library/user-event/dist/utils';
import { act } from 'react-dom/test-utils';
import List from './List';
import ClickableItem from "../ClickableItem";

describe("List", () => {
    test('renders List', () => {
        const title = 'Matches list',
        children = [
            <ClickableItem
                title="Flavinho do Pneu"
                actionText="Entrar"
                key={_uniqueId()}
            />,
            <ClickableItem
                title="Shaolim matador de porco"
                actionText="Entrar"
                key={_uniqueId()}
            />,
        ]

        act(() => {
            render(<List title={title}>{children}</List>);
        })

        expect(screen.queryByText(title)).toBeInTheDocument();
        expect(screen.queryByText("Flavinho do Pneu")).toBeInTheDocument();
        expect(screen.queryByText("Shaolim matador de porco")).toBeInTheDocument();
        expect(screen.queryAllByText("Entrar").length).toBe(children.length);
    });
})

