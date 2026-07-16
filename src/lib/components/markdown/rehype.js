// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck - this must be a pure JS file

import { visit } from 'unist-util-visit'
import { toHtml } from 'hast-util-to-html'

const base = process.env.DEPLOY_PATH || ''

export const transformMarkdownHTML = () => (tree, file) => {
	visit(tree, 'element', (node) => {
		// adapted from rehype-external-links
		if (node.tagName === 'a' && typeof node.properties.href === 'string') {
			if (node.properties.href?.startsWith('/')) {
				// make sure relative links are resolved to full urls in case
				// there is a different base path
				node.properties.href = `${base}${node.properties.href}`
			} else if (node.properties.href?.startsWith('http')) {
				// transform all external links to open in new tab
				node.properties.target = '_blank'
			}
		}
	})

	// skip non-blog posts here
	if (file.filename.indexOf('/blog/') === -1) {
		return
	}

	let splitIndex = -1
	let parentNode = null

	visit(tree, 'raw', (node, index, parent) => {
		if (node.value.trim().replace(' ', '') === '<!--more-->') {
			splitIndex = index
			parentNode = parent
			// break out of traversal
			return false
		}
	})

	if (splitIndex !== -1 && parentNode !== null && file.data?.fm) {
		// we trust all incoming blog HTML and have to allow dangerous HTML to
		// avoid escaping HTML in the excerpt
		file.data.fm.excerpt = toHtml(parentNode.children.slice(0, splitIndex), {
			allowDangerousHtml: true
		})
		// remove comment node
		parentNode.children.splice(splitIndex, 1)
	}
}
