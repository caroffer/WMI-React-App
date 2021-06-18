import { useEffect, useState } from "react";

function AsyncCall(callback, deps) {
  const [output, setOutput] = useState({ isPending: true });
  useEffect(() => {
    setOutput({ isPending: true });
    callback().then(
      /* success */ (result) => setOutput({ isPending: false, result }),
      /* failure */ (error) => setOutput({ isPending: false, error })
    );
  }, deps);
  return output;
}

export default AsyncCall;
