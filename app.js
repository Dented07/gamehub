// GameHub app with real Steam API integration
const { useState, useEffect } = React;

// API Service with real Steam integration
const apiService = {
  // Replace with your actual Steam API key
  steamApiKey: "8C350896FE0C447A2AAD7EBCC3DBA165",
  
  // Authenticate with Steam
  authenticateSteam: async (steamId) => {
    try {
      // In a real implementation, you'd use OpenID for authentication
      // This is a simplified version that just validates the Steam ID
      if (!steamId || !/^\d+$/.test(steamId)) {
        throw new Error("Invalid Steam ID format");
      }
      return { success: true, steamId };
    } catch (error) {
      console.error("Steam authentication error:", error);
      throw error;
    }
  },
  
  // Get real Steam games using the Web API
  getSteamGames: async (steamId) => {
  try {
    // Use a CORS proxy for GitHub Pages
    const corsProxy = "https://corsproxy.io/?";
    const steamApiUrl = `${corsProxy}https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiService.steamApiKey}&steamid=${steamId}&format=json`;
    
    const response = await fetch(steamApiUrl);
    
    if (!response.ok) {
      throw new Error(`Steam API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if we have games data in the expected format
    if (data?.response?.games && Array.isArray(data.response.games)) {
      console.log("Successfully fetched", data.response.games.length, "games");
      
      // Process the games - note that we need to add game details since they're not included
      return data.response.games.map(game => ({
        id: `steam-${game.appid}`,
        title: `Game ${game.appid}`, // We'll need to fetch names separately
        cover: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`,
        platform: 'Steam',
        macSupported: true, // We'd need another API call to determine this
        storeId: game.appid.toString(),
        playtime: Math.floor(game.playtime_forever / 60) // Convert minutes to hours
      }));
    } else {
      console.error("Unexpected API response format:", data);
      return [];
    }
  } catch (error) {
    console.error("Steam games fetch error:", error);
    throw error;
  }
}
      
      // Process the real Steam library data
      if (data?.response?.games) {
        return data.response.games.map(game => ({
          id: `steam-${game.appid}`,
          title: game.name || `Game ${game.appid}`,
          cover: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`,
          platform: 'Steam',
          // Steam doesn't directly tell us Mac compatibility in this API call
          macSupported: true, // We'll assume true for now
          storeId: game.appid.toString(),
          playtime: Math.floor(game.playtime_forever / 60) // Convert minutes to hours
        }));
      }
      
      return [];
    } catch (error) {
      console.error("Steam games fetch error:", error);
      throw error;
    }
  },
  
  // Sample data for other platforms (for demo purposes)
  getPlatformGames: (platform) => {
    const platforms = {
      xbox: [
        { id: 'x1', title: 'Halo Infinite', cover: 'https://via.placeholder.com/150x200?text=Halo+Infinite', platform: 'Xbox', macSupported: false, storeId: 'xgz237x8gl' },
        { id: 'x2', title: 'Forza Horizon 5', cover: 'https://via.placeholder.com/150x200?text=Forza+Horizon+5', platform: 'Xbox', macSupported: false, storeId: 'fx29zx85gb' }
      ],
      psplus: [
        { id: 'p1', title: 'God of War Ragnarök', cover: 'https://via.placeholder.com/150x200?text=God+of+War', platform: 'PlayStation', macSupported: false, storeId: 'PPSA01527_00' }
      ],
      epic: [
        { id: 'e1', title: 'Fortnite', cover: 'https://via.placeholder.com/150x200?text=Fortnite', platform: 'Epic', macSupported: true, storeId: 'fortnite' }
      ]
    };
    
    return platforms[platform] || [];
  }
};

// GameCard Component
const GameCard = ({ game }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = () => {
    if (game.macSupported) {
      setIsDownloading(true);
      
      // For Steam games, use the real Steam protocol URI
      if (game.platform === 'Steam') {
        // Create the steam:// protocol URI
        const steamUri = `steam://install/${game.storeId}`;
        
        // In a real app, this would open the Steam client
        // For web, we can only suggest it or use window.open
        try {
          window.open(steamUri, '_blank');
        } catch (e) {
          console.error("Failed to open Steam client:", e);
        }
      }
      
      setTimeout(() => {
        setIsDownloading(false);
        alert(`Opening ${game.platform} to download ${game.title}`);
      }, 1000);
    } else {
      alert(`${game.title} is not supported on macOS`);
    }
  };
  
  return React.createElement("div", {
    className: "game-card",
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  }, [
    React.createElement("img", {
      key: "image",
      src: game.cover,
      alt: game.title,
      onError: (e) => {
        // Fallback if Steam image fails to load
        e.target.src = 'https://via.placeholder.com/150x200?text=Game';
      }
    }),
    
    isHovered && !isDownloading && React.createElement("div", {
      key: "hover",
      className: "game-card-overlay"
    }, [
      React.createElement("button", {
        key: "download-btn",
        onClick: handleDownload,
        className: "download-btn"
      }, "Download"),
      
      React.createElement("span", {
        key: "compat",
        className: game.macSupported ? "mac-compatible" : "not-compatible"
      }, game.macSupported ? "Mac Compatible" : "Not Mac Compatible"),
      
      game.playtime !== undefined && React.createElement("span", {
        key: "playtime",
        className: "playtime"
      }, `${game.playtime} hours played`)
    ]),
    
    isDownloading && React.createElement("div", {
      key: "loading",
      className: "loading-overlay"
    }, [
      React.createElement("div", {
        key: "spinner",
        className: "spinner"
      }),
      React.createElement("p", {
        key: "loading-text",
      }, `Opening ${game.platform}...`)
    ]),
    
    React.createElement("div", {
      key: "info",
      className: "game-info"
    }, [
      React.createElement("h3", { key: "title" }, game.title),
      React.createElement("div", { key: "platform" }, game.platform)
    ])
  ]);
};

