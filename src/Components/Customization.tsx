import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

interface customizationProps {
  length: number;
  setLength: any;
  setPassword: any;
  tempPassword: string;
  setTempPassword: any;
  buttonList: any;
  selected: any;
  setIsCopied: any;
  setSelected: any;
}

const Customization = ({
  length,
  setLength,
  setPassword,
  tempPassword,
  setTempPassword,
  buttonList,
  selected,
  setIsCopied,
  setSelected,
}: customizationProps) => {
  const [error, setError] = useState("");

  const addLength = () => {
    if (length < 20) {
      setLength(length + 1);
      setError("");
    } else setError("Password must contain upto 20 characters");
  };

  const subtractLength = () => {
    if (length > 4) {
      setLength(length - 1);
      setError("");
    } else setError("Password must contain minimum 4 characters");
  };

  const buttonFix = (val: string) => {
    setError("");
    setSelected((prevSelected: string) => {
      if (prevSelected.includes(val)) {
        let sel = selected.filter((x: string) => x != val);
        return sel;
      } else {
        return [...prevSelected, val];
      }
    });
  };

  const generatePassword = () => {
    if (selected.length == 0) setError("Please select atleast one option");

    setIsCopied(false);
    setTempPassword("");

    const equiPart = Math.floor(length / selected.length);
    const diff = length - equiPart * selected.length;

    selected.map((gen: string) => {
      switch (gen) {
        case "Uppercase letter": {
          setTempPassword((prev: string) => prev + generateUppercase(equiPart));
          break;
        }
        case "Lowercase letter": {
          setTempPassword((prev: string) => prev + generateLowercase(equiPart));
          break;
        }
        case "Numerics": {
          setTempPassword((prev: string) => prev + generateNumerics(equiPart));
          break;
        }
        case "Symbols": {
          setTempPassword((prev: string) => prev + generateSymbols(equiPart));
          break;
        }

        default: {
          console.log("default");
          break;
        }
      }
    });

    if (diff > 0)
      setTempPassword((prev: any) => prev + generateUppercase(diff));
  };

  const generateUppercase = (eq: number) => {
    let newPass = "";
    while (eq != 0) {
      newPass += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
      eq--;
    }
    return newPass;
  };

  const generateLowercase = (eq: number) => {
    let newPass = "";
    while (eq != 0) {
      newPass += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
      eq--;
    }
    return newPass;
  };

  const generateNumerics = (eq: number) => {
    let newPass = "";
    while (eq != 0) {
      newPass += String.fromCharCode(Math.floor(Math.random() * 10) + 48);
      eq--;
    }
    return newPass;
  };

  const generateSymbols = (eq: number) => {
    const symbols = "@#$%&*!?";

    let newPass = "";
    while (eq != 0) {
      newPass += symbols.charAt(Math.floor(Math.random() * 8));
      eq--;
    }
    return newPass;
  };

  const clearPassword = () => {
    setSelected([]);
    setTempPassword("");
  };

  useEffect(() => {
    const passSplit = tempPassword.split("");
    const upto = Math.floor(tempPassword.length / 2);

    for (let i = tempPassword.length - 1; i >= upto; i--) {
      let index = Math.floor(Math.random() * upto);
      [passSplit[i], passSplit[index]] = [passSplit[index], passSplit[i]];
    }
    setPassword(passSplit.join(""));
  }, [tempPassword]);

  return (
    <>
      <div className="button-holder add-color display-flex display-flex-column">
        <div className="character-div display-flex">
          <h2>Character length</h2>{" "}
          <div className="display-flex" style={{ gap: "8px" }}>
            <div
              className="icons display-flex display-flex-center"
              onClick={addLength}
            >
              <FaPlus />
            </div>
            <span
              className="display-flex display-flex-center"
              style={{ width: "30px" }}
            >
              <h2>{length}</h2>
            </span>
            <div
              className="icons display-flex display-flex-center"
              onClick={subtractLength}
            >
              <FaMinus />
            </div>
          </div>
        </div>

        <div className="check-holding">
          {buttonList.map((value: any, index: any) => {
            return (
              <Button
                variant={selected.includes(value) ? "warning" : "light"}
                onClick={() => buttonFix(value)}
                key={index}
              >
                {value}
              </Button>
            );
          })}
        </div>

        <div className="button-go">
          <Button variant="success" onClick={generatePassword}>
            Go
          </Button>

          <Button variant="danger" onClick={clearPassword}>
            Clear
          </Button>
        </div>

        {error && <div className="error">{error}</div>}
      </div>
    </>
  );
};

export default Customization;
