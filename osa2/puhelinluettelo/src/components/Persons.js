const Persons = ({ filteredPersons, handleDelete }) => (
  <div>
    {filteredPersons.map((person) => (
      <span key={person.id}>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person.id)}>delete</button>
        <br />
      </span>
    ))}
  </div>
);

export default Persons;
