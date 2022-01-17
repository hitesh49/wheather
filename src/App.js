import { useState } from "react";
import "./App.css";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function App() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState({
    description: "",
    temp: 0,
    temp_min: 0,
    temp_max: 0,
    humidity: 0,
    icon: "",
  });
  const updatewether = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=2b68c09abb09497d3b5e7e05cebfebdc`
      )
      .then((res) => {
        setResult({
          description: res.data?.weather[0]?.description,
          icon: res.data?.weather[0]?.icon,
          temp: res.data?.main?.temp,
          temp_max: res.data?.main?.temp_max,
          temp_min: res.data?.main?.temp_min,
          humidity: res.data?.main?.humidity,
        });
      })
      .catch((err) => {
        setError([err.message]);
      });
  };
  return (
    <div className="App">
      <h1>Weather description</h1>
      <TextField
        label="Enter your city"
        color="secondary"
        focused
        onChange={(e) => {
          setValue(e.target.value);
          console.log(e.target.value);
        }}
      />
      <p>{error}</p>
      {/* console.log(onchange); */}

      <Button variant="contained" color="success" onClick={updatewether}>
        Search
      </Button>
      <div className="displaydata" style={{backgroundImage: `url("https://www.freepik.com/free-photo/colorful-background-with-alcohol-ink_10918222.htm?query=background")` }}>
        <p>Description ={result.description}</p>
        <p> temp ={result.temp}</p>
        <p>max= {result.temp_max}</p>
        <p>min= {result.temp_min}</p>
        <p> {result.humidity}</p>
        <p> {result.icon}</p>
      </div>
    </div>
  );
}

export default App;
