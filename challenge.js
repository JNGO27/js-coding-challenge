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

function datesWithOccurences(apiResponse) {
  const dates = uniqueDates(apiResponse);
  const sortedDates = sortByDate(dates);

  return apiResponse.map(({ tracks }, idx) => {
    let count = 0;
    let timestamp = sortedDates[idx];

    tracks.map(({ timestp }) => {
      if (dates.has(timestp)) {
        count += 1;
      }
    });

    return {
      x: timestamp,
      y: count,
    };
  });
}

function getAllTracks(apiResponse) {
  return apiResponse.map(({ tracks }) => tracks).flat();
}

function matchArtistsByDate(apiResponse) {
  const allTracks = getAllTracks(apiResponse);
  const dates = uniqueDates(apiResponse);
  const sortedDates = sortByDate(dates);

  return sortedDates.map((date) => {
    const artists = [];

    allTracks.map(({ timestp, trackName }) => {
      if (timestp === date) {
        artists.push(trackName);
      }
    });

    return {
      date,
      tooltip: artists,
    };
  });
}

function artistsOccurences(tooltipArr) {
  const result = {};

  tooltipArr.forEach((artist) => {
    if (result[artist]) {
      result[artist] += 1;
    } else {
      result[artist] = 1;
    }
  });

  return Object.entries(result);
}

function artistsCountByDate(artistsByDate) {
  return artistsByDate.map(({ tooltip }) => {
    const occurences = artistsOccurences(tooltip);
    return occurences.map(
      (artistWithCount) => `${artistWithCount[0]} (${artistWithCount[1]})`
    );
  });
}

function apiTransformer(apiResponse) {
  const objXY = datesWithOccurences(apiResponse);
  const artistByDate = matchArtistsByDate(apiResponse);
  const artistCountsWithFormat = artistsCountByDate(artistByDate);
  const result = objXY.map((obj, idx) => ({
    ...obj,
    tooltip: artistCountsWithFormat[idx].join(', '),
  }));

  return result;
}

const data = apiTransformer(response);
console.log(data);

/*
  data:

[
  { x: '2021-04-07', y: 1, tooltip: 'Captain Hook (1)' },
  {
    x: '2021-04-08',
    y: 5,
    tooltip: 'Peaches (1), Savage (3), Captain Hook (1)'
  },
  {
    x: '2021-04-09',
    y: 3,
    tooltip: 'Savage (1), Savage (feat. Beyonce) (1), Captain Hook (1)'
  }
]
*/
