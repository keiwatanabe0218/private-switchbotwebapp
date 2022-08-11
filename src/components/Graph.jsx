import React from "react";
import Plot from "react-plotly.js";
import { Card, CardContent } from "@mui/material";

const unpack = (rows, key) => {
  return rows.map((row) => row[key]);
};

var selectorOptions = {
  buttons: [
    {
      step: "minute",
      stepmode: "backward",
      count: 1,
      label: "1min",
    },
    {
      step: "hour",
      stepmode: "backward",
      count: 1,
      label: "1h",
    },
    {
      step: "hour",
      stepmode: "backward",
      count: 12,
      label: "12h",
    },
    {
      step: "day",
      stepmode: "backward",
      count: 1,
      label: "1day",
    },
    {
      step: "year",
      stepmode: "backward",
      count: 1,
      label: "1y",
    },
    {
      step: "all",
    },
  ],
};

const Graph = (props) => {
  const data = props.data;
  data.sort(function (a, b) {
    if (a.timestamp > b.timestamp) {
      return 1;
    } else {
      return -1;
    }
  });
  return (
    <Card sx={{ maxWidth: 1200, backgroundColor: "white" }}>
      <CardContent>
        <Plot
          data={[
            {
              x: unpack(data, "timestamp"),
              y: unpack(data, "temperature"),
              type: "scatter",
              mode: "lines",
              line: { color: "#FEC83F" },
            },
            {
              x: unpack(data, "timestamp"),
              y: unpack(data, "humidity"),
              type: "scatter",
              mode: "lines",
              yaxis: "y2",
              line: { color: "#33B3FF" },
            },
          ]}
          layout={{
            autosize: true,
            width: 1000,
            height: 500,
            title: "Switchbot Temperature and Humidity",
            xaxis: {
              rangeselector: selectorOptions,
              rangeslider: {},
            },
            yaxis: {
              title: "Temperature (C)",
              titlefont: { color: "#FEC83F" },
              tickfont: { color: "#FEC83F" },
            },
            yaxis2: {
              title: "Humidity (%)",
              titlefont: { color: "#33B3FF" },
              tickfont: { color: "#33B3FF" },
              overlaying: "y",
              side: "right",
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default Graph;
