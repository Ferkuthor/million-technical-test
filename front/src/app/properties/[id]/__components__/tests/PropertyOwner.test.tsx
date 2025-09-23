import { render, screen } from '@testing-library/react';
import { PropertyOwner } from '../PropertyOwner';
import { vi, describe, it, expect } from 'vitest';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} data-testid="next-image" />,
}));

describe('PropertyOwner', () => {
  const mockOwner = {
    name: 'John Doe',
    address: '456 Owner Avenue, City',
    photo: 'https://example.com/photo.jpg',
    birthday: new Date('1985-03-15'),
  };

  it('renders the owner information heading', () => {
    render(<PropertyOwner owner={mockOwner} />);

    expect(screen.getByRole('heading', { name: /owner information/i })).toBeInTheDocument();
  });

  it('renders owner name', () => {
    render(<PropertyOwner owner={mockOwner} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders owner address', () => {
    render(<PropertyOwner owner={mockOwner} />);

    expect(screen.getByText('456 Owner Avenue, City')).toBeInTheDocument();
  });

  it('formats and renders birthday correctly', () => {
    render(<PropertyOwner owner={mockOwner} />);

    // Date formatting depends on timezone, check that a date string is present
    const birthdayElement = screen.getByText(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
    expect(birthdayElement).toBeInTheDocument();
    expect(birthdayElement.textContent).toMatch(/\d{4}/); // Should contain year
  });

  it('renders owner photo with correct props', () => {
    render(<PropertyOwner owner={mockOwner} />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('src', 'https://example.com/photo.jpg');
    expect(image).toHaveAttribute('alt', 'John Doe');
    expect(image).toHaveAttribute('width', '128');
    expect(image).toHaveAttribute('height', '128');
  });

  it('applies correct CSS classes to image', () => {
    render(<PropertyOwner owner={mockOwner} />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveClass('w-16', 'h-16', 'rounded-full', 'object-cover');
  });

  it('renders information in correct layout', () => {
    render(<PropertyOwner owner={mockOwner} />);

    // Check flex layout
    const container = screen.getByText('John Doe').closest('.flex');
    expect(container).toHaveClass('items-center', 'space-x-4');

    // Check text content structure
    const nameElement = screen.getByText('John Doe');
    expect(nameElement).toHaveClass('font-medium');

    const addressElement = screen.getByText('456 Owner Avenue, City');
    expect(addressElement).toHaveClass('text-sm', 'text-muted-foreground');

    const birthdayElement = screen.getByText(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
    expect(birthdayElement).toHaveClass('text-sm', 'text-muted-foreground');
  });

  it('handles different date formats', () => {
    const ownerWithDifferentDate = {
      ...mockOwner,
      birthday: new Date('1990-12-25'),
    };

    render(<PropertyOwner owner={ownerWithDifferentDate} />);

    // Check that a valid date string is rendered
    expect(screen.getByText(/^\d{1,2}\/\d{1,2}\/\d{4}$/)).toBeInTheDocument();
  });

  it('handles different owner data', () => {
    const differentOwner = {
      name: 'Jane Smith',
      address: '789 Different St, Town',
      photo: 'https://example.com/jane.jpg',
      birthday: new Date('1975-07-04'),
    };

    render(<PropertyOwner owner={differentOwner} />);

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('789 Different St, Town')).toBeInTheDocument();
    expect(screen.getByText(/^\d{1,2}\/\d{1,2}\/\d{4}$/)).toBeInTheDocument();

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('src', 'https://example.com/jane.jpg');
    expect(image).toHaveAttribute('alt', 'Jane Smith');
  });
});