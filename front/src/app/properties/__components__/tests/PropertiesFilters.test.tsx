import { render, screen, fireEvent } from '@testing-library/react';
import { PropertiesFilters } from '../PropertiesFilters';
import { FetchPropertiesParams } from '../../../hooks/useProperties';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Search: () => <div data-testid="search-icon">Search</div>,
  RotateCcw: () => <div data-testid="rotate-icon">Rotate</div>,
}));

describe('PropertiesFilters', () => {
  const mockOnSearch = vi.fn();
  const mockOnReset = vi.fn();

  const defaultCurrentParams: FetchPropertiesParams = {
    page: '1',
    pageSize: '12',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all filter inputs', () => {
    render(
      <PropertiesFilters
        currentParams={defaultCurrentParams}
        onSearch={mockOnSearch}
        onReset={mockOnReset}
      />
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/min price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/max price/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('initializes filters with currentParams', () => {
    const paramsWithValues: FetchPropertiesParams = {
      ...defaultCurrentParams,
      name: 'Test Property',
      address: 'Test Address',
      minPrice: '100000',
      maxPrice: '500000',
    };

    render(
      <PropertiesFilters
        currentParams={paramsWithValues}
        onSearch={mockOnSearch}
        onReset={mockOnReset}
      />
    );

    expect(screen.getByDisplayValue('Test Property')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Address')).toBeInTheDocument();
    expect(screen.getByDisplayValue('100000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('500000')).toBeInTheDocument();
  });

  it('updates local state when inputs change', () => {
    render(
      <PropertiesFilters
        currentParams={defaultCurrentParams}
        onSearch={mockOnSearch}
        onReset={mockOnReset}
      />
    );

    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: 'New Property' } });

    expect(nameInput).toHaveValue('New Property');
  });

  it('calls onSearch with correct params when search button is clicked', () => {
    render(
      <PropertiesFilters
        currentParams={defaultCurrentParams}
        onSearch={mockOnSearch}
        onReset={mockOnReset}
      />
    );

    const nameInput = screen.getByLabelText(/name/i);
    const addressInput = screen.getByLabelText(/address/i);
    const minPriceInput = screen.getByLabelText(/min price/i);
    const maxPriceInput = screen.getByLabelText(/max price/i);

    fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    fireEvent.change(addressInput, { target: { value: 'Test Address' } });
    fireEvent.change(minPriceInput, { target: { value: '200000' } });
    fireEvent.change(maxPriceInput, { target: { value: '400000' } });

    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith({
      page: '1',
      pageSize: '12',
      name: 'Test Name',
      address: 'Test Address',
      minPrice: '200000',
      maxPrice: '400000',
    });
  });

  it('trims whitespace from filter values when searching', () => {
    render(
      <PropertiesFilters
        currentParams={defaultCurrentParams}
        onSearch={mockOnSearch}
        onReset={mockOnReset}
      />
    );

    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: '  Test Name  ' } });

    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith({
      page: '1',
      pageSize: '12',
      name: 'Test Name',
    });
  });

  it('calls onReset and clears local state when reset button is clicked', () => {
    render(
      <PropertiesFilters
        currentParams={defaultCurrentParams}
        onSearch={mockOnSearch}
        onReset={mockOnReset}
      />
    );

    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: 'Test Name' } });

    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    expect(mockOnReset).toHaveBeenCalled();
    expect(nameInput).toHaveValue('');
  });

  it('triggers search on Enter key press', () => {
    render(
      <PropertiesFilters
        currentParams={defaultCurrentParams}
        onSearch={mockOnSearch}
        onReset={mockOnReset}
      />
    );

    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    fireEvent.keyDown(nameInput, { key: 'Enter' });

    expect(mockOnSearch).toHaveBeenCalledWith({
      page: '1',
      pageSize: '12',
      name: 'Test Name',
    });
  });

  it('does not trigger search on other key presses', () => {
    render(
      <PropertiesFilters
        currentParams={defaultCurrentParams}
        onSearch={mockOnSearch}
        onReset={mockOnReset}
      />
    );

    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    fireEvent.keyDown(nameInput, { key: 'A' });

    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});