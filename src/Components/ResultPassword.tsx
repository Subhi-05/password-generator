import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";

function ResultPassword({ password, isCopied, setIsCopied, selected }: any) {
  const [strengthVal, setStrengthVal] = useState(0);
  const [strength, setStrength] = useState("");

  useEffect(() => {
    const plen = password.length;

    if (!password) {
      setStrength("");
      setStrengthVal(0);
    } else {
      const strength =
        selected.length === 1
          ? "Low"
          : selected.length === 2
          ? plen < 11
            ? "Low"
            : "Medium"
          : plen <= 5
          ? "Low"
          : plen <= 10
          ? "Medium"
          : plen <= 15
          ? "Strong"
          : plen <= 20
          ? "Very Strong"
          : "Strong";

      const strengthVal =
        selected.length === 1
          ? 25
          : selected.length === 2
          ? plen < 11
            ? 25
            : 50
          : plen <= 5
          ? 25
          : plen <= 10
          ? 50
          : plen <= 15
          ? 75
          : plen <= 20
          ? 100
          : 100;

      setStrength(strength);
      setStrengthVal(strengthVal);
    }
  }, [password]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    if (password) setIsCopied(true);
  };

  useEffect(() => {
    if (!password) setIsCopied(false);
  }, [password]);

  return (
    <>
      <div className="add-color result-panel">
        <div
          className="display-flex display-flex-center password-tab"
          onClick={copyToClipboard}
          style={password ? { cursor: "pointer" } : {}}
        >
          <h3>{password != "" ? password : "Generate new password"}</h3>
        </div>

        {isCopied && (
          <div className="display-flex display-flex-center">
            <h6>Copied to clipboard!!</h6>
          </div>
        )}

        {password != "" ? (
          <div>
            <h6
              style={{ fontSize: "13px", opacity: "0.7", margin: "15px 0px" }}
            >
              Password generated. Click the above paasword to cpoy. Regenerate
              for more different passwords
            </h6>
          </div>
        ) : null}

        <div>
          <div
            className="display-flex character-div"
            style={{ marginBottom: "25px" }}
          >
            <h5>Password strength</h5>
            <h5>{strength}</h5>
          </div>
          <div className="progress-bar">
            <ProgressBar
              now={strengthVal}
              variant={
                strengthVal == 25
                  ? "danger"
                  : strengthVal == 50
                  ? "warning"
                  : strengthVal == 75
                  ? "info"
                  : strengthVal == 100
                  ? "success"
                  : ""
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ResultPassword;
