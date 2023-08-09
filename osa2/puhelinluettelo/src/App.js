import { useState, useEffect } from "react";

import personService from "./services/person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { Notification, Error } from "./components/Notification";

import "./style.css";

const NOTIFICATION_TIMEOUT = 12000;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotification] = useState(null);
  const [errorMessage, setError] = useState(null);

  useEffect(() => {
    personService.getAll().then((people) => setPersons(people));
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter)
  );

  const addPerson = (event) => {
    event.preventDefault();

    const index = persons.map((person) => person.name).indexOf(newName);

    if (index >= 0) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Replace old number with a new one?`
        )
      ) {
        const id = persons[index].id;
        personService
          .update(id, { ...persons[index], number: newNumber })
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) => (p.name !== newName ? p : updatedPerson))
            );
            setNotification(`Updated ${updatedPerson.name}.`);
            setTimeout(() => setNotification(null), NOTIFICATION_TIMEOUT);
          })
          .catch((error) => {
            setError(`Error updating ${persons[id].name}.`);
            setTimeout(() => setError(null), NOTIFICATION_TIMEOUT);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personService.create(newPerson).then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        setNewName("");
        setNewNumber("");
        setNotification(`Added ${createdPerson.name}.`);
        setTimeout(() => setNotification(null), NOTIFICATION_TIMEOUT);
      });
    }
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          setNotification(`Deleted ${person.name}.`);
          setTimeout(() => setNotification(null), NOTIFICATION_TIMEOUT);
        })
        .catch((error) => {
          setError(`${person.name} already deleted.`);
          setTimeout(() => setError(null), NOTIFICATION_TIMEOUT);
        });
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFiltering = (event) => setFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Error message={errorMessage} />
      <Notification message={notificationMessage} />
      <Filter handleFiltering={handleFiltering} />
      <h2>Add a new</h2>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
