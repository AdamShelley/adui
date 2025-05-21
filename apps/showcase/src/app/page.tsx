export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10">
        Welcome to the Showcase
      </h1>
      <p className="text-lg text-center mt-4">
        Explore the features of our components!
      </p>
      <div className="flex flex-col items-center mt-10">
        {/* Add your component showcase here */}
        <h2 className="text-2xl font-semibold mb-4">Component Showcase</h2>
        <p className="text-lg text-gray-700 mb-6">
          This is where you can showcase your components.
        </p>
      </div>
    </div>
  );
}
