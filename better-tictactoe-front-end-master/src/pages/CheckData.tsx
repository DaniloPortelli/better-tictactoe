import React, { useState } from "react";

export function CheckData() {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [married, setMarried] = useState(false);

  function validationForm() {
    if (name.length < 5 || name.length > 50) {
      return "La lunghezza del nome deve essere compresa tra 5 e 50 caratteri.";
    } else if (age < 1 || age > 150) {
      return "L'età deve essere compresa tra 1 e 150.";
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        <input
          type="checkbox"
          checked={married}
          onChange={(e) => setMarried(e.target.checked)}
          disabled={age <= 18}
        />
      </div>

      <div>
        <label>Date of Birth: </label>
        <input type="date" />
      </div>

      <button type="submit">Invia</button>
    </form>
  );
}
