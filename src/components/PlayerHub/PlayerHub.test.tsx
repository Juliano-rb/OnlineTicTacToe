// import React from 'react';
// import { render, screen } from '@testing-library/react';
// // import PlayerHub, { FADE_OUT_DURATION, FADE_IN_DURATION } from './PlayerHub';
// import { wait } from '@testing-library/user-event/dist/utils';
// import { act } from 'react-dom/test-utils';


// describe("PlayerHub", () => {
//     const avatar = '👨‍🦰',
//         name = 'John',
//         messageDuration = 500;

//     test('renders PlayerHub', () => {
//         let message = '';

//         act(() => {
//             render(<PlayerHub avatar={avatar} name={name} />);
//         })

//         expect(screen.getByText(avatar)).toBeInTheDocument();
//         expect(screen.getByText(name)).toBeInTheDocument();
//         expect(screen.queryByTestId('message')).not.toBeInTheDocument();
//     });

//     test('renders a new message', async () => {
//         let message = 'Good day';

//         act(() => {
//             render(<PlayerHub avatar={avatar}
//                                  name={name}
//                                 //  message={message}
//                                  messageDuration={messageDuration} />);
//         })

//         expect(screen.getByText(message)).toBeInTheDocument();
//         await wait(FADE_IN_DURATION + messageDuration + FADE_OUT_DURATION)

//         expect(screen.queryByText(message)).not.toBeInTheDocument();
//     });
// })



export {}