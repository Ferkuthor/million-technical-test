import { render, screen } from '@testing-library/react';
import { PropertyActions } from '../PropertyActions';
import { vi, describe, it, expect } from 'vitest';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Phone: () => <div data-testid="phone-icon">📞</div>,
  Calendar: () => <div data-testid="calendar-icon">📅</div>,
  Heart: () => <div data-testid="heart-icon">❤️</div>,
}));

describe('PropertyActions', () => {
  it('renders all action buttons', () => {
    render(<PropertyActions />);

    expect(screen.getByRole('button', { name: /contact agent/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /schedule viewing/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save property/i })).toBeInTheDocument();
  });

  it('renders buttons with correct icons', () => {
    render(<PropertyActions />);

    expect(screen.getByTestId('phone-icon')).toBeInTheDocument();
    expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
    expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
  });

  it('renders buttons with correct styling classes', () => {
    render(<PropertyActions />);

    const contactButton = screen.getByRole('button', { name: /contact agent/i });
    const scheduleButton = screen.getByRole('button', { name: /schedule viewing/i });
    const saveButton = screen.getByRole('button', { name: /save property/i });

    // Check for expected classes (this verifies the button component is working)
    expect(contactButton).toHaveClass('bg-primary');
    expect(scheduleButton).toHaveClass('border');
    expect(saveButton).toHaveClass('bg-secondary');
  });

  it('renders buttons in correct order', () => {
    render(<PropertyActions />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveTextContent('Contact Agent');
    expect(buttons[1]).toHaveTextContent('Schedule Viewing');
    expect(buttons[2]).toHaveTextContent('Save Property');
  });
});