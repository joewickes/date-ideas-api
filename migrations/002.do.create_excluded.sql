CREATE TABLE IF NOT EXISTS excluded (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_id TEXT NOT NULL,
  activity_id INTEGER REFERENCES activities(id),
  meal_id INTEGER REFERENCES meals(id),
  dessert_id INTEGER REFERENCES desserts(id),
  date_created TIMESTAMPTZ NOT NULL DEFAULT NOW()
);