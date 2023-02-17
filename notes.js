/*
  JS Data Manipulation Challenge.

  Challenge: Transform sample API response into the expected output.

  Rules:
    - Use Vanilla JS.
    - No 3rd Party libraries.

  Challenge Notes:
    - No need to graph the actual data. Just use a console.log();
    - Use clean code

  API:
  type TracksAPI = {
    timestp: string (date);
    trackName: string;
  }

  Array of:
  {
    id: number,
    name: string,
    tracks:  Array<TracksAPI>
  }

  Transformed To

        |
        |
        V

  Array of:
  {
    x: string (date);
    y: number;
    tooltip: string;
  }

  More detailed:
  x: Day - timestp;

  y: cumulative radios plays of all tracks for that day.

  tooltip: lists the different tracks that were played on that day across all radio stations, and the playcounts for each track.

  Examples:
  Provided Example:

    const response = [
    {
      id: 1293487,
      name: "KCRW",  // radio station callsign
      tracks: [{ timestp: "2021-04-08", trackName: "Peaches" }]
    },
    {
      id: 12923,
      name: "KQED",
      tracks: [
        { timestp: "2021-04-09", trackName: "Savage" },
        { timestp: "2021-04-09", trackName: "Savage (feat. Beyonce)" },
        { timestp: "2021-04-08", trackName: "Savage" },
        { timestp: "2021-04-08", trackName: "Savage" },
        { timestp: "2021-04-08", trackName: "Savage" }
      ]
    },
    {
      id: 4,
      name: "WNYC",
      tracks: [
        { timestp: "2021-04-09", trackName: "Captain Hook" },
        { timestp: "2021-04-08", trackName: "Captain Hook" },
        { timestp: "2021-04-07", trackName: "Captain Hook" }
      ]
    }
  ];

        |
        |
        V

    const data = [
    {
      x: '2021-04-07', 
      y: 1, 
      tooltip: 'Captain Hook (1)' 
    },
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
    ];

  Assumptions:
    - data array will be sorted by date.
    - in transformed solution, the radio name and id will be ignored.
    - the types of the API response will be as provided, and won't encounter something different.
        Ex: timestp won't be in many different formats, but as 'year-month'day'.
    -there won't be empty values in the API response.

  Problems to solve:
  - Get all the unique/distinct dates and each unique date will be assigned to x property on an object.
  - Sort array of objects by date.
  - Get the count of each unique date distributed across each object in the api array.
  - Match artist by date.
  - Get count of artist by date.
*/
