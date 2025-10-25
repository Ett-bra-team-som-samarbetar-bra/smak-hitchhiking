import StaticMap from "../../components/trip/StaticMap";
const from = "Stockholm";
const to = "Linköping";

export default function TungisPage() {
  return (
    <>
      <h1>Hej</h1>
      <StaticMap
        from={from}
        to={to}
        width="740"
        height="400"
        className="w-100" />
    </>
  );
}
