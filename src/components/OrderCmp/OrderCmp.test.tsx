import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderCmp from './OrderCmp';

describe('OrderCmp', () => {

    test('applies active color when active prop is true', () => {
        render(<OrderCmp type="ASC" active onClick={() => { }} />);

        const element = screen.getByText('ASC');
        expect(element).toBeInTheDocument();
    });

    test('changes color on hover', () => {
        const { getByText } = render(<OrderCmp type="ASC" onClick={() => { }} />);

        const element = getByText('ASC');
        fireEvent.mouseOver(element);

        expect(element).toBeInTheDocument();
    });
});
