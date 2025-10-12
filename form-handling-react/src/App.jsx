import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/FormikForm";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl text-center font-bold mb-6">
        React Form Handling
      </h1>

      <RegistrationForm />
      <FormikForm />
    </div>
  );
}

export default App;

