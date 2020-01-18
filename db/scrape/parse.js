const fs = require('fs')

const names = fs.readFileSync('db/pokemongs.txt', 'utf8')
const split = names.split('\n')

fs.writeFileSync('db/names.js', JSON.stringify(split))
