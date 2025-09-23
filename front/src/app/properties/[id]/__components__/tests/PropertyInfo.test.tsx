import { render, screen } from '@testing-library/react';
import { PropertyInfo } from '../PropertyInfo';
import { describe, it, expect } from 'vitest';

describe('PropertyInfo', () => {
  const defaultProps = {
    name: 'Beautiful Villa',
    address: '123 Luxury Street, Paradise City',
    price: 1500000,
    codeInternal: 'VILLA001',
    year: 2022,
  };

  it('renders the property name as heading', () => {
    render(<PropertyInfo {...defaultProps} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Beautiful Villa');
    expect(heading).toHaveClass('text-3xl', 'font-bold');
  });

  it('renders the property address', () => {
    render(<PropertyInfo {...defaultProps} />);

    expect(screen.getByText('123 Luxury Street, Paradise City')).toBeInTheDocument();
  });

  it('formats and renders the price correctly', () => {
    render(<PropertyInfo {...defaultProps} />);

    expect(screen.getByText('$1,500,000')).toBeInTheDocument();
  });

  it('renders the internal code', () => {
    render(<PropertyInfo {...defaultProps} />);

    expect(screen.getByText('Code: VILLA001')).toBeInTheDocument();
  });

  it('renders the year', () => {
    render(<PropertyInfo {...defaultProps} />);

    expect(screen.getByText('Year: 2022')).toBeInTheDocument();
  });

  it('formats large prices correctly', () => {
    render(<PropertyInfo {...defaultProps} price={25000000} />);

    expect(screen.getByText('$25,000,000')).toBeInTheDocument();
  });

  it('formats small prices correctly', () => {
    render(<PropertyInfo {...defaultProps} price={50000} />);

    expect(screen.getByText('$50,000')).toBeInTheDocument();
  });

  it('handles zero price', () => {
    render(<PropertyInfo {...defaultProps} price={0} />);

    expect(screen.getByText('$0')).toBeInTheDocument();
  });

  it('renders all information in correct layout', () => {
    render(<PropertyInfo {...defaultProps} />);

    // Check that price and code/year are in a flex container
    const priceElement = screen.getByText('$1,500,000');
    const flexContainer = priceElement.closest('.flex');
    expect(flexContainer).toBeInTheDocument();

    // Check that code and year are in the right section
    const codeElement = screen.getByText('Code: VILLA001');
    const rightSection = codeElement.closest('.text-right');
    expect(rightSection).toBeInTheDocument();
    expect(rightSection).toHaveTextContent('Code: VILLA001');
    expect(rightSection).toHaveTextContent('Year: 2022');
  });

  it('applies correct CSS classes', () => {
    render(<PropertyInfo {...defaultProps} />);

    const container = screen.getByText('Beautiful Villa').closest('div');
    expect(container).toHaveClass('space-y-4');

    const price = screen.getByText('$1,500,000');
    expect(price).toHaveClass('text-2xl', 'font-bold', 'text-secondary');
  });
});