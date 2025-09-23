import { render, screen } from '@testing-library/react';
import { PropertyTrace } from '../PropertyTrace';
import { describe, it, expect } from 'vitest';

describe('PropertyTrace', () => {
  const mockTrace = [
    {
      dateSale: new Date('2023-01-15'),
      name: 'Initial Sale',
      value: 1200000,
      tax: 120000,
    },
    {
      dateSale: new Date('2023-06-20'),
      name: 'Resale',
      value: 1350000,
      tax: 135000,
    },
  ];

  it('renders the transaction history heading', () => {
    render(<PropertyTrace trace={mockTrace} />);

    expect(screen.getByRole('heading', { name: /transaction history/i })).toBeInTheDocument();
  });

  it('renders all trace items', () => {
    render(<PropertyTrace trace={mockTrace} />);

    expect(screen.getByText('Initial Sale')).toBeInTheDocument();
    expect(screen.getByText('Resale')).toBeInTheDocument();
  });

  it('formats dates correctly', () => {
    render(<PropertyTrace trace={mockTrace} />);

    // Check that date strings are present (timezone may affect exact formatting)
    expect(screen.getAllByText(/^\d{1,2}\/\d{1,2}\/\d{4}$/)).toHaveLength(2);
  });

  it('formats values correctly', () => {
    render(<PropertyTrace trace={mockTrace} />);

    expect(screen.getByText('$1,200,000')).toBeInTheDocument();
    expect(screen.getByText('$1,350,000')).toBeInTheDocument();
  });

  it('formats tax values correctly', () => {
    render(<PropertyTrace trace={mockTrace} />);

    expect(screen.getByText('Tax: $120,000')).toBeInTheDocument();
    expect(screen.getByText('Tax: $135,000')).toBeInTheDocument();
  });

  it('renders items in correct layout', () => {
    render(<PropertyTrace trace={mockTrace} />);

    const items = screen.getAllByText(/Initial Sale|Resale/);
    expect(items).toHaveLength(2);

    // Each item should be in a border rounded container
    items.forEach(item => {
      const container = item.closest('.border.rounded-lg');
      expect(container).toBeInTheDocument();
    });
  });

  it('renders transaction details in correct structure', () => {
    render(<PropertyTrace trace={mockTrace} />);

    // Check that each transaction has name, date, value, and tax
    const firstTransaction = screen.getByText('Initial Sale').closest('.border');
    expect(firstTransaction).toHaveTextContent('Initial Sale');
    expect(firstTransaction).toHaveTextContent('$1,200,000');
    expect(firstTransaction).toHaveTextContent('Tax: $120,000');

    // Check that it contains a date string
    expect(firstTransaction?.textContent).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
  });

  it('handles empty trace array', () => {
    render(<PropertyTrace trace={[]} />);

    expect(screen.getByRole('heading', { name: /transaction history/i })).toBeInTheDocument();
    // Should not render any transaction items
    expect(screen.queryByText(/Initial Sale|Resale/)).not.toBeInTheDocument();
  });

  it('handles single trace item', () => {
    const singleTrace = [mockTrace[0]];
    render(<PropertyTrace trace={singleTrace} />);

    expect(screen.getByText('Initial Sale')).toBeInTheDocument();
    expect(screen.queryByText('Resale')).not.toBeInTheDocument();
  });

  it('handles large numbers correctly', () => {
    const largeNumberTrace = [
      {
        dateSale: new Date('2023-01-01'),
        name: 'Large Sale',
        value: 50000000,
        tax: 5000000,
      },
    ];

    render(<PropertyTrace trace={largeNumberTrace} />);

    expect(screen.getByText('$50,000,000')).toBeInTheDocument();
    expect(screen.getByText('Tax: $5,000,000')).toBeInTheDocument();
  });

  it('handles zero values correctly', () => {
    const zeroValueTrace = [
      {
        dateSale: new Date('2023-01-01'),
        name: 'Zero Sale',
        value: 0,
        tax: 0,
      },
    ];

    render(<PropertyTrace trace={zeroValueTrace} />);

    expect(screen.getByText('$0')).toBeInTheDocument();
    expect(screen.getByText('Tax: $0')).toBeInTheDocument();
  });

  it('applies correct spacing between items', () => {
    render(<PropertyTrace trace={mockTrace} />);

    const container = screen.getByText('Initial Sale').closest('.space-y-4');
    expect(container).toBeInTheDocument();
  });
});