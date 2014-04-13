/**
'release_dates':{
           'theater':'2011-06-03'
        },
        'ratings':{
           'critics_rating':'Certified Fresh',
           'critics_score':86,
           'audience_rating':'Upright',
           'audience_score':88
        },
        'synopsis':'X-Men: First Class unveils the epic beginning of the X-Men saga - and a secret history of the Cold War and our world at the brink of nuclear Armageddon. As the first class discovers, harnesses, and comes to terms with their formidable powers, alliances are formed that will shape the eternal war between the heroes and villains of the X-Men universe. -- (C) Fox',
        'posters':{
           'thumbnail':'http://content7.flixster.com/movie/11/15/79/11157925_mob.jpg',
           'profile':'http://content7.flixster.com/movie/11/15/79/11157925_pro.jpg',
           'detailed':'http://content7.flixster.com/movie/11/15/79/11157925_det.jpg',
           'original':'http://content7.flixster.com/movie/11/15/79/11157925_ori.jpg'
        },
        'abridged_cast':[
           {
              'name':'James McAvoy',
              'characters':[
                 'Professor Charles Xavier'
              ]
           },
           {
              'name':'Michael Fassbender',
              'characters':[
                 'Erik Lehnsherr / Magneto'
              ]
           },
           {
              'name':'January Jones',
              'characters':[
                 'Emma Frost'
              ]
           },
           {
              'name':'Rose Byrne',
              'characters':[
                 'Dr. Moira MacTaggert'
              ]
           },
           {
              'name':'Oliver Platt',
              'characters':[
                 'Man in Black'
              ]
           }
        ],
        'alternate_ids':{
           'imdb':'1270798'
        },
        'links':{
           'self':'http://api.rottentomatoes.com/api/public/v1.0/movies/771041145.json',
           'alternate':'http://www.rottentomatoes.com/m/x_men_first_class/',
           'cast':'http://api.rottentomatoes.com/api/public/v1.0/movies/771041145/cast.json',
           'reviews':'http://api.rottentomatoes.com/api/public/v1.0/movies/771041145/reviews.json',
           'similar':'http://api.rottentomatoes.com/api/public/v1.0/movies/771041145/similar.json'
        }
        */
        

Ext.regModel('RottenTomatoesMovie', {
    fields: [
        {name: 'id'},
		{name: 'title', type: 'string'},
		{name: 'year'},
		{name: 'runtime'},
		{name: 'release_dates'},
		{name: 'synopsis', type: 'string'},
		
		{name: 'ratings_critics_rating', type: 'string', mapping: 'ratings.critics_rating'},
		{name: 'ratings_critics_score', type: 'int', mapping: 'ratings.critics_score'},
		{name: 'ratings_audience_rating', type: 'string', mapping: 'ratings.audience_rating'},
		{name: 'ratings_audience_score', type: 'int', mapping: 'ratings.audience_score'},
           
		{name: 'links_self', type: 'string', mapping: 'links.self'},
		{name: 'links_alternate', type: 'string', mapping: 'links.alternate'},
		{name: 'links_cast', type: 'string', mapping: 'links.cast'},
		{name: 'links_reviews', type: 'string', mapping: 'links.reviews'},
		{name: 'links_similar', type: 'string', mapping: 'links.similar'},
		
		{name: 'posters_profile', type: 'string', mapping: 'posters.profile'},
		{name: 'posters_thumbnail', type: 'string', mapping: 'posters.thumbnail'},
		{name: 'posters_detailed', type: 'string', mapping: 'posters.detailed'},
		{name: 'posters_original', type: 'string', mapping: 'posters.original'}
	],
    proxy: 'rotten_tomatoes_proxy'
});
