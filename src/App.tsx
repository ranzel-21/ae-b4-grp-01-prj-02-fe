import { AuthProvider } from "./hooks/useAuth";
import { AppRoutes } from "./routes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
