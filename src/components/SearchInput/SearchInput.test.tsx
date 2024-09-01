import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchInput from './SearchInput';

const theme = createTheme();

describe('SearchInput Component', () => {
  test('renders correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <SearchInput />
      </ThemeProvider>
    );

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  test('passes props correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <SearchInput placeholder="Search..." value="test" />
      </ThemeProvider>
    );

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('placeholder', 'Search...');
    expect(inputElement).toHaveValue('test');
  });

  test('updates value when typing', async () => {
    render(
      <ThemeProvider theme={theme}>
        <SearchInput />
      </ThemeProvider>
    );

    const inputElement = screen.getByRole('textbox');
    // Simulate user typing
    await userEvent.type(inputElement, 'Hello World');

    // Check if the value of the input has been updated
    expect(inputElement).toHaveValue('Hello World');
  });
});
