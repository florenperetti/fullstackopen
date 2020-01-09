import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from "@apollo/react-hooks";
import Select from 'react-select';

const QUERY = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      id
    }
  }
`

const BirthForm = (props) => {
  const [name, setName] = useState("")
  const [selectedOption, setSelectedOption] = useState(null)
  const [year, setYear] = useState("")

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: QUERY }]
  })

  const submit = async (e) => {
    e.preventDefault()

    editAuthor({
      variables: { name, setBornTo: year }
    })

    setName('')
    setYear('')
    setSelectedOption(null)
  }

  const handleChange = selectedOption => {
    setName(selectedOption.value)
    setSelectedOption(selectedOption)
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={props.options}
          />
        </div>
        <div>
          year
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

const Authors = (props) => {  
  const authors = useQuery(QUERY)
  
  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return <div>loading...</div>
  }

  const options = authors.data.allAuthors.map(({ name }) => ({ value: name, label: name }))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <BirthForm options={options}></BirthForm>
      
    </div>
  )
}

export default Authors