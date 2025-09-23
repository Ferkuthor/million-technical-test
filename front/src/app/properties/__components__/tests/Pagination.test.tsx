import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('Pagination', () => {
  const mockOnPageChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not render when totalPages is 1', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1}
        hasNext={false}
        hasPrevious={false}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.queryByText('Page 1 of 1')).not.toBeInTheDocument();
  });

  it('renders pagination controls when totalPages > 1', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        hasNext={true}
        hasPrevious={true}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('disables Previous button when hasPrevious is false', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        hasNext={true}
        hasPrevious={false}
        onPageChange={mockOnPageChange}
      />
    );

    const previousButton = screen.getByRole('button', { name: /previous/i });
    expect(previousButton).toBeDisabled();
  });

  it('disables Next button when hasNext is false', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={3}
        hasNext={false}
        hasPrevious={true}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it('enables both buttons when hasNext and hasPrevious are true', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={4}
        hasNext={true}
        hasPrevious={true}
        onPageChange={mockOnPageChange}
      />
    );

    const previousButton = screen.getByRole('button', { name: /previous/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    expect(previousButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it('calls onPageChange with currentPage - 1 when Previous is clicked', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        hasNext={true}
        hasPrevious={true}
        onPageChange={mockOnPageChange}
      />
    );

    const previousButton = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(previousButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with currentPage + 1 when Next is clicked', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        hasNext={true}
        hasPrevious={true}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('displays correct page information', () => {
    render(
      <Pagination
        currentPage={4}
        totalPages={10}
        hasNext={true}
        hasPrevious={true}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('Page 4 of 10')).toBeInTheDocument();
  });
});