const CREATE_ACTOR_OK = {
  _id: 'asdasdasda',
  name: 'Miguel',
  lastname: 'Actoranzo'
}

const CREATE_DIRECTOR_OK = {
  _id: 'asdasdasda',
  name: 'Miguel',
  lastname: 'Directovid'
}

const CREATE_MOVIE_OK = {
  _id: 'asdasdasda',
  name: 'Titatic',
  origin: 'Mexico'
}

const FIND_DIRECTOR_FOR_FILM_GENERIC = CREATE_DIRECTOR_OK

const FIND_ACTORS_FOR_FILM_GENERIC = [
  CREATE_ACTOR_OK,
  {
    _id: 'asdasdasda',
    name: 'Miguel',
    lastname: 'Actormunza'
  }
]

export {
  CREATE_ACTOR_OK,
  CREATE_DIRECTOR_OK,
  CREATE_MOVIE_OK,
  FIND_DIRECTOR_FOR_FILM_GENERIC,
  FIND_ACTORS_FOR_FILM_GENERIC
}
