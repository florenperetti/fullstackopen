const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'HTML is easy',
    likes: 3,
    author: 'Some Author',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'florence',
      name: 'Florencia Peretti'
    }
  },
  {
    id: '5a451e21e0b8b04a45638211',
    title: 'Browser can execute only javascript',
    likes: 0,
    author: 'Some Author',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'florence',
      name: 'Florencia Peretti'
    }
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    title: 'The most important methods of HTTP are GET and POST',
    likes: 10,
    author: 'Some Author',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'florence',
      name: 'Florencia Peretti'
    }
  }
]

let token = null // eslint-disable-line

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }