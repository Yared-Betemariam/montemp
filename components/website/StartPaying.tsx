import Pricing from "./Pricing";

const StartPaying = () => {
  return (
    <div className="flex flex-col max-w-[45rem] mx-auto py-6 gap-4">
      <div className="flex flex-col items-center justify-center space-y-2 text-center">
        <h2 className="text-4xl font-bold tracking-tighter">
          Choose your plan
        </h2>
        <p className="max-w-[900px] text-gray-500 text-base dark:text-gray-400">
          Upgrade to one of the listed plans
        </p>
      </div>

      <Pricing modal />
    </div>
  );
};
export default StartPaying;
