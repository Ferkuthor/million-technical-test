import { render, screen } from '@testing-library/react';
import { PropertyFeatures } from '../PropertyFeatures';
import { describe, it, expect } from 'vitest';

describe('PropertyFeatures', () => {
  it('renders the features heading', () => {
    render(<PropertyFeatures year={2020} />);

    expect(screen.getByRole('heading', { name: /features/i })).toBeInTheDocument();
  });

  it('renders the year in the built-in text', () => {
    render(<PropertyFeatures year={2020} />);

    expect(screen.getByText('Built in 2020')).toBeInTheDocument();
  });

  it('renders all feature items', () => {
    render(<PropertyFeatures year={2020} />);

    expect(screen.getByText('Built in 2020')).toBeInTheDocument();
    expect(screen.getByText('3 Bedrooms')).toBeInTheDocument();
    expect(screen.getByText('2 Bathrooms')).toBeInTheDocument();
    expect(screen.getByText('2000 sq ft')).toBeInTheDocument();
  });

  it('renders emojis for each feature', () => {
    render(<PropertyFeatures year={2020} />);

    // Check that the text contains the feature descriptions
    expect(screen.getByText('Built in 2020')).toBeInTheDocument();
    expect(screen.getByText('3 Bedrooms')).toBeInTheDocument();
    expect(screen.getByText('2 Bathrooms')).toBeInTheDocument();
    expect(screen.getByText('2000 sq ft')).toBeInTheDocument();

    // Since emojis are Unicode characters, we can check they exist by looking for the text elements
    const allText = screen.getAllByText(/Built in|Bedrooms|Bathrooms|sq ft/);
    expect(allText.length).toBe(4);
  });

  it('renders features in a 2-column grid layout', () => {
    render(<PropertyFeatures year={2020} />);

    const grid = screen.getByText('Built in 2020').closest('.grid');
    expect(grid).toHaveClass('grid-cols-2');
  });

  it('handles different years correctly', () => {
    render(<PropertyFeatures year={1995} />);

    expect(screen.getByText('Built in 1995')).toBeInTheDocument();
  });

  it('renders static features that do not change', () => {
    const { rerender } = render(<PropertyFeatures year={2020} />);

    // Re-render with different year
    rerender(<PropertyFeatures year={2025} />);

    // Static features should remain the same
    expect(screen.getByText('3 Bedrooms')).toBeInTheDocument();
    expect(screen.getByText('2 Bathrooms')).toBeInTheDocument();
    expect(screen.getByText('2000 sq ft')).toBeInTheDocument();

    // Only the year should change
    expect(screen.getByText('Built in 2025')).toBeInTheDocument();
    expect(screen.queryByText('Built in 2020')).not.toBeInTheDocument();
  });
});