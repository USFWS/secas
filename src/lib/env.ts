import * as env from '$env/static/public'

const required_variables = ['PUBLIC_CONTACT_EMAIL', 'PUBLIC_MAPBOX_TOKEN']
required_variables.forEach((variable) => {
	if (!env[variable as keyof typeof env]) {
		console.error('ERROR: ${variable} is not set in .env.* file')
	}
})

export const CONTACT_EMAIL = env.PUBLIC_CONTACT_EMAIL

export const SENTRY_DSN = env.PUBLIC_SENTRY_DSN || ''
export const GOOGLE_ANALYTICS_ID = env.PUBLIC_GOOGLE_ANALYTICS_ID || ''
export const MAPBOX_TOKEN = env.PUBLIC_MAPBOX_TOKEN
export const DEPLOY_ENV = env.PUBLIC_DEPLOY_ENV || 'development'

export const SITE_NAME = 'Southeast Conservation Adaptation Strategy'

export const SITE_URL = env.PUBLIC_SITE_URL || 'https://secassoutheast.org'

export const BASE_PATH = env.DEPLOY_PATH || ''
