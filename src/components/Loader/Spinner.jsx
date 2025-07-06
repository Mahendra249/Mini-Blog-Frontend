import React from "react";
import { Loader } from "lucide-react";
import "./Spinner.css";

const Spinner = ({ size = 32, color = "#3b82f6" }) => (
  <div className="spin">
    <Loader size={size} color={color} />
  </div>
);

export default Spinner;
