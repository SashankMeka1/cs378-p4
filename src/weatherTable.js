import React from "react";

const WeatherTable = ({ data }) => (
  <table className="weather-table">
    <thead>
      <tr>
        <th>Time</th>
        <th>Temperature</th>
      </tr>
    </thead>
    <tbody>
      {data.map((temp, index) => (
        <tr key={index}>
          <td>{index + 1}:00PM</td>
          <td>{temp}°F</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default WeatherTable;
