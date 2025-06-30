import { useState } from "react";
import PasswordDisplay from "./components/PasswordDisplay";
import PasswordGenerator from "./components/PasswordGenerator";

function App() {
  const [progress, setProgress] = useState(3);
  const [length, setLength] = useState(0);
  const [copied, setCopied] = useState(false);
  const [password, setPassword] = useState(null);
  const [strength, setStrength] = useState({});
  const [options, setOptions] = useState({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setOptions((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handlePasswordValidation = () => {
    let optArray = Object.values(options);
    if (!optArray.includes(true)) return;
    if (!length) return;
    setPassword(generatePassord(options, length));
    // calculate entropy (randomness)
    const entropy = getEntropy(options, length);
    setStrength(calculateStrength(entropy));
  };

  const generatePassord = (options, length) => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>/?";
    let chars = "";
    if (options.lowercase) chars += lowercase;
    if (options.uppercase) chars += uppercase;
    if (options.numbers) chars += numbers;
    if (options.symbols) chars += symbols;
    console.log(chars);

    let pwd = "";

    for (let i = 0; i < length; i++) {
      pwd += chars[Math.floor(Math.random() * chars.length)];
    }
    return pwd;
  };

  const getEntropy = (options, length) => {
    let size = 0;
    if (options.lowercase) size += 26;
    if (options.uppercase) size += 26;
    if (options.numbers) size += 10;
    if (options.symbols) size += 28;

    if (size === 0) return;
    return Math.round(length * Math.log2(size));
  };

  const calculateStrength = (entropy) => {
    if (entropy < 40)
      return {
        description: "Too Weak!",
        color: "red",
      };
    if (entropy < 60)
      return {
        description: "Weak!",
        color: "orange",
      };
    if (entropy < 80)
      return {
        description: "Medium",
        color: "yellow",
      };
    return { description: "Strong", color: "green" };
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <>
      <main>
        <section className="container">
          <h1 className="app__name">Password Generator</h1>
          <PasswordDisplay
            password={password}
            copyToClipboard={copyToClipboard}
            copied={copied}
            length={length}
            setLength={setLength}
          />

          <PasswordGenerator
            handleCheckbox={handleCheckbox}
            handlePasswordValidation={handlePasswordValidation}
            options={options}
            progress={progress}
            setProgress={setProgress}
            length={length}
            setLength={setLength}
            strength={strength}
          />
        </section>
      </main>
    </>
  );
}

export default App;
