import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useSubscription, useApolloClient } from "@apollo/react-hooks";

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    author {
      name
    }
    title
    published
    genres
  }
`

const QUERY = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

const Books = (props) => {
  const client = useApolloClient()
  const books = useQuery(QUERY)

  const [selectedGenre, setSelectedGenre] = useState(null)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: QUERY })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      dataInStore.allBooks.push(addedBook)
      client.writeQuery({
        query: QUERY,
        data: dataInStore
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.personAdded
      alert(`${addedBook.name} added`)
      updateCacheWith(addedBook)
    }
  })

  if (!props.show) {
    return null
  }
  if (books.loading) {
    return <div>loading...</div>
  }

  const genres = new Set()

  books.data.allBooks.map(book => book.genres && book.genres.map(genre => genres.add(genre)))

  const genresArray = Array.from(genres);

  const booksToShow = selectedGenre ? books.data.allBooks.filter(book => book.genres && book.genres.includes(selectedGenre)) : books.data.allBooks;

  return (
    <div>
      <h2>books</h2>

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
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genresArray.map(genre => <button key={genre} onClick={() => setSelectedGenre(genre)}>{genre}</button>)}
      <button onClick={() => setSelectedGenre(null)}>all genres</button>
    </div>
  )
}

export default Books