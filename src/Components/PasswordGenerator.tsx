import "./Password.css";
import { useState } from "react";
import Instruction from "./Instruction";
import Customization from "./Customization";
import ResultPassword from "./ResultPassword";

function PasswordGenerator() {
  const [length, setLength] = useState(4);
  const [password, setPassword] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [selected, setSelected] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const buttonList = [
    "Uppercase letter",
    "Lowercase letter",
    "Numerics",
    "Symbols",
  ];

  return (
    <>
      <div className="modal-container">
        <Instruction />

        <Customization
          length={length}
          setLength={setLength}
          setPassword={setPassword}
          tempPassword={tempPassword}
          setTempPassword={setTempPassword}
          buttonList={buttonList}
          selected={selected}
          setIsCopied={setIsCopied}
          setSelected={setSelected}
        />

        <ResultPassword
          password={password}
          isCopied={isCopied}
          setIsCopied={setIsCopied}
          selected={selected}
        />
      </div>
    </>
  );
}

export default PasswordGenerator;
