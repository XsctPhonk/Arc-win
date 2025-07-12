"use client";

import React, { useState } from "react";

export default function FailCounter() {
  const [failCount, setFailCount] = useState(0);
  const [ticketsPaid, setTicketsPaid] = useState<number | null>(null);
  const [goalTickets, setGoalTickets] = useState<number | null>(null);
  const [showPayoutInput, setShowPayoutInput] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  function onFail() {
    setFailCount((c) => c + 1);
    setResultMessage("");
  }

  function onPayoutClick() {
    setShowPayoutInput(true);
    setResultMessage("");
  }

  function onSubmitPayout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (ticketsPaid === null || goalTickets === null) {
      alert("Please enter both payout and goal ticket amounts.");
      return;
    }
    if (ticketsPaid <= 0 || goalTickets <= 0) {
      alert("Please enter positive numbers.");
      return;
    }
    if (goalTickets < ticketsPaid) {
      alert("Goal tickets should be equal or greater than payout tickets.");
      return;
    }

    // Calculate odds
    // Let's say odds = (failCount / ticketsPaid) * 100 to get a rough % fail rate
    // Then estimate tries left = ((goalTickets - ticketsPaid) / ticketsPaid) * failCount
    // Simple "worth it" check: if tries left * cost per try is too high, warn user
    // Since cost per try varies, we'll just comment on tries

    const failRate = failCount / ticketsPaid;
    const triesLeftEstimate =
      ((goalTickets - ticketsPaid) / ticketsPaid) * failCount;

    // Odds of payout next try roughly = 1 / (failCount + 1)
    const nextTryOddsPercent = Math.min(
      100,
      (1 / (failCount + 1)) * 100
    ).toFixed(1);

    let worthItMsg = "";

    if (triesLeftEstimate > failCount * 5) {
      worthItMsg =
        "Warning: It may take a lot more attempts to reach your goal. Consider if it's worth it!";
    } else {
      worthItMsg = "Looks like you're on track to reach your goal!";
    }

    setResultMessage(
      `Fails so far: ${failCount}\nTickets paid last payout: ${ticketsPaid}\nYour goal: ${goalTickets}\n\n` +
        `Estimated tries left to reach goal: ~${triesLeftEstimate.toFixed(
          0
        )}\nOdds to win on next try: ~${nextTryOddsPercent}%\n\n${worthItMsg}`
    );

    // Reset fail count after payout
    setFailCount(0);
    setShowPayoutInput(false);
  }

  return (
    <main className="p-6 max-w-lg mx-auto text-center bg-gray-50 rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Arc-win Fail Counter</h1>
      <div className="mb-4">
        <span className="text-xl font-semibold">Fail Count: </span>
        <span className="text-2xl">{failCount}</span>
      </div>

      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={onFail}
          className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-700"
          aria-label="Add Fail"
        >
          Fail
        </button>

        <button
          onClick={onPayoutClick}
          className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700"
          aria-label="Payout"
        >
          Payout
        </button>
      </div>

      {showPayoutInput && (
        <form
          onSubmit={onSubmitPayout}
          className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto"
        >
          <div className="mb-4 text-left">
            <label htmlFor="ticketsPaid" className="block mb-1 font-semibold">
              Tickets Paid Out:
            </label>
            <input
              type="number"
              id="ticketsPaid"
              min={1}
              value={ticketsPaid ?? ""}
              onChange={(e) => setTicketsPaid(Number(e.target.value))}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <div className="mb-4 text-left">
            <label htmlFor="goalTickets" className="block mb-1 font-semibold">
              Goal Tickets:
            </label>
            <input
              type="number"
              id="goalTickets"
              min={1}
              value={goalTickets ?? ""}
              onChange={(e) => setGoalTickets(Number(e.target.value))}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 w-full"
          >
            Calculate Odds
          </button>
        </form>
      )}

      {resultMessage && (
        <pre className="mt-6 whitespace-pre-wrap bg-white p-4 rounded shadow max-w-md mx-auto text-left text-gray-800">
          {resultMessage}
        </pre>
      )}
    </main>
  );
}
