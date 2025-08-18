import { routing } from './presentation/i18n/routing'
import messages from './presentation/i18n/messages/en.json'

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof messages
  }
}
