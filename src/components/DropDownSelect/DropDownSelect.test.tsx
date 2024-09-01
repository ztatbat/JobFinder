import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DropDownSelect from './DropDownSelect';
import { describe, expect, test, vi } from 'vitest';

const theme = createTheme();

describe('DropDownSelect Component', () => {
    test('renders correctly with default props', () => {
        render(
            <ThemeProvider theme={theme}>
                <DropDownSelect
                    onSelect={() => { }}
                    options={['Option 1', 'Option 2']}
                    label="Select"
                />
            </ThemeProvider>
        );

        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
        expect(screen.getByText('Select :')).toBeInTheDocument();
    });

    test('displays default value when value is not in options', () => {
        render(
            <ThemeProvider theme={theme}>
                <DropDownSelect
                    value="Non-existing value"
                    defaultValue="Default Option"
                    onSelect={() => { }}
                    options={['Option 1', 'Option 2']}
                    label="Select"
                />
            </ThemeProvider>
        );

        expect(screen.getByText('Default Option')).toBeInTheDocument();
    });

    test('opens the popover when button is clicked', async () => {
        render(
            <ThemeProvider theme={theme}>
                <DropDownSelect
                    onSelect={() => { }}
                    options={['Option 1', 'Option 2']}
                    label="Select"
                />
            </ThemeProvider>
        );

        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);

        await waitFor(() => {
            expect(screen.getByText('Option 1')).toBeInTheDocument();
            expect(screen.getByText('Option 2')).toBeInTheDocument();
        });
    });

});
