import React, { useState, useEffect } from 'react'
import numbersService from './../services/numbers'

import Filter from './Filter'
import Numbers from './Numbers'
import NumberForm from './NumberForm'
import Notification from './Notification'


const App = () => {
    const [persons, setPersons] = useState([])
    const [message, setMessage] = useState(null)
    const [successfulMessage, setSuccessfulMessage] = useState(null)
    
    useEffect(() => {
        numbersService.getAll()
            .then(response => {
                setPersons(response)
        })
    }, []);

    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ search, setSearch ] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }
    const handleDelete = ({name, number, id}) => {
        const confirmed = window.confirm(`Delete ${name}?`)
        if (!confirmed) {
            return
        }
        numbersService.deleteNumber(id)
            .catch(e => {
                showMessage(`Information of ${name} has already been removed from server`, false)
            })
            .finally(() => {
                setPersons(persons.filter(n => n.id !== id))
            })
    }
    const showMessage = (text, successful = true) => {
        setMessage(text)
        setSuccessfulMessage(successful)
        setTimeout(() => {
            setMessage(null)
        }, 4000)
    }
    const handleSubmit = (event) => {
        event.preventDefault()

        const person = persons.find(person => person.name === newName)

        if (person && person.id) {
            const confirmed = window.confirm(`${person.name} is already added in the phonebook, replace the old number with a new one?`)
            if (!confirmed) {
                return
            }
            const updatedPerson = {
                ...person,
                number: newNumber
            }
            numbersService
                .update(person.id, updatedPerson)
                .then(returned => {
                    setPersons(persons.map(
                        p => p.id === person.id
                            ? returned
                            : p
                    ))
                    showMessage(`Updated ${person.name}`)
                })
            setNewName('')
            setNewNumber('')
            return
        }
        const newPerson = {
            name: newName,
            number: newNumber
        }

        numbersService
            .create(newPerson)
            .then(response => {
                setPersons(persons.concat(response))
                showMessage(`Added ${newPerson.name}`)
            })
        setNewName('')
        setNewNumber('')
    }

    const inputs = [
        {
            label: 'name',
            value: newName,
            onChange: handleNameChange
        },
        {
            label: 'number',
            value: newNumber,
            onChange: handleNumberChange
        }
    ]

    const personsToShow = !search
        ? persons
        : persons.filter(({name}) => name.toLowerCase().indexOf(search.toLowerCase()) >= 0)

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} successful={successfulMessage}/>
            <Filter value={search} onChange={handleSearchChange}/>
            <NumberForm
                onSubmit={handleSubmit}
                inputs={inputs}
            />
            <h2>Numbers</h2>
            <Numbers numbers={personsToShow} handleDelete={handleDelete} />
        </div>
    )
}

export default App