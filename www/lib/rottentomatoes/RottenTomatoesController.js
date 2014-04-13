PMCLab.controllers.movies = new Ext.Controller({
	displayMovieList: function(options) {
		console.log(options);

		if (options.urlIndex !== undefined) {
			Ext.util.JSONP.request({
				url: RT_MOVIE_LIST_ARRAY[options.urlIndex],
				callbackKey: 'Ext.util.JSONP.callback',
				params: {
					apiKey: RT_API_KEY,
					page_limit: 40,
					page: 1,
					callback: 'Ext.util.JSONP.callback'
				},
				callback: function(response) {
					var movies = response.movies;

					console.log(movies);

					if (movies) {
						PMCLab.views.rottenTomatoes.loadData(movies);
					} else {
						PMCLab.views.rottenTomatoes.handleError("Unable to get movies");
					}
				}
			});
		} else {
			PMCLab.views.rottenTomatoes.handleError("URL index not defined!");
		}
	}
});
