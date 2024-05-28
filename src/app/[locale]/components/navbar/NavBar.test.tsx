// // import React from 'react';
// // import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
// // import userEvent from '@testing-library/react';
// // import ResponsiveAppBar from './NavBar';
// // import '@testing-library/jest-dom';

// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import ResponsiveAppBar from './NavBar';
// // import '@testing-library/jest-dom/extend-expect';
// describe('ResponsiveAppBar', () => {
//     it('renders without crashing', () => {
//         render(<ResponsiveAppBar />);
//         expect(screen.getByText('IOP')).toBeInTheDocument();
//     });

//     it('renders desktop nav links', () => {
//         render(<ResponsiveAppBar />);
//         const desktopLinks = screen.getAllByRole('link', { name: /home|form|support|about/i });
//         expect(desktopLinks).toHaveLength(4);
//     });

//     it('opens and closes mobile menu', () => {
//         render(<ResponsiveAppBar />);
//         const menuButton = screen.getByRole('button', { name: /open drawer/i });
//         fireEvent.click(menuButton);
//         const mobileLinks = screen.getAllByRole('link', { name: /home|form|support|about/i });
//         expect(mobileLinks).toHaveLength(4);

//         const closeButton = screen.getByRole('button', { name: /close drawer/i });
//         fireEvent.click(closeButton);
//         expect(screen.queryByRole('link', { name: /home/i })).not.toBeInTheDocument();
//     });

//     it('opens and closes user menu', () => {
//         render(<ResponsiveAppBar />);
//         const userButton = screen.getByRole('button', { name: /open settings/i });
//         fireEvent.click(userButton);
//         const logoutButton = screen.getByRole('menuitem', { name: /logout/i });
//         expect(logoutButton).toBeInTheDocument();

//         fireEvent.click(logoutButton);
//         expect(screen.queryByRole('menuitem', { name: /logout/i })).not.toBeInTheDocument();
//     });

//     it('navigates to the correct page when clicking a nav link', () => {
//         // This test requires the use of a router mock or a custom renderer
//         // to handle the Next.js router navigation.
//         // You can refer to the Next.js testing documentation for more information.
//     });
// });