import Data from "./data.json";
export default function Card() {
  const DataFromJson = Data;
  return (
    <div>
      <P>
        {DataFromJson.map((el) => {
          el["مقدم الخدمة"];
        })}
      </P>
    </div>
  );
}
