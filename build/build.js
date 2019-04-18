#!/usr/bin/env node

const doT = require('dot')
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

doT.templateSettings = {
	evaluate:    /<%([\s\S]+?)%>/g,
	interpolate: /<%=([\s\S]+?)%>/g,
	encode:      /<%!([\s\S]+?)%>/g,
	use:         /<%#([\s\S]+?)%>/g,
	define:      /<%##\s*([\w.$]+)\s*(:|=)([\s\S]+?)#%>/g,
	conditional: /<%\?(\?)?\s*([\s\S]*?)\s*%>/g,
	iterate:     /<%~\s*(?:%>|([\s\S]+?)\s*:\s*([\w$]+)\s*(?::\s*([\w$]+))?\s*%>)/g,
	varname: 'it',
	strip: false, // preserve whitespace
}

const baseColors = Object.freeze({
	red: { gui: '#D70087', cterm: '162', cterm16: '1' },
	dark_red: { gui: '#D70000', cterm: '160', cterm16: '9' },
	green: { gui: '#87D787', cterm: '114', cterm16: '2' },
	yellow: { gui: '#FFD700', cterm: '220', cterm16: '3' },
	dark_yellow: { gui: '#FFAF00', cterm: '214', cterm16: '11' },
	blue: { gui: '#00AFFF', cterm: '39', cterm16: '4' },
	purple: { gui: '#AF87FF', cterm: '141',  cterm16: '5' },
	cyan: { gui: '#00AFD7', cterm: '38', cterm16: '6' },
	white: { gui: '#EEEEEE', cterm: '255', cterm16 : '7' },
	black: { gui: '#202020', cterm: '0', cterm16: '0' }
})

const specialColors = Object.freeze({
	comment_grey: { gui: '#808080', cterm: '244', cterm16: '15' },
	gutter_fg_grey: { gui: '#444444', cterm: '238', cterm16: '15' },
	cursor_grey:  { gui: '#303030', cterm: '236', cterm16: '8' },
	visual_grey: { gui: '#3A3A3A', cterm: '237', cterm16: '15' },
	menu_grey: { cterm16: '8' },
	special_grey: { gui: '#444444', cterm: '238', cterm16: '15' },
	vertsplit: { gui: '#5F5F5F', cterm: '59', cterm16: '15' },
})

const colors = Object.assign({}, baseColors, specialColors)

const templateMap = Object.freeze({
	'templates/autoload.template.vim': '../autoload/onedark.vim',
})

const shouldCheck = String(process.argv[2]).toLowerCase() === 'check'

const handleError = (message, cause) => {
	console.error('Error:', message)
	if (cause) console.error('Cause:', cause)
	process.exit(-1)
}

console.log(
	shouldCheck ?
		'Checking for inconsistencies between templates and existing output files...'
		:
		'Generating output files from templates...'
)

Object.keys(templateMap).forEach(templateFilename => {

	// Read the template
	const templatePath = resolve(__dirname, templateFilename)
	let templateText
	try {
		templateText = readFileSync(templatePath, 'utf8')
	} catch (e) {
		handleError(`Error reading template ${templatePath}`, e)
	}

	// Compile the template
	let template
	try {
		template = doT.template(templateText)
	} catch (e) {
		handleError(`Error compiling template ${templatePath}`, e)
	}

	// Execute the template (generate the output)
	let output
	try {
		output = template(colors)
	} catch (e) {
		handleError(`Error running template ${templatePath}`, e)
	}

	let outputPath = resolve(__dirname, templateMap[templateFilename])
	try {
		const existingOutput = readFileSync(outputPath, 'utf8')
		// Only need to do something if the generated output differs from what's already on disk
		if (output !== existingOutput) {
			if (shouldCheck) { // Check generated output against existing output file
				handleError(`Changes were made to ${templateMap[templateFilename]} that are inconsistent with its template (${templateFilename}).\nDo you need to [re]build?`)
			} else { // Overwrite existing output file
				try {
					writeFileSync(outputPath, output, 'utf8')
				} catch (e) {
					handleError(`Error writing to output file ${outputPath}`, e)
				}
			}
		}
	} catch (e) {
		handleError(`Error reading existing output file ${outputPath}`, e)
	}

})

console.log('Success!')

