export const navItems = [
	{
		label: 'About',
		children: [
			{ url: '/about/', label: 'About SECAS' },
			{ url: '/our-goal/', label: 'SECAS goal' },
			{ url: '/staff/', label: 'Staff' },
			{ url: '/committees/', label: 'Committees and teams' }
			// { url: '/partners/', label: 'Partners' }
		]
	},
	{
		label: 'Blueprint',
		children: [
			{ url: '/blueprint/', label: 'About the Blueprint' },
			{ url: '/blueprint-data-download/', label: 'Download the latest version' },
			// Hilary: uncomment the following line to enable the workshop link in the nav bar
			{ url: '/workshops/', label: 'Join a Blueprint Workshop' },
			{ url: '/blueprint-known-issues/', label: 'Known issues' },
			{ url: '/organizations-using-the-blueprint/', label: 'Organizations using the Blueprint' }
		]
	},

	{ url: '/story-map/', label: 'In Action' },
	{ url: '/resources/', label: 'Resources' },
	{ url: '/events/', label: 'Events' },
	{ url: '/blog/', label: 'Blog' }
]
