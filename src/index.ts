import parseFile from './parser';

const detailed = process.argv[3] === '--detailed';
const compare = process.argv[4]?.startsWith('--compare');
const debug = Boolean(process.env.DEBUG);
const printDigest = !Boolean(process.env.NO_REPORT);

parseFile({
  filepath: process.argv[2],
  detailed: process.argv[3] === '--detailed',
  compare: process.argv[4]?.startsWith('--compare'),
  debug: Boolean(process.env.DEBUG)
})
  .then(digest => printDigest && console.log(digest))
  .catch(err => console.error(err));
