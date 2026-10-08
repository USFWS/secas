import { defineEnvVars } from '@sveltejs/kit/env'

export const variables = defineEnvVars({
	SENTRY_DSN: { public: true, static: true },
	GOOGLE_ANALYTICS_ID: { public: true, static: true },
	MAPBOX_TOKEN: { public: true, static: true },
	DEPLOY_ENV: { public: true, static: true },
	CONTACT_EMAIL: { public: true, static: true },
	SITE_URL: {
		public: true,
		static: true,
		schema(value) {
			return value || 'https://secassoutheast.org'
		}
	}
})
