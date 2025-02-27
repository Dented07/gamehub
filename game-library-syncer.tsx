import React, { useState, useEffect } from 'react';
import { Library, Settings, User, Home } from 'lucide-react';

const GameHubApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [connectedServices, setConnectedServices] = useState([]);
  const [games, setGames] = useState([]);
  const [authService, setAuthService] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  
  // API service for platform integration
  const apiService = {
    // Authentication - Connect to actual platform APIs
    authenticate: async (service, credentials) => {
      console.log(`Authenticating with ${service}`);
      
      // Real API endpoints for each platform
      const endpoints = {
        xbox: 'https://xbox-api.microsoft.com/auth',
        psplus: 'https://auth.playstation.com/api/v1/authorize',
        steam: 'https://api.steampowered.com/ISteamUser/AuthenticateUser',
        epic: 'https://www.epicgames.com/id/api/authenticate'
      };
      
      try {
        // For demo purposes, we'll simulate a successful API response
        // In a real app, this would be an actual fetch call to the platform's API
        return { success: true, token: "api-auth-token-example" };
      } catch (error) {
        console.error(`Authentication error with ${service}:`, error);
        throw error;
      }
    },
    
    // Get games library from the connected platform
    getGames: async (service, token) => {
      console.log(`Fetching games from ${service}`);
      
      // Real API endpoints for game libraries
      const endpoints = {
        xbox: 'https://xbox-api.microsoft.com/games/library',
        psplus: 'https://api.playstation.com/v1/library/games',
        steam: 'https://api.steampowered.com/IPlayerService/GetOwnedGames',
        epic: 'https://api.epicgames.com/library/v1/games'
      };
      
      // Here we'd make the actual API call with the auth token
      // For demo, we'll return sample data that mimics real API responses
      return getPlatformGames(service);
    },
    
    // Initiate download via platform API
    initiateDownload: async (service, gameId) => {
      console.log(`Initiating download for ${gameId} on ${service}`);
      
      // API endpoints to trigger downloads on each platform
      const endpoints = {
        steam: `https://api.steampowered.com/IClientInstall/DownloadGame`,
        epic: `https://launcher-public-service-prod.ol.epicgames.com/launcher/api/public/download/${gameId}`
      };
      
      // Return simulated response
      return { status: "download_initiated" };
    }
  };
  
  // Sample platform-specific games (would come from real API in production)
  const getPlatformGames = (platform) => {
    const platforms = {
      xbox: [
        { id: 'x1', title: 'Halo Infinite', cover: '/api/placeholder/150/200', platform: 'Xbox', macSupported: false, storeId: 'xgz237x8gl' },
        { id: 'x2', title: 'Forza Horizon 5', cover: '/api/placeholder/150/200', platform: 'Xbox', macSupported: false, storeId: 'fx29zx85gb' }
      ],
      psplus: [
        { id: 'p1', title: 'God of War Ragnarök', cover: '/api/placeholder/150/200', platform: 'PlayStation', macSupported: false, storeId: 'PPSA01527_00' }
      ],
      steam: [
        { id: 's1', title: 'Counter-Strike 2', cover: '/api/placeholder/150/200', platform: 'Steam', macSupported: true, storeId: '730' },
        { id: 's2', title: 'Stardew Valley', cover: '/api/placeholder/150/200', platform: 'Steam', macSupported: true, storeId: '413150' }
      ],
      epic: [
        { id: 'e1', title: 'Fortnite', cover: '/api/placeholder/150/200', platform: 'Epic', macSupported: true, storeId: 'fortnite' }
      ]
    };
    
    return platforms[platform] || [];
  };
  
  // Connect to gaming platform
  const connectService = async (service) => {
    setAuthService(service);
    setShowLogin(true);
  };
  
  // Handle platform authentication
  const handleLogin = async (credentials) => {
    try {
      // For demo purposes, let's make it work immediately without requiring real credentials
      // In a real app, we would verify credentials with the platform's API
      
      // Simulate successful authentication
      const authResult = { success: true, token: "demo-token-" + Math.random().toString(36).substr(2, 9) };
      
      // Store auth token (for demo purposes)
      localStorage.setItem(`${authService}_token`, authResult.token);
      
      // Add platform to connected services
      setConnectedServices(prev => {
        if (!prev.includes(authService)) {
          return [...prev, authService];
        }
        return prev;
      });
      
      // Fetch games from the service
      const platformGames = getPlatformGames(authService);
      
      // Add games to the library
      setGames(prev => {
        // Remove existing games from this platform to avoid duplicates
        const filteredGames = prev.filter(game => {
          const gamePlatform = game.platform.toLowerCase();
          const currentPlatform = authService === 'psplus' ? 'playstation' : authService;
          return gamePlatform !== currentPlatform;
        });
        
        // Add the new games
        return [...filteredGames, ...platformGames];
      });
      
      // Close the login modal
      setShowLogin(false);
      
      // Show success message
      alert(`Successfully connected to ${authService === 'psplus' ? 'PlayStation' : authService.charAt(0).toUpperCase() + authService.slice(1)}!`);
      
    } catch (error) {
      alert(`Failed to connect: ${error.message}`);
    }
  };
  
  // Game Card Component with download functionality
  const GameCard = ({ game }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    
    // Handle game download using platform's API
    const handleDownload = async () => {
      if (game.macSupported) {
        try {
          setIsDownloading(true);
          
          // Get the platform service name
          const service = game.platform.toLowerCase() === 'playstation' ? 'psplus' : game.platform.toLowerCase();
          
          // Call the platform's download API
          await apiService.initiateDownload(service, game.storeId);
          
          // Open the platform client using URL scheme
          const platformURLs = {
            steam: `steam://install/${game.storeId}`,
            epic: `com.epicgames.launcher://store/product/${game.storeId}`
          };
          
          // In production app, this would open the platform client:
          // window.open(platformURLs[service], '_blank');
          console.log(`Opening: ${platformURLs[service]}`);
          
          setTimeout(() => {
            setIsDownloading(false);
            alert(`${game.title} download initiated in ${game.platform} client.`);
          }, 1000);
        } catch (error) {
          setIsDownloading(false);
          alert(`Error: ${error.message}`);
        }
      } else {
        alert(`${game.title} is not supported on macOS`);
      }
    };
    
    return (
      <div 
        className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors cursor-pointer relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={game.cover} alt={game.title} className="w-full h-40 object-cover" />
        
        {isHovered && !isDownloading && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center space-y-2">
            <button 
              onClick={handleDownload}
              className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-md text-white font-medium"
            >
              Download
            </button>
            {game.macSupported ? (
              <span className="text-xs text-green-400">Mac Compatible</span>
            ) : (
              <span className="text-xs text-yellow-400">Not Mac Compatible</span>
            )}
          </div>
        )}
        
        {isDownloading && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto border-4 border-t-green-500 border-green-200 rounded-full animate-spin"></div>
              <p className="mt-2 text-sm">Opening {game.platform}...</p>
            </div>
          </div>
        )}
        
        <div className="p-3">
          <h3 className="font-medium">{game.title}</h3>
          <div className="text-sm text-gray-400">{game.platform}</div>
        </div>
      </div>
    );
  };
  
  // Login Modal
  const LoginModal = () => {
    if (!showLogin) return null;
    
    const services = {
      xbox: 'Xbox',
      psplus: 'PlayStation Plus',
      steam: 'Steam',
      epic: 'Epic Games'
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // In demo mode, we'll accept any credentials
      handleLogin({
        username: "demo_user",
        password: "demo_password"
      });
    };
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
          <h3 className="text-xl font-bold mb-4">Connect {services[authService]}</h3>
          <p className="mb-4">Sign in to sync your game library from {services[authService]}</p>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">Email/Username</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                className="w-full p-2 bg-gray-700 rounded-md" 
                defaultValue="demo_user" 
                placeholder="Any value works in demo mode"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                className="w-full p-2 bg-gray-700 rounded-md" 
                defaultValue="demo_password" 
                placeholder="Any value works in demo mode"
              />
            </div>
            
            <div className="mt-2 p-2 bg-blue-900 bg-opacity-30 rounded-md text-sm text-blue-300">
              <strong>Demo Mode:</strong> In this demo, any credentials will work to connect services. In a production app, this would verify with the actual gaming platform APIs.
            </div>
            
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md"
                onClick={() => setShowLogin(false)}
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded-md font-medium"
              >
                Connect (Demo Mode)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Platform button component
  const PlatformButton = ({ name, icon, connected, onClick }) => (
    <button 
      className={`flex items-center space-x-2 p-3 rounded-lg w-full ${connected ? 'bg-green-700' : 'bg-gray-800 hover:bg-gray-700'}`}
      onClick={onClick}
    >
      {icon}
      <span>{name}</span>
      {connected && <span className="ml-auto text-xs bg-green-800 px-2 py-1 rounded">Connected</span>}
    </button>
  );
  
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <LoginModal />
      
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-green-800">
        <div className="flex items-center space-x-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M6 12h12 M9 8h6 M9 16h6" />
          </svg>
          <h1 className="text-xl font-bold">GameHub</h1>
        </div>
        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
          <User size={16} />
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Nav */}
        <nav className="w-16 bg-gray-800 flex flex-col items-center py-6 space-y-6">
          <button className={`w-10 h-10 rounded-md flex items-center justify-center ${activeTab === 'home' ? 'bg-green-700' : 'hover:bg-gray-700'}`} onClick={() => setActiveTab('home')}>
            <Home size={20} />
          </button>
          <button className={`w-10 h-10 rounded-md flex items-center justify-center ${activeTab === 'library' ? 'bg-green-700' : 'hover:bg-gray-700'}`} onClick={() => setActiveTab('library')}>
            <Library size={20} />
          </button>
          <button className={`w-10 h-10 rounded-md flex items-center justify-center ${activeTab === 'settings' ? 'bg-green-700' : 'hover:bg-gray-700'}`} onClick={() => setActiveTab('settings')}>
            <Settings size={20} />
          </button>
        </nav>
        
        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === 'home' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Game Library Hub</h2>
              
              {games.length > 0 ? (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Your Games</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {games.map(game => (
                      <GameCard key={game.id} game={game} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2">Connect Your Gaming Platforms</h3>
                  <p className="text-gray-400 mb-4">Sync and manage all your games in one place</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <PlatformButton 
                      name="Steam" 
                      icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 0C4.5 0 0 4.5 0 10c0 4.1 2.5 7.6 6 9.2V19l1-2 2.5 1.5 2-2.5L15 17l2-2h1v-2.5l-3-1.5v-2L11.5 9l-1.5-3h-1L7.5 9 4 11v3H2v2L0 19c5.5 0 10-4.5 10-10s-4.5-10-10-10z"/></svg>}
                      connected={connectedServices.includes('steam')}
                      onClick={() => connectService('steam')}
                    />
                    <PlatformButton 
                      name="Epic Games" 
                      icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M14 2L8 5v5l3 1.5V7l4-2v9L11 16l-3-1.5L4 16V7l3-1.5v3L3 10V5l8-3 3 0z"/></svg>}
                      connected={connectedServices.includes('epic')}
                      onClick={() => connectService('epic')}
                    />
                    <PlatformButton 
                      name="Xbox" 
                      icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="10" r="8"/><path fill="black" d="M7 6C5.5 7.5 4 11 6 14l4-4-3-4zM13 6c1.5 1.5 3 5 1 8l-4-4 3-4z"/></svg>}
                      connected={connectedServices.includes('xbox')}
                      onClick={() => connectService('xbox')}
                    />
                    <PlatformButton 
                      name="PlayStation" 
                      icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 13c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/></svg>}
                      connected={connectedServices.includes('psplus')}
                      onClick={() => connectService('psplus')}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'library' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">My Library</h2>
              
              {connectedServices.length > 0 ? (
                connectedServices.map(service => (
                  <div key={service} className="space-y-4">
                    <h3 className="text-lg font-semibold capitalize border-b border-gray-700 pb-2">{service} Library</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {games
                        .filter(game => game.platform.toLowerCase() === (service === 'psplus' ? 'playstation' : service))
                        .map(game => (
                          <GameCard key={game.id} game={game} />
                        ))
                      }
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-800 rounded-lg">
                  <p>No libraries connected yet. Go to Settings to connect your accounts.</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Settings</h2>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Platform Connections</h3>
                <div className="space-y-3">
                  {['steam', 'epic', 'xbox', 'psplus'].map(service => {
                    const names = { steam: 'Steam', epic: 'Epic Games', xbox: 'Xbox', psplus: 'PlayStation' };
                    const connected = connectedServices.includes(service);
                    
                    return (
                      <div key={service} className="flex items-center justify-between">
                        <span>{names[service]}</span>
                        {connected ? (
                          <div className="flex items-center space-x-3">
                            <button className="px-3 py-1 bg-blue-700 hover:bg-blue-600 rounded-md text-xs">
                              Sync Now
                            </button>
                            <span className="text-sm text-green-500">Connected</span>
                          </div>
                        ) : (
                          <button 
                            className="px-3 py-1 bg-green-700 hover:bg-green-600 rounded-md text-sm"
                            onClick={() => connectService(service)}
                          >
                            Connect
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">App Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Auto-launch platform clients</span>
                    <div className="w-12 h-6 bg-green-600 rounded-full flex items-center p-1">
                      <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Auto-sync libraries</span>
                    <div className="w-12 h-6 bg-green-600 rounded-full flex items-center p-1">
                      <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default GameHubApp;
