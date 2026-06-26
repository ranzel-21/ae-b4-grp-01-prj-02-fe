import { AuthProvider } from "./hooks/useAuth";
import { AppRoutes } from "./routes";
import Lightfall from "./shared-components/Lightfall/Lightfall";

function App() {
  return (
    <AuthProvider>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
        <Lightfall 
          colors={['#735c40', '#dcdad5', '#faf9f8']}
          backgroundColor="#1a1c18" 
        />
      </div>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;