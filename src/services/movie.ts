import Movie, { MovieDocument } from '../models/Movie'

function create(movie: MovieDocument): Promise<MovieDocument> {
  return movie.save()
}

function findById(movieId: string): Promise<MovieDocument> {
  return Movie.findById(movieId)
    .exec() // .exec() will return a true Promise
    .then(movie => {
      if (!movie) {
        throw new Error(`Movie ${movieId} not found`)
      }
      return movie
    })
}

function findAll(): Promise<MovieDocument[]> {
  return Movie.find()
    .sort({ name: 1, publishedYear: -1 })
    .exec() // Return a Promise
}

function update(
  movieId: string,
  update: Partial<MovieDocument>
): Promise<MovieDocument> {
  return Movie.findById(movieId)
    .exec()
    .then(movie => {
      if (!movie) {
        throw new Error(`Movie ${movieId} not found`)
      }

      if (update.name) {
        movie.name = update.name
      }
      if (update.publishedYear) {
        movie.publishedYear = update.publishedYear
      }
      if (update.duration) {
        movie.duration = update.duration
      }

      // Add more fields here if needed
      return movie.save()
    })
}

function deleteMovie(movieId: string): Promise<MovieDocument | null> {
  return Movie.findByIdAndDelete(movieId).exec()
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteMovie,
}
