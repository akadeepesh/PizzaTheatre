import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function UnSafePage() {
  const { user } = useUser();
  const [admin, setAdmin] = useState(false);

  return (
    <div className="mt-36">
      <input type="text" onChange={(e) => setAdmin(!admin)} />
      <button
        onClick={() => {
          user?.update({
            unsafeMetadata: {
              admin,
            },
          });
        }}
      >
        Make admin
      </button>
    </div>
  );
}
