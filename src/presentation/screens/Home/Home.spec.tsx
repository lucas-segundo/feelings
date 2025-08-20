import { render, screen } from '@testing-library/react'
import { it, describe, expect } from 'vitest'
import Home from '.'
import { mockTranslation } from '@/presentation/utils/mockTranslation'

mockTranslation({
  Home: {
    title: 'Kindness Wall',
    description:
      "A place where positive vibes and kind words come together to brighten everyone's day!",
    latestMessages: 'Latest Messages of Kindness ✨',
    noMessages: 'No messages yet. Be the first to spread some kindness!',
  },
})

describe('Home', () => {
  it('should render', () => {
    render(<Home />)

    expect(screen.getByText('Kindness Wall')).toBeDefined()
  })
})
