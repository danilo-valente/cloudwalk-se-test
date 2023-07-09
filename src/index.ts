import parseFile from './parser';

const printReport = !Boolean(process.env.NO_REPORT);

parseFile({
  filepath: process.argv[2],
  detailed: process.argv[3] === '--detailed',
  compare: process.argv[4]?.startsWith('--compare'),
  debug: Boolean(process.env.DEBUG)
})
  .then(digest => printReport && console.log(digest))
  .catch(err => console.error(err));
