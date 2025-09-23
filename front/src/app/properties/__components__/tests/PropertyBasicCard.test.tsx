import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyBasicCard } from '../PropertyBasicCard';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock Loading component
vi.mock('../../loading', () => ({
  __esModule: true,
  default: () => <div data-testid="loading">Loading...</div>,
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

describe('PropertyBasicCard', () => {
  const defaultProps = {
    id: '123',
    imageSrc: 'https://example.com/image.jpg',
    name: 'Beautiful House',
    address: '123 Main St, City',
    price: '$500,000',
    year: 2020,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders property information correctly', () => {
    render(<PropertyBasicCard {...defaultProps} />);

    expect(screen.getByText('Beautiful House')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, City')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('$500,000')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view/i })).toBeInTheDocument();
  });

  it('renders image with correct props', () => {
    render(<PropertyBasicCard {...defaultProps} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(image).toHaveAttribute('alt', 'Beautiful House');
  });

  it('shows loading state when View button is clicked', () => {
    render(<PropertyBasicCard {...defaultProps} />);

    const viewButton = screen.getByRole('button', { name: /view/i });
    fireEvent.click(viewButton);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.queryByText('Beautiful House')).not.toBeInTheDocument();
  });

  it('navigates to property detail page when View button is clicked', () => {
    render(<PropertyBasicCard {...defaultProps} />);

    const viewButton = screen.getByRole('button', { name: /view/i });
    fireEvent.click(viewButton);

    expect(mockPush).toHaveBeenCalledWith('/properties/123');
  });

  it('formats price correctly', () => {
    render(<PropertyBasicCard {...defaultProps} price="$1,250,000" />);

    expect(screen.getByText('$1,250,000')).toBeInTheDocument();
  });

  it('displays year correctly', () => {
    render(<PropertyBasicCard {...defaultProps} year={1995} />);

    expect(screen.getByText('1995')).toBeInTheDocument();
  });
});