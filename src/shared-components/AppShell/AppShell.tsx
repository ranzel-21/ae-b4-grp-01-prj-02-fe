/* src/shared-components/AppShell/AppShell.tsx */
import { useState, useRef, useEffect, type ReactNode } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import SplitText from "../SplitText/SplitText";

export interface AppShellProps {
  actions?: ReactNode;
  children: ReactNode;
  subtitle: string;
  title: string;
}

export function AppShell({ actions, children, subtitle, title }: AppShellProps) {
  const { isAuthenticated, signOut, vendor } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Preserved: 5-second auto-collapse timer logic
  useEffect(() => {
    setHeaderVisible(true);
    const timer = setTimeout(() => {
      setHeaderVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [location.pathname, title, subtitle]);

  const authenticatedLinks = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Inventory", to: "/vendor/catalog" },
    { label: "Inquiries", to: "/vendor/inquiries" },
    { label: "Public Catalog", to: "/catalog" }
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "rgba(255, 255, 255, 0.82)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid var(--color-border)",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          height: "76px",
          boxShadow: "0 4px 24px rgba(99, 102, 241, 0.04)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "1400px", margin: "0 auto" }}>
          
          <div style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
            {/* Logo Upgrade: Text mask gradient applied to "Flow" for cosmic harmony */}
            <Link to="/catalog" style={{ 
              fontWeight: 800, 
              fontSize: "1.35rem",
              color: "var(--color-text-primary)",
              letterSpacing: "-0.03em",
              textDecoration: "none",
              display: "flex",
              alignItems: "center"
            }}>
              Vendor
              <span style={{ 
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 800,
                marginLeft: "2px"
              }}>
                Flow
              </span>
            </Link>
            
            {isAuthenticated && (
              <nav style={{ display: "flex", gap: "0.5rem" }}>
                {authenticatedLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    style={({ isActive }) => ({
                      fontSize: "0.95rem",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "#ffffff" : "var(--color-text-secondary)",
                      padding: "0.5rem 1rem",
                      borderRadius: "var(--radius-sm)",
                      background: isActive ? "var(--gradient-primary)" : "transparent",
                      boxShadow: isActive ? "0 4px 12px rgba(99, 102, 241, 0.2)" : "none",
                      transition: "all 0.25s ease",
                      display: "flex",
                      alignItems: "center",
                    })}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            {actions}
            {!isAuthenticated && (
              <>
                <Link 
                  to="/catalog"
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "var(--color-text-secondary)",
                    padding: "0.5rem 0.75rem",
                    transition: "color 0.2s ease"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-text-primary)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-secondary)"}
                >
                </Link>
                {/* Action Button Upgrade: Swapped solid brown with full fluid gradient & glow shadow */}
                <Link 
                  to="/login"
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#ffffff",
                    background: "var(--gradient-primary)",
                    padding: "0.65rem 1.5rem",
                    borderRadius: "var(--radius-sm)",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: "var(--shadow-sm), 0 4px 14px rgba(99, 102, 241, 0.15)",
                    display: "inline-block"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--gradient-primary-hover)";
                    e.currentTarget.style.boxShadow = "var(--gradient-glow)";
                    e.currentTarget.style.transform = "translateY(-1.5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--gradient-primary)";
                    e.currentTarget.style.boxShadow = "var(--shadow-sm), 0 4px 14px rgba(99, 102, 241, 0.15)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  Vendor Portal
                </Link>
              </>
            )}
            
            {isAuthenticated && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--color-text-primary)" }}>
                  {vendor?.businessName || "Vendor"}
                </span>
                <div ref={dropdownRef} style={{ position: "relative" }}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      color: "var(--color-text-primary)",
                      transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                      boxShadow: "var(--shadow-sm)",
                      padding: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-border-hover)";
                      e.currentTarget.style.boxShadow = "0 0 12px rgba(139, 92, 246, 0.25)";
                      e.currentTarget.style.transform = "scale(1.03)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                      if (!isProfileOpen) {
                        e.currentTarget.style.borderColor = "var(--color-border)";
                        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                      }
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </button>
                  {isProfileOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "120%",
                        right: 0,
                        backgroundColor: "var(--color-surface)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-sm)",
                        boxShadow: "var(--shadow-lg)",
                        minWidth: "180px",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        zIndex: 100
                      }}
                    >
                      <Link
                        to="/profile"
                        style={{ 
                          padding: "0.85rem 1rem", 
                          color: "var(--color-text-primary)", 
                          fontSize: "0.95rem", 
                          borderBottom: "1px solid var(--color-border)",
                          fontWeight: 500,
                          transition: "background-color 0.2s ease",
                          display: "block"
                        }}
                        onClick={() => setIsProfileOpen(false)}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--color-surface-muted)"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          signOut();
                        }}
                        style={{
                          background: "transparent",
                          border: "none",
                          padding: "0.85rem 1rem",
                          color: "var(--color-error)",
                          fontSize: "0.95rem",
                          textAlign: "left",
                          cursor: "pointer",
                          fontWeight: 600,
                          transition: "background-color 0.2s ease",
                          display: "block",
                          width: "100%"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.08)"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="animate-fade-in" style={{ flex: 1, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem", position: "relative", zIndex: 10 }}>
        <header 
          style={{ 
            /* Layout Preservation: Flex column layout handles short vs long titles perfectly */
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center", 
            maxWidth: "800px", 
            margin: "0 auto",
            width: "100%",
            
            /* Feature Preservation: Smooth 5s fade-out and slide-collapse transitions */
            opacity: headerVisible ? 1 : 0,
            maxHeight: headerVisible ? "300px" : "0px",
            marginBottom: headerVisible ? "4rem" : "0px",
            overflow: "hidden",
            transition: "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: headerVisible ? "auto" : "none"
          }}
        >
          <SplitText 
            text={title} 
            tag="h1" 
            className="app-shell-title" 
            splitType="chars" 
            delay={30} 
          />
          {subtitle && (
            <SplitText 
              text={subtitle} 
              tag="p" 
              className="app-shell-subtitle" 
              splitType="words" 
              delay={20} 
            />
          )}
        </header>
        {children}
      </main>
    </div>
  );
}