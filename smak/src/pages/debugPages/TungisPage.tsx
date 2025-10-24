import StaticMap from "../../partials/StaticMap";
const from = "Stockholm";
const to = "Linköping";

export default function TungisPage() {
  return (
    <>
      <h1>Hej</h1>
      <StaticMap from={from} to={to} />
    </>
  );
}
