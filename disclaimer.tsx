// arc-win/shared/components/Disclaimer.tsx
import React from "react";

export default function Disclaimer() {
  return (
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded-md max-w-xl mx-auto my-6">
      <h2 className="text-lg font-semibold mb-2">Disclaimer</h2>
      <p>
        Arc-win is not responsible for any trouble or consequences you may face at arcades.
        Arc-win does not directly exploit or hack arcade experiences; it only provides
        strategies to make learning and sharing easier. Use the information at your own risk.
      </p>
      <p className="mt-2 italic">
        Being honest, this whole project wouldn’t exist if there weren’t shady arcade owners rigging stuff.
        People would just be happy otherwise.
      </p>
    </div>
  );
}
