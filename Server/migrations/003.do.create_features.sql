CREATE TABLE features (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    label TEXT NOT NULL,
    language TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    image_id INTEGER
        REFERENCES images(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER
        REFERENCES users(id) ON DELETE CASCADE NOT NULL
);
