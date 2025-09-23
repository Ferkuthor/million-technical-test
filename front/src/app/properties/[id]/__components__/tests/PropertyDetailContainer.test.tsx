import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyDetailContainer } from '../PropertyDetailContainer';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock next/navigation
const mockBack = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

// Mock child components
vi.mock('../PropertyImageGallery', () => ({
  PropertyImageGallery: ({ images }: { images: any[] }) => (
    <div data-testid="image-gallery">Gallery with {images.length} images</div>
  ),
}));

vi.mock('../PropertyInfo', () => ({
  PropertyInfo: (props: any) => (
    <div data-testid="property-info">
      {props.name} - {props.price}
    </div>
  ),
}));

vi.mock('../PropertyActions', () => ({
  PropertyActions: () => <div data-testid="property-actions">Actions</div>,
}));

vi.mock('../PropertyTrace', () => ({
  PropertyTrace: ({ trace }: { trace: any[] }) => (
    <div data-testid="property-trace">Trace with {trace.length} items</div>
  ),
}));

vi.mock('../PropertyOwner', () => ({
  PropertyOwner: ({ owner }: { owner: any }) => (
    <div data-testid="property-owner">{owner.name}</div>
  ),
}));

describe('PropertyDetailContainer', () => {
  const mockProperty = {
    name: 'Luxury Villa',
    address: '123 Luxury St, Paradise City',
    price: 1500000,
    codeInternal: 'LV001',
    year: 2022,
    images: [
      { file: 'image1.jpg', enabled: true },
      { file: 'image2.jpg', enabled: false },
      { file: 'image3.jpg', enabled: true },
    ],
    trace: [
      { dateSale: new Date('2023-01-01'), name: 'Sale 1', value: 1400000, tax: 140000 },
      { dateSale: new Date('2023-06-01'), name: 'Sale 2', value: 1500000, tax: 150000 },
    ],
    owner: {
      name: 'John Doe',
      address: '456 Owner St',
      photo: 'owner.jpg',
      birthday: new Date('1980-01-01'),
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all main components', () => {
    render(<PropertyDetailContainer property={mockProperty} />);

    expect(screen.getByTestId('image-gallery')).toBeInTheDocument();
    expect(screen.getByTestId('property-info')).toBeInTheDocument();
    expect(screen.getByTestId('property-actions')).toBeInTheDocument();
    expect(screen.getByTestId('property-trace')).toBeInTheDocument();
    expect(screen.getByTestId('property-owner')).toBeInTheDocument();
  });

  it('renders Back button', () => {
    render(<PropertyDetailContainer property={mockProperty} />);

    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });

  it('calls router.back when Back button is clicked', () => {
    render(<PropertyDetailContainer property={mockProperty} />);

    const backButton = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backButton);

    expect(mockBack).toHaveBeenCalled();
  });

  it('passes correct props to PropertyImageGallery', () => {
    render(<PropertyDetailContainer property={mockProperty} />);

    expect(screen.getByText('Gallery with 3 images')).toBeInTheDocument();
  });

  it('passes correct props to PropertyInfo', () => {
    render(<PropertyDetailContainer property={mockProperty} />);

    expect(screen.getByText('Luxury Villa - 1500000')).toBeInTheDocument();
  });

  it('passes correct props to PropertyTrace', () => {
    render(<PropertyDetailContainer property={mockProperty} />);

    expect(screen.getByText('Trace with 2 items')).toBeInTheDocument();
  });

  it('passes correct props to PropertyOwner', () => {
    render(<PropertyDetailContainer property={mockProperty} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('does not render PropertyTrace when trace array is empty', () => {
    const propertyWithoutTrace = { ...mockProperty, trace: [] };

    render(<PropertyDetailContainer property={propertyWithoutTrace} />);

    expect(screen.queryByTestId('property-trace')).not.toBeInTheDocument();
  });

  it('does not render PropertyOwner when owner is not provided', () => {
    const propertyWithoutOwner = { ...mockProperty, owner: undefined };

    render(<PropertyDetailContainer property={propertyWithoutOwner} />);

    expect(screen.queryByTestId('property-owner')).not.toBeInTheDocument();
  });

  it('renders PropertyTrace when trace has items', () => {
    render(<PropertyDetailContainer property={mockProperty} />);

    expect(screen.getByTestId('property-trace')).toBeInTheDocument();
  });

  it('renders PropertyOwner when owner is provided', () => {
    render(<PropertyDetailContainer property={mockProperty} />);

    expect(screen.getByTestId('property-owner')).toBeInTheDocument();
  });
});