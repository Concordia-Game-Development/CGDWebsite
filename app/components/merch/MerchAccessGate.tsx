import React, { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import { Lock } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { MerchAccessGate as MerchAccessGateModel } from "~/lib/merch/models";

interface MerchAccessGateProps {
  gate: MerchAccessGateModel;
  children: React.ReactNode;
}

export const MerchAccessGate: React.FC<MerchAccessGateProps> = ({
  gate,
  children,
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!gate.enabled) return;

    try {
      if (window.sessionStorage.getItem(gate.storageKey) === "true") {
        setIsUnlocked(true);
      }
    } catch {
      // Ignore storage access errors in restricted browsing contexts.
    }
  }, [gate.enabled, gate.storageKey]);

  if (!gate.enabled || isUnlocked) {
    return <>{children}</>;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (gate.verifyCode(codeInput)) {
      setError("");
      setIsUnlocked(true);
      try {
        window.sessionStorage.setItem(gate.storageKey, "true");
      } catch {
        // Ignore storage access errors in restricted browsing contexts.
      }
      return;
    }

    setError("Invalid access code. Please try again.");
  };

  return (
    <section className="relative z-10 mx-auto flex min-h-[60vh] max-w-lg items-center justify-center px-5 pb-20">
      <div className="w-full rounded-3xl bg-white/35 backdrop-blur-xl border border-[#f2c5d3]/70 p-8 sm:p-10 shadow-xl text-center flex flex-col items-center gap-5">
        <div className="rounded-full bg-[#f2c5d3]/60 p-3.5 text-dark-purple">
          <Lock className="h-6 w-6" aria-hidden="true" />
        </div>

        <h1 className="font-ls uppercase text-4xl sm:text-5xl text-dark-purple">
          {gate.title}
        </h1>

        <p className="font-corbert font-semibold text-base text-dark-purple/80">
          {gate.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <input
            type="text"
            value={codeInput}
            onChange={(e) => {
              setCodeInput(e.target.value);
              if (error) {
                setError("");
              }
            }}
            placeholder="Enter access code"
            autoComplete="off"
            aria-label="Access code"
            className="w-full rounded-full border border-[#f2c5d3]/90 bg-white/75 px-5 py-3 text-center font-corbert font-bold text-dark-purple placeholder:text-dark-purple/45 focus:outline-none focus:ring-2 focus:ring-cgd-pink"
          />

          {error && (
            <p
              role="alert"
              className="font-corbert font-bold text-sm text-cgd-pfull"
            >
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full rounded-full bg-dark-purple hover:bg-dark-purple/90 text-wfull font-corbert font-bold py-6 text-base shadow-md active:scale-95 transition-all"
          >
            Unlock Page
          </Button>
        </form>

        <Link
          to="/"
          className="font-corbert font-bold text-sm text-dark-purple/75 hover:text-dark-purple hover:underline"
        >
          Return to Home
        </Link>
      </div>
    </section>
  );
};
