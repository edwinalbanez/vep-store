import { Card } from "@/modules/home";

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div className="flex justify-center gap-7 my-5">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export { Home };