// Main App Component
const GameHubApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [connectedServices, setConnectedServices] = useState([]);
  const [games, setGames] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [authService, setAuthService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Connect to gaming platform
  const connectService = (service) => {
    setAuthService(service);
    setShowLogin(true);
  };
  
  // Handle authentication for different platforms
  const handleLogin = async (credentials) => {
    setIsLoading(true);
    
    try {
      if (authService === 'steam') {
        // Use real Steam API
        if (!credentials.steamId) {
          throw new Error("Steam ID is required");
        }
        
        // Authenticate with Steam
        await apiService.authenticateSteam(credentials.steamId);
        
        // Get real Steam games
        const steamGames = await apiService.getSteamGames(credentials.steamId);
        
        // Update connected services
        setConnectedServices(prev => {
          if (!prev.includes('steam')) {
            return [...prev, 'steam'];
          }
          return prev;
        });
        
        // Update games list
        setGames(prev => {
          // Remove existing Steam games to avoid duplicates
          const nonSteamGames = prev.filter(game => game.platform !== 'Steam');
          return [...nonSteamGames, ...steamGames];
        });
      } else {
        // For other platforms, use demo data for now
        setConnectedServices(prev => {
          if (!prev.includes(authService)) {
            return [...prev, authService];
          }
          return prev;
        });
        
        // Get demo games for non-Steam platforms
        const platformGames = apiService.getPlatformGames(authService);
        setGames(prev => [...prev, ...platformGames]);
      }
      
      // Success message
      alert(`Successfully connected to ${authService === 'psplus' ? 'PlayStation' : authService.charAt(0).toUpperCase() + authService.slice(1)}!`);
      
      // Close modal
      setShowLogin(false);
    } catch (error) {
      alert(`Connection failed: ${error.message}`);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Render platform buttons for home screen
  const renderPlatformButtons = () => {
    const platforms = [
      { id: 'steam', name: 'Steam' },
      { id: 'epic', name: 'Epic Games' },
      { id: 'xbox', name: 'Xbox' },
      { id: 'psplus', name: 'PlayStation' }
    ];
    
    return platforms.map(platform => {
      const connected = connectedServices.includes(platform.id);
      
      return React.createElement("button", {
        key: platform.id,
        className: `platform-btn ${connected ? 'connected' : ''}`,
        onClick: () => connectService(platform.id)
      }, [
        platform.name,
        connected && React.createElement("span", { 
          key: "badge",
          className: "connected-badge" 
        }, "Connected")
      ]);
    });
  };
  
  // Login Modal Component for different platforms
  const LoginModal = () => {
    if (!showLogin) return null;
    
    const services = {
      xbox: 'Xbox',
      psplus: 'PlayStation Plus',
      steam: 'Steam',
      epic: 'Epic Games'
    };
    
    // Steam-specific login form
    if (authService === 'steam') {
      const [steamId, setSteamId] = useState("");
      const [error, setError] = useState("");
      
      const handleSteamSubmit = (e) => {
        e.preventDefault();
        if (!steamId.trim()) {
          setError("Please enter your Steam ID");
          return;
        }
        
        handleLogin({ steamId });
      };
      
      return React.createElement("div", {
        className: "modal-overlay"
      }, 
        React.createElement("div", {
          className: "modal-content"
        }, [
          React.createElement("h3", { key: "title" }, `Connect ${services[authService]}`),
          React.createElement("p", { key: "desc" }, "Enter your Steam ID to sync your game library"),
          
          error && React.createElement("div", { 
            key: "error",
            className: "error-message" 
          }, error),
          
          React.createElement("form", { 
            key: "form", 
            className: "login-form",
            onSubmit: handleSteamSubmit
          }, [
            React.createElement("div", { key: "steamid-group" }, [
              React.createElement("label", { key: "steamid-label" }, "Steam ID"),
              React.createElement("input", { 
                key: "steamid-input",
                type: "text", 
                value: steamId,
                onChange: (e) => setSteamId(e.target.value),
                placeholder: "Enter your 17-digit Steam ID"
              }),
              React.createElement("div", { 
                key: "steamid-help",
                className: "form-help" 
              }, "Find your Steam ID in your profile URL or use SteamID.io")
            ]),
            
            React.createElement("div", { key: "buttons", className: "modal-buttons" }, [
              React.createElement("button", {
                key: "cancel",
                type: "button",
                onClick: () => setShowLogin(false),
                className: "cancel-btn"
              }, "Cancel"),
              
              React.createElement("button", {
                key: "connect",
                type: "submit",
                className: "connect-btn",
                disabled: isLoading
              }, isLoading ? "Connecting..." : "Connect to Steam")
            ])
          ])
        ])
      );
    }
    
    // Generic login form for other platforms (demo mode)
    return React.createElement("div", {
      className: "modal-overlay"
    }, 
      React.createElement("div", {
        className: "modal-content"
      }, [
        React.createElement("h3", { key: "title" }, `Connect ${services[authService]}`),
        React.createElement("p", { key: "desc" }, `Sign in to sync your game library from ${services[authService]}`),
        
        React.createElement("div", { key: "form", className: "login-form" }, [
          React.createElement("div", { key: "username-group" }, [
            React.createElement("label", { key: "username-label" }, "Email/Username"),
            React.createElement("input", { 
              key: "username-input",
              type: "text", 
              defaultValue: "demo_user" 
            })
          ]),
          
          React.createElement("div", { key: "password-group" }, [
            React.createElement("label", { key: "password-label" }, "Password"),
            React.createElement("input", { 
              key: "password-input",
              type: "password", 
              defaultValue: "demo_password" 
            })
          ]),
          
          React.createElement("div", { key: "demo-notice", className: "demo-notice" },
            "Demo Mode: Real API integration is only available for Steam currently."
          ),
          
          React.createElement("div", { key: "buttons", className: "modal-buttons" }, [
            React.createElement("button", {
              key: "cancel",
              onClick: () => setShowLogin(false),
              className: "cancel-btn",
              type: "button"
            }, "Cancel"),
            
            React.createElement("button", {
              key: "connect",
              onClick: () => handleLogin({ demo: true }),
              className: "connect-btn",
              type: "button",
              disabled: isLoading
            }, isLoading ? "Connecting..." : "Connect (Demo Mode)")
          ])
        ])
      ])
    );
  };
  
  return React.createElement("div", {
    className: "app-container"
  }, [
    // Login Modal
    React.createElement(LoginModal, { key: "login-modal" }),
    
    // Header
    React.createElement("header", { key: "header", className: "app-header" }, [
      React.createElement("div", { key: "logo", className: "logo" }, "GameHub"),
      React.createElement("div", { key: "user", className: "user-icon" }, "👤")
    ]),
    
    // Main content
    React.createElement("div", { key: "main", className: "main-content" }, [
      // Navigation
      React.createElement("nav", { key: "nav", className: "side-nav" }, [
        React.createElement("button", {
          key: "home",
          className: activeTab === 'home' ? 'active' : '',
          onClick: () => setActiveTab('home')
        }, "🏠"),
        React.createElement("button", {
          key: "library",
          className: activeTab === 'library' ? 'active' : '',
          onClick: () => setActiveTab('library')
        }, "📚"),
        React.createElement("button", {
          key: "settings",
          className: activeTab === 'settings' ? 'active' : '',
          onClick: () => setActiveTab('settings')
        }, "⚙️")
      ]),
      
      // Content Area
      React.createElement("div", { key: "content", className: "content-area" }, [
        // Home Tab
        activeTab === 'home' && React.createElement("div", { key: "home-tab" }, [
          React.createElement("h2", { key: "title" }, "Game Library Hub"),
          
          games.length > 0 ? 
            React.createElement("div", { key: "games" }, [
              React.createElement("h3", { key: "games-title" }, "Your Games"),
              React.createElement("div", { key: "games-grid", className: "games-grid" }, 
                games.map(game => React.createElement(GameCard, { key: game.id, game }))
              )
            ]) : 
            React.createElement("div", { key: "platforms", className: "platforms-container" }, [
              React.createElement("h3", { key: "platforms-title" }, "Connect Your Gaming Platforms"),
              React.createElement("p", { key: "platforms-desc" }, "Sync and manage all your games in one place"),
              React.createElement("div", { key: "platform-buttons", className: "platform-buttons" },
                renderPlatformButtons()
              )
            ])
        ]),
        
        // Library Tab
        activeTab === 'library' && React.createElement("div", { key: "library-tab" }, [
          React.createElement("h2", { key: "title" }, "My Library"),
          
          connectedServices.length > 0 ? 
            connectedServices.map(service => 
              React.createElement("div", { key: service }, [
                React.createElement("h3", { key: "platform-title" }, `${service.charAt(0).toUpperCase() + service.slice(1)} Library`),
                React.createElement("div", { key: "games-grid", className: "games-grid" }, 
                  games
                    .filter(game => game.platform.toLowerCase() === (service === 'psplus' ? 'playstation' : service))
                    .map(game => React.createElement(GameCard, { key: game.id, game }))
                )
              ])
            ) : 
            React.createElement("div", { key: "no-libraries", className: "no-content" },
              "No libraries connected yet. Go to Settings to connect your accounts."
            )
        ]),
        
        // Settings Tab
        activeTab === 'settings' && React.createElement("div", { key: "settings-tab" }, [
          React.createElement("h2", { key: "title" }, "Settings"),
          
          React.createElement("div", { key: "connections", className: "settings-section" }, [
            React.createElement("h3", { key: "section-title" }, "Platform Connections"),
            
            React.createElement("div", { key: "platforms", className: "platform-connections" },
              ['steam', 'epic', 'xbox', 'psplus'].map(service => {
                const names = { steam: 'Steam', epic: 'Epic Games', xbox: 'Xbox', psplus: 'PlayStation' };
                const connected = connectedServices.includes(service);
                
                return React.createElement("div", { key: service, className: "platform-row" }, [
                  React.createElement("span", { key: "name" }, names[service]),
                  connected ? 
                    React.createElement("div", { key: "connected", className: "connected-controls" }, [
                      React.createElement("button", { 
                        key: "sync", 
                        className: "sync-btn",
                        onClick: () => {
                          if (service === 'steam') {
                            alert("Syncing Steam library...");
                            // Here you would refresh the Steam library
                          } else {
                            alert(`Syncing ${names[service]} library...`);
                          }
                        }
                      }, "Sync Now"),
                      React.createElement("span", { key: "status", className: "connected-status" }, "Connected")
                    ]) : 
                    React.createElement("button", {
                      key: "connect",
                      className: "connect-platform-btn",
                      onClick: () => connectService(service)
                    }, service === 'steam' ? "Connect with API" : "Connect")
                ]);
              })
            )
          ]),
          
          React.createElement("div", { key: "app-settings", className: "settings-section" }, [
            React.createElement("h3", { key: "section-title" }, "App Settings"),
            
            React.createElement("div", { key: "settings-list", className: "settings-list" }, [
              React.createElement("div", { key: "auto-launch", className: "setting-row" }, [
                React.createElement("span", { key: "label" }, "Auto-launch platform clients"),
                React.createElement("div", { key: "toggle", className: "toggle-switch" }, [
                  React.createElement("div", { key: "switch", className: "switch-on" })
                ])
              ]),
              
              React.createElement("div", { key: "auto-sync", className: "setting-row" }, [
                React.createElement("span", { key: "label" }, "Auto-sync libraries"),
                React.createElement("div", { key: "toggle", className: "toggle-switch" }, [
                  React.createElement("div", { key: "switch", className: "switch-on" })
                ])
              ])
            ])
          ]),
          
          React.createElement("div", { key: "api-settings", className: "settings-section" }, [
            React.createElement("h3", { key: "section-title" }, "API Settings"),
            
            React.createElement("div", { key: "api-key", className: "api-key-section" }, [
              React.createElement("label", { key: "label" }, "Steam API Key"),
              React.createElement("div", { key: "key-input", className: "api-key-input" }, [
                React.createElement("input", { 
                  key: "input",
                  type: "password",
                  value: "•".repeat(24),
                  readOnly: true
                }),
                React.createElement("button", { 
                  key: "btn", 
                  className: "edit-api-key-btn",
                  onClick: () => {
                    const newKey = prompt("Enter your Steam API Key:", apiService.steamApiKey);
                    if (newKey && newKey.trim()) {
                      apiService.steamApiKey = newKey.trim();
                      alert("Steam API Key updated!");
                    }
                  }
                }, "Edit")
              ]),
              React.createElement("p", { key: "key-help", className: "api-key-help" },
                "Your Steam API key is stored locally and used to access your Steam library data."
              )
            ])
          ])
        ])
      ])
    ])
  ]);
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(GameHubApp));
