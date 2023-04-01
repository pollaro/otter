import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <div id="error-page">
        <h1>Oops. Something's wrong!</h1>

        <span>{error.statusText || error.message}</span>
      </div>
    </>
  );
}
