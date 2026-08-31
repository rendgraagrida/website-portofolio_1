import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QuoteCarousel } from '../QuoteCarousel';

describe('QuoteCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the initial quote in english', () => {
    render(<QuoteCarousel lang="en" />);
    // The first quote in the array is "The only way to do great work is to love what you do." by Steve Jobs
    expect(screen.getByText(/"The only way to do great work is to love what you do."/i)).toBeInTheDocument();
    expect(screen.getByText('Steve Jobs')).toBeInTheDocument();
  });

  it('renders the initial quote in indonesian', () => {
    render(<QuoteCarousel lang="id" />);
    expect(screen.getByText(/"Satu-satunya cara untuk melakukan pekerjaan hebat adalah dengan mencintai apa yang Anda lakukan."/i)).toBeInTheDocument();
  });
});
