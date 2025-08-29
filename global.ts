import { routing } from './src/presentation/i18n/routing'
import messages from './src/presentation/i18n/messages/en.json'

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof messages
  }
}
