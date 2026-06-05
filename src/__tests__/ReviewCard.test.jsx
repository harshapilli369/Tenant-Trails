import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReviewCard from '../components/ReviewCard/ReviewCard';

describe('ReviewCard', () => {
  const baseProps = {
    author: 'James Chen',
    initials: 'JC',
    rating: 4,
    body: 'Great building overall.',
    date: '2026-04-01',
    comments: [],
  };

  it('renders the review body text', () => {
    render(<ReviewCard {...baseProps} />);
    expect(screen.getByText('Great building overall.')).toBeInTheDocument();
  });

  it('renders the author name', () => {
    render(<ReviewCard {...baseProps} />);
    expect(screen.getByText('James Chen')).toBeInTheDocument();
  });

  it('renders the review date', () => {
    render(<ReviewCard {...baseProps} />);
    expect(screen.getByText('2026-04-01')).toBeInTheDocument();
  });

  it('renders the author initials in the avatar', () => {
    render(<ReviewCard {...baseProps} />);
    expect(screen.getByText('JC')).toBeInTheDocument();
  });

  it('does not render a comment count when there are no comments', () => {
    render(<ReviewCard {...baseProps} />);
    expect(screen.queryByText(/comment/i)).not.toBeInTheDocument();
  });

  it('renders comment count when comments are present', () => {
    const propsWithComments = {
      ...baseProps,
      comments: [
        { id: 1, userId: 2, author: 'Alex Morgan', initials: 'AM', body: 'Thanks!', date: '2026-04-02' },
      ],
    };
    render(<ReviewCard {...propsWithComments} />);
    expect(screen.getByText('1 comment')).toBeInTheDocument();
  });
});
