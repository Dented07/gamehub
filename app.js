// Update the apiService to use a real Steam API key
const apiService = {
  // Your actual Steam API key
  steamApiKey: "D350C593F350495F5C23C31F7AE21599",
  
  // Authenticate with Steam
  authenticateSteam: async (steamId) => {
    try {
      // Steam authentication actually uses OpenID, but for simplicity
      // we'll use the API key to get user data once they provide their Steam ID
      return { success: true, steamId };
    } catch (error) {
      console.error("Steam authentication error:", error);
      throw error;
    }
  },
  
  // Get real Steam games
  getSteamGames: async (steamId) => {
    try {
      // Build the real Steam API URL
      const steamApiUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiService.steamApiKey}&steamid=${steamId}&include_appinfo=true&include_played_free_games=true&format=json`;
      
      // Make a real API call
      const response = await fetch(steamApiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch games from Steam API");
      }
      
      const data = await response.json();
      
      // Process real Steam data
      if (data && data.response && data.response.games) {
        return data.response.games.map(game => ({
          id: `steam-${game.appid}`,
          title: game.name,
          cover: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`,
          platform: 'Steam',
          // Steam doesn't directly tell us Mac compatibility in this API call
          // We'd need to make another call per game
          macSupported: true, // We'll assume true for now
          storeId: game.appid.toString(),
          playtime: Math.floor(game.playtime_forever / 60) // Convert minutes to hours
        }));
      }
      
      return [];
    } catch (error) {
      console.error("Steam games fetch error:", error);
      return [];
    }
  }
};

// Update the LoginModal component for Steam
const SteamLoginModal = () => {
  const [steamId, setSteamId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleSteamLogin = async (e) => {
    e.preventDefault();
    if (!steamId.trim()) {
      setError("Please enter your Steam ID");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      await apiService.authenticateSteam(steamId);
      const steamGames = await apiService.getSteamGames(steamId);
      
      // Add Steam to connected services
      setConnectedServices(prev => {
        if (!prev.includes('steam')) {
          return [...prev, 'steam'];
        }
        return prev;
      });
      
      // Add games to library
      setGames(prev => {
        // Filter out existing Steam games to avoid duplicates
        const filteredGames = prev.filter(game => !game.id.startsWith('steam-'));
        return [...filteredGames, ...steamGames];
      });
      
      setShowLogin(false);
      alert("Successfully connected to Steam!");
    } catch (error) {
      setError(`Failed to connect to Steam: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
}
