const { spawn, execSync } = require('child_process')
const { readdirSync } = require('fs')
const { cp } = require('shelljs')

const YEAR = '2021'
const day = process.argv[2]
const days = readdirSync(`./src/${YEAR}`)

if (!days.includes(day)) {
  console.log(`Creating file structure ${day} of ${YEAR}`)
  cp('-r', 'src/template', `src/${YEAR}/${day}`)
}

spawn('nodemon', [`src/${YEAR}/${day}/index.js`], {
  stdio: 'inherit',
  shell: true
})
