import { render, screen } from '@testing-library/react';
import { PropertyImageGallery } from '../PropertyImageGallery';
import { vi, describe, it, expect } from 'vitest';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => <img {...props} data-testid="next-image" />,
}));

describe('PropertyImageGallery', () => {
  it('renders main image when there are enabled images', () => {
    const images = [
      { file: 'image1.jpg', enabled: true },
      { file: 'image2.jpg', enabled: false },
      { file: 'image3.jpg', enabled: true },
    ];

    render(<PropertyImageGallery images={images} />);

    const mainImage = screen.getByAltText('Main property image');
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('src', 'image1.jpg');
  });

  it('renders thumbnail images when there are more than 1 enabled image', () => {
    const images = [
      { file: 'image1.jpg', enabled: true },
      { file: 'image2.jpg', enabled: true },
      { file: 'image3.jpg', enabled: true },
      { file: 'image4.jpg', enabled: true },
    ];

    render(<PropertyImageGallery images={images} />);

    // Should show thumbnails for images 2, 3, 4 (up to 5 total)
    const thumbnails = screen.getAllByTestId('next-image');
    expect(thumbnails).toHaveLength(4); // main + 3 thumbnails

    // Check thumbnail sources
    expect(thumbnails[1]).toHaveAttribute('src', 'image2.jpg');
    expect(thumbnails[2]).toHaveAttribute('src', 'image3.jpg');
    expect(thumbnails[3]).toHaveAttribute('src', 'image4.jpg');
  });

  it('limits thumbnails to 4 additional images', () => {
    const images = [
      { file: 'image1.jpg', enabled: true },
      { file: 'image2.jpg', enabled: true },
      { file: 'image3.jpg', enabled: true },
      { file: 'image4.jpg', enabled: true },
      { file: 'image5.jpg', enabled: true },
      { file: 'image6.jpg', enabled: true },
    ];

    render(<PropertyImageGallery images={images} />);

    const thumbnails = screen.getAllByTestId('next-image');
    expect(thumbnails).toHaveLength(5); // main + 4 thumbnails
  });

  it('renders no image placeholder when no enabled images', () => {
    const images = [
      { file: 'image1.jpg', enabled: false },
      { file: 'image2.jpg', enabled: false },
    ];

    render(<PropertyImageGallery images={images} />);

    expect(screen.getByText('No images available')).toBeInTheDocument();
    expect(screen.queryByTestId('next-image')).not.toBeInTheDocument();
  });

  it('renders no image placeholder when images array is empty', () => {
    render(<PropertyImageGallery images={[]} />);

    expect(screen.getByText('No images available')).toBeInTheDocument();
  });

  it('filters out disabled images', () => {
    const images = [
      { file: 'image1.jpg', enabled: false },
      { file: 'image2.jpg', enabled: true },
      { file: 'image3.jpg', enabled: false },
      { file: 'image4.jpg', enabled: true },
    ];

    render(<PropertyImageGallery images={images} />);

    const imagesRendered = screen.getAllByTestId('next-image');
    expect(imagesRendered).toHaveLength(2); // main + 1 thumbnail

    expect(imagesRendered[0]).toHaveAttribute('src', 'image2.jpg');
    expect(imagesRendered[1]).toHaveAttribute('src', 'image4.jpg');
  });

  it('does not render thumbnails when only one enabled image', () => {
    const images = [
      { file: 'image1.jpg', enabled: true },
      { file: 'image2.jpg', enabled: false },
    ];

    render(<PropertyImageGallery images={images} />);

    const imagesRendered = screen.getAllByTestId('next-image');
    expect(imagesRendered).toHaveLength(1); // only main image
  });

  it('renders correct alt text for thumbnail images', () => {
    const images = [
      { file: 'image1.jpg', enabled: true },
      { file: 'image2.jpg', enabled: true },
    ];

    render(<PropertyImageGallery images={images} />);

    expect(screen.getByAltText('Main property image')).toBeInTheDocument();
    expect(screen.getByAltText('Property image 2')).toBeInTheDocument();
  });
});