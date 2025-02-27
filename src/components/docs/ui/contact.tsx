import React from "react";
import Title from "./title";
import List from "./list";
import Line from "./line";

export default function Contact() {
  return (
    <div>
      <Title text="Contact" />
      <List data={["Your Name: your-email@example.com", "GitHub: your-username"]} />
      <Line />
    </div>
  );
}
