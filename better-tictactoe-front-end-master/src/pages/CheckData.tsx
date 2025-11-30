import React, { useState } from "react";

function isAgeValid(age: number, birthdate: string): boolean {
  const dob = new Date(birthdate);
  const today = new Date();

  let computedAge = today.getFullYear() - dob.getFullYear();

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    computedAge--;
  }

  return computedAge === age;
}

export function CheckData() {

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [married, setMarried] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");

  const [show, setShow] = useState(false)

  const validationAge = isAgeValid(age, birthdate)

  function validationForm() {
    if (name.length < 5 || name.length > 50) {
      return "La lunghezza del nome deve essere compresa tra 5 e 50 caratteri.";
    } else if (age < 1 || age > 150) {
      return "L'eta' deve essere compresa tra 1 e 150.";
    } else if (!validationAge) {
      return ("L'eta' inserita non è coerente con la data di nascita dichiarata")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validationForm()) {
      setShow(true)
    } else return
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Age: </label>
        <input
          type="number"
          value={age}
          onChange={(e) =>
            setAge(e.target.value === "" ? 0 : Number(e.target.value))
          }
        />
      </div>

      <div>
        <label>Married: </label>
        <select
          value={married}
          onChange={(e) => setMarried(e.target.value)}
          disabled={age < 18}
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>

      </div>

      <div>
        <label>Date of Birth: </label>
        <input
          type="date"
          value={birthdate}
          onChange={(e) =>
            setBirthdate(e.target.value)
          } />
      </div>

      {
        validationForm() && (
          <div>
            <div>
              <span><strong style={{ color: "red" }}>Attenzione! </strong></span>
            </div>
            <span style={{ color: "red" }}>{validationForm()}</span>
          </div>
        )
      }

      <button type="submit">Invia</button>

      {
        show && (
          <div>
            <h3>Riepilogo dei dati inviati:</h3>
            <blockquote>Nome: {name}</blockquote>
            <blockquote>Eta': {age}</blockquote>
            <blockquote>Sposato: {married === "yes" ? "Si" : "No"}</blockquote>
            <blockquote>Data di nascita: {birthdate}</blockquote>
          </div>
        )
      }
    </form>
  );
}
