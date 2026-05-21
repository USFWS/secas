// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck - this must be a pure JS file

import { visit } from 'unist-util-visit'
import { toHtml } from 'hast-util-to-html'

export const transformMarkdownHTML = () => (tree, file) => {
	visit(tree, 'element', (node) => {
		// transform all links (internal and external) to open in new tab
		// adapted from rehype-external-links
		if (node.tagName === 'a' && typeof node.properties.href === 'string') {
			node.properties.target = '_blank'
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

	if (splitIndex !== -1 && parentNode !== null) {
		file.data.fm.excerpt = toHtml(parentNode.children.slice(0, splitIndex))
		// remove comment node
		parentNode.children.splice(splitIndex, 1)
	}
}
