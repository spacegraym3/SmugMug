/**
 Rotten Tomatoes Constants
**/
var RT_MOVIE_LIST_ARRAY = ["http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json",
                           "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json",
                           "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json",
                           "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json",
                           "http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/new_releases.json"
];

var RT_API_KEY = 'uek398w2dvm3zwz66m5dwdmj';

var RT_BOX_OFFICE = 0;
var RT_IN_THEATER = 1;
var RT_OPENING    = 2;
var RT_UPCOMING   = 3;
var RT_DVD        = 4;

var RT_DEFAULT_INDEX = 0;