import { vi } from 'vitest'

export const mockTranslation = (
  translations: Record<string, Record<string, string>>,
) => {
  vi.mock('next-intl', () => ({
    useTranslations: vi.fn((namespace: string) => {
      return vi.fn(
        (key: string) =>
          (
            translations[
              namespace as keyof typeof translations
            ] as unknown as Record<string, string>
          )?.[key] || key,
      )
    }),
  }))
}
