# clockify to eurotime 
Takes a csv export from a [clockify details report](https://clockify.me/help/reports/detailed-report) and transforms it into a convenient format to enter in eurotime.

Example output:

```
02/11/2019	duration(h): 8.48	times: 	0930	1500	1601	1900
02/12/2019	duration(h): 6.78	times: 	0900	1400	1610	1725	1819	1851
02/13/2019	duration(h): 4.99	times: 	1004	1111	1154	1334	1445	1658
```

Continuous work periods are merge into one.
E.g.
``0900 1300	1300 1400`` results in one entry ``0900 1400``

Times are tab - seperated, so you might be able to past them directly.

## Usage
``
$ npx clockify-to-eurotime <clockfy-export.csv>
``

Outputs results to `<cwd>/eurotime.txt`

## Issues
Does not account for working over midnight, the end date will still be appended to the day the work period started.
