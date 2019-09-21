import { schema } from "normalizr";

export const genreSchema = new schema.Entity("genres");

export const movieSchema = new schema.Entity(
  "movies",
  {
    genres: [genreSchema]
  },
  {
    processStrategy: entity => {
      // In movie list, API return genre_ids
      // In movie details, it return id and name of genres
      // Thus, we will merge them as "genres" to not have the same keys on
      // 2 different fields.
      const result = {
        genres: entity.genres || entity.genre_ids,
        ...entity
      };

      // Simply omitting "genre_ids" from the result and
      // returning the "rest".
      const { genre_ids, ...rest } = result;

      return rest;
    }
  }
);

export const personSchema = new schema.Entity(
  "people",
  {
    known_for: [movieSchema]
  },
  {
    processStrategy: value => {
      return value.known_for
        ? {
            ...value,
            // Omitting tv series info of people.
            // We are only selecting "movie" type media.
            known_for: value.known_for.filter(
              media => media.media_type === "movie"
            )
          }
        : value;
    }
  }
);

export const castCreditSchema = new schema.Entity(
  "castCredits",
  {
    person: personSchema,
    movie: movieSchema
  },
  {
    idAttribute: value => value.credit_id,
    processStrategy: (value, parent, key) => {
      switch (key) {
        case "castings":
          const {
            adult,
            backdrop_path,
            genre_ids,
            id,
            original_language,
            original_title,
            overview,
            popularity,
            poster_path,
            release_date,
            title,
            video,
            vote_average,
            vote_count,
            ...rest
          } = value;

          const movie = {
            adult,
            backdrop_path,
            genres: genre_ids,
            id,
            original_language,
            original_title,
            overview,
            popularity,
            poster_path,
            release_date,
            title,
            video,
            vote_average,
            vote_count
          };

          return {
            ...rest,
            movie,
            person: parent.id
          };
        case "cast": {
          return value;
        }
        default:
          return value;
      }
    }
  }
);

export const personCreditSchema = new schema.Entity(
  "personCredits",
  {
    castings: [castCreditSchema]
  },
  {
    processStrategy: value => {
      // Omittig crew values
      const { id, cast } = value;

      return {
        personId: id,
        castings: cast
      };
    }
  }
);

export const movieCreditSchema = new schema.Entity(
  "movieCredits",
  {
    cast: [castCreditSchema]
  },
  {
    processStrategy: (value, parent, key) => {
      // Omittig crew values and formatting cast fields
      const { id: movieId, cast } = value;

      const formattedCast = cast.map(
        ({ id, name, gender, profile_path, ...rest }) => ({
          ...rest,
          person: {
            id,
            name,
            gender,
            profile_path
          }
        })
      );

      return {
        movieId,
        cast: formattedCast
      };
    }
  }
);

export const videoSchema = new schema.Entity("videos");

export const movieVideosSchema = new schema.Entity(
  "movieVideos",
  {
    videos: [videoSchema]
  },
  {
    idAttribute: value => value.id,
    processStrategy: value => {
      const { id, results } = value;
      return {
        movieId: id,
        // We are only using YouTube videos.
        videos: results.filter(video => video.site === "YouTube")
      };
    }
  }
);

export const movieRecommendationSchema = new schema.Entity(
  "movieRecommendations",
  {
    movies: [movieSchema]
  },
  {
    idAttribute: value => value.movieId,
    processStrategy: value => {
      // Omitting unnecessary fields
      const { movieId, results } = value;
      return { movieId, movies: results };
    }
  }
);
