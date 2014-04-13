

Ext.regModel("TwitterMessage", {
    fields: [
		{name: "from_user_id_str"},
		{name: "location"},
		{name: "profile_image_url"},
		{name: "created_at"},
		{name: "from_user"},
		{name: "id_str"},
		{name: "metadata"},
		{name: "to_user_id"},
		{name: "text"},
		{name: "id"},
		{name: "from_user_id"},
		{name: "geo"},
		{name: "iso_language_code"},
		{name: "to_user_id_str"},
		{name: "source"}
    ]
});

Ext.regModel("TwitterUser", {
    fields: [
		{name: "default_profile"},
		{name: "notifications"},
		{name: "profile_background_color"},
		{name: "profile_background_image_url"},
		{name: "name"},
		{name: "statuses_count"},
		{name: "utc_offset"},
		{name: "friends_count"},
		{name: "profile_text_color"},
		{name: "profile_image_url"},
		{name: "profile_sidebar_fill_color"},
		{name: "location"},
		{name: "profile_link_color"},
		{name: "profile_sidebar_border_color"},
		{name: "lang"},
		{name: "created_at"},
		{name: "profile_use_background_image"},
		{name: "time_zone"}
    ]
});

