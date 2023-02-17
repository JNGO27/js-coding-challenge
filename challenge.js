const response = [
  {
    id: 1293487,
    name: 'KCRW', // radio station callsign
    tracks: [{ timestp: '2021-04-08', trackName: 'Peaches' }],
  },
  {
    id: 12923,
    name: 'KQED',
    tracks: [
      { timestp: '2021-04-09', trackName: 'Savage' },
      { timestp: '2021-04-09', trackName: 'Savage (feat. Beyonce)' },
      { timestp: '2021-04-08', trackName: 'Savage' },
      { timestp: '2021-04-08', trackName: 'Savage' },
      { timestp: '2021-04-08', trackName: 'Savage' },
    ],
  },
  {
    id: 4,
    name: 'WNYC',
    tracks: [
      { timestp: '2021-04-09', trackName: 'Captain Hook' },
      { timestp: '2021-04-08', trackName: 'Captain Hook' },
      { timestp: '2021-04-07', trackName: 'Captain Hook' },
    ],
  },
];

function uniqueDates(apiResponse) {
  const datesSet = new Set();

  apiResponse.forEach(({ tracks }) =>
    tracks.forEach(({ timestp }) => {
      if (!datesSet.has(timestp)) {
        datesSet.add(timestp);
      }
    })
  );

  return datesSet;
}

function sortByDate(datesSet) {
  const datesArr = Array.from(datesSet);

  return datesArr.sort((a, b) => {
    let dateA = new Date(a);
    let dateB = new Date(b);
    return dateA - dateB;
  });
}

console.log(sortByDate(uniqueDates(response)));
