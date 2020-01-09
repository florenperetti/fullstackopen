import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useApolloClient, useQuery } from "@apollo/react-hooks";

const QUERY = gql`
  query Book($genre: String!) {
    allBooks(genre: $genre) {
      author {
        name
      }
      title
      published
      genres
    }
  }
`
const QUERY_ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

const Recommendations = (props) => {
  const client = useApolloClient()
  const [userReceived, setUserReceived] = useState(false)
  const [booksReceived, setBooksReceived] = useState(false)
  const [books, setBooks] = useState([])

  const me = useQuery(QUERY_ME, {
    onCompleted: () => {
      setUserReceived(true)
    }
  })

  useEffect(() => {
    if (!userReceived || booksReceived) {
      return
    }
    client.query({
      query: QUERY,
      variables: { genre: me.data.me.favoriteGenre }
    }).then(({ data }) => {
      setBooks(data.allBooks)
      setBooksReceived(true)
    })
  }, [client, me, userReceived, books, booksReceived])
  
  if (!props.show) {
    return null
  }
  
  if (!books || me.loading) {
    return <div>loading...</div>
  }
  
  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{me.data.me.favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations