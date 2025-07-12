// arc-win/pages/terms.tsx
import React from "react";
import Disclaimer from "../shared/components/Disclaimer";

export default function TermsOfUse() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
      <p className="mb-4">
        By using Arc-win, you agree to the following terms:
      </p>

      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>Arc-win is a tool for strategy and progress tracking only.</li>
        <li>Arc-win does not encourage cheating or illegal activities.</li>
        <li>Users are responsible for their own actions while using arcade machines.</li>
        <li>Arc-win is not liable for any bans, penalties, or legal issues resulting from user behavior.</li>
      </ul>

      <Disclaimer />

      <p className="mt-6 text-sm text-gray-600">
        Last updated: July 2025
      </p>
    </main>
  );
}
