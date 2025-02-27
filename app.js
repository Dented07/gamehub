// GameHub app with pre-loaded Steam data
const { useState, useEffect } = React;

// API Service with pre-loaded Steam data
const apiService = {
  // Sample data for non-Steam platforms (for demo purposes)
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
  },
  
  // Get Steam games from pre-loaded data
  getSteamGames: async () => {
    try {
      // This data is from your paste.txt file
      const data = {
        "response": {
          "game_count": 56,
          "games": [
            {
              "appid": 4000,
              "playtime_forever": 55,
              "playtime_windows_forever": 55,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1725563142,
              "playtime_disconnected": 0
            },
            {
              "appid": 3590,
              "playtime_forever": 15,
              "playtime_windows_forever": 15,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1663277376,
              "playtime_disconnected": 0
            },
            {
              "appid": 24780,
              "playtime_forever": 180,
              "playtime_windows_forever": 180,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1618870281,
              "playtime_disconnected": 0
            },
            {
              "appid": 105600,
              "playtime_forever": 66,
              "playtime_windows_forever": 0,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 66,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1677190865,
              "playtime_disconnected": 0
            },
            {
              "appid": 209520,
              "playtime_forever": 0,
              "playtime_windows_forever": 0,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 0,
              "playtime_disconnected": 0
            },
            {
              "appid": 1303990,
              "playtime_forever": 0,
              "playtime_windows_forever": 0,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 0,
              "playtime_disconnected": 0
            },
            {
              "appid": 244210,
              "playtime_forever": 25,
              "playtime_windows_forever": 25,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1717520172,
              "playtime_disconnected": 0
            },
            {
              "appid": 270880,
              "playtime_forever": 2245,
              "playtime_windows_forever": 2245,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1732155265,
              "playtime_disconnected": 0
            },
            {
              "appid": 284160,
              "playtime_forever": 7120,
              "playtime_windows_forever": 7097,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1736194169,
              "playtime_disconnected": 89
            },
            {
              "appid": 293760,
              "playtime_forever": 337,
              "playtime_windows_forever": 337,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1731687648,
              "playtime_disconnected": 0
            },
            {
              "appid": 313120,
              "playtime_forever": 47,
              "playtime_windows_forever": 47,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1614813649,
              "playtime_disconnected": 0
            },
            {
              "appid": 322170,
              "playtime_2weeks": 11,
              "playtime_forever": 5130,
              "playtime_windows_forever": 5130,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1740517584,
              "playtime_disconnected": 0
            },
            {
              "appid": 365670,
              "playtime_forever": 3847,
              "playtime_windows_forever": 3847,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1718315893,
              "playtime_disconnected": 294
            },
            {
              "appid": 343440,
              "playtime_forever": 0,
              "playtime_windows_forever": 0,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 0,
              "playtime_disconnected": 0
            },
            {
              "appid": 403120,
              "playtime_forever": 249,
              "playtime_windows_forever": 249,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1722905067,
              "playtime_disconnected": 14
            },
            {
              "appid": 413150,
              "playtime_forever": 1889,
              "playtime_windows_forever": 1458,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 430,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1662675426,
              "playtime_disconnected": 0
            },
            {
              "appid": 428690,
              "playtime_forever": 628,
              "playtime_windows_forever": 628,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1708687637,
              "playtime_disconnected": 0
            },
            {
              "appid": 275850,
              "playtime_forever": 649,
              "playtime_windows_forever": 649,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1733176120,
              "playtime_disconnected": 8
            },
            {
              "appid": 471710,
              "playtime_forever": 2187,
              "playtime_windows_forever": 2187,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1717519814,
              "playtime_disconnected": 1
            },
            {
              "appid": 493340,
              "playtime_forever": 20,
              "playtime_windows_forever": 0,
              "playtime_mac_forever": 20,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1728953803,
              "playtime_disconnected": 0
            },
            {
              "appid": 588430,
              "playtime_forever": 1,
              "playtime_windows_forever": 1,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1578014833,
              "playtime_disconnected": 0
            },
            {
              "appid": 606800,
              "playtime_forever": 103,
              "playtime_windows_forever": 103,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1619276071,
              "playtime_disconnected": 0
            },
            {
              "appid": 621060,
              "playtime_forever": 1275,
              "playtime_windows_forever": 1275,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1737527331,
              "playtime_disconnected": 0
            },
            {
              "appid": 645630,
              "playtime_forever": 228,
              "playtime_windows_forever": 228,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1602943188,
              "playtime_disconnected": 0
            },
            {
              "appid": 648800,
              "playtime_forever": 19,
              "playtime_windows_forever": 19,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1614543121,
              "playtime_disconnected": 0
            },
            {
              "appid": 304930,
              "playtime_forever": 0,
              "playtime_windows_forever": 0,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 0,
              "playtime_disconnected": 0
            },
            {
              "appid": 24200,
              "playtime_forever": 2516,
              "playtime_windows_forever": 2516,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1672603903,
              "playtime_disconnected": 0
            },
            {
              "appid": 860890,
              "playtime_forever": 58,
              "playtime_windows_forever": 58,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1619651337,
              "playtime_disconnected": 0
            },
            {
              "appid": 787860,
              "playtime_forever": 1004,
              "playtime_windows_forever": 1004,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1736195685,
              "playtime_disconnected": 0
            },
            {
              "appid": 979060,
              "playtime_forever": 2987,
              "playtime_windows_forever": 2987,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1640733686,
              "playtime_disconnected": 0
            },
            {
              "appid": 996380,
              "playtime_forever": 627,
              "playtime_windows_forever": 627,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1716413318,
              "playtime_disconnected": 0
            },
            {
              "appid": 1017180,
              "playtime_forever": 214,
              "playtime_windows_forever": 214,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1726359497,
              "playtime_disconnected": 0
            },
            {
              "appid": 1097150,
              "playtime_forever": 1094,
              "playtime_windows_forever": 1094,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1719708849,
              "playtime_disconnected": 0
            },
            {
              "appid": 285900,
              "playtime_forever": 110,
              "playtime_windows_forever": 110,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1717009791,
              "playtime_disconnected": 0
            },
            {
              "appid": 1122340,
              "playtime_forever": 125,
              "playtime_windows_forever": 125,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1682133573,
              "playtime_disconnected": 0
            },
            {
              "appid": 1167630,
              "playtime_forever": 6301,
              "playtime_windows_forever": 6301,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1733179148,
              "playtime_disconnected": 92
            },
            {
              "appid": 1211020,
              "playtime_forever": 8473,
              "playtime_windows_forever": 8473,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1733348870,
              "playtime_disconnected": 0
            },
            {
              "appid": 1240210,
              "playtime_forever": 111,
              "playtime_windows_forever": 111,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1711493019,
              "playtime_disconnected": 0
            },
            {
              "appid": 1241700,
              "playtime_forever": 75,
              "playtime_windows_forever": 75,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1715208022,
              "playtime_disconnected": 0
            },
            {
              "appid": 1237950,
              "playtime_forever": 0,
              "playtime_windows_forever": 0,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 0,
              "playtime_disconnected": 0
            },
            {
              "appid": 1262580,
              "playtime_forever": 20,
              "playtime_windows_forever": 20,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1663279095,
              "playtime_disconnected": 0
            },
            {
              "appid": 1426210,
              "playtime_forever": 54,
              "playtime_windows_forever": 54,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1678648902,
              "playtime_disconnected": 0
            },
            {
              "appid": 1449500,
              "playtime_forever": 0,
              "playtime_windows_forever": 0,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 0,
              "playtime_disconnected": 0
            },
            {
              "appid": 1493760,
              "playtime_forever": 1990,
              "playtime_windows_forever": 1990,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1708843889,
              "playtime_disconnected": 0
            },
            {
              "appid": 1498140,
              "playtime_forever": 22,
              "playtime_windows_forever": 22,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1716318333,
              "playtime_disconnected": 0
            },
            {
              "appid": 1509960,
              "playtime_forever": 322,
              "playtime_windows_forever": 322,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1719774659,
              "playtime_disconnected": 0
            },
            {
              "appid": 1465360,
              "playtime_forever": 817,
              "playtime_windows_forever": 817,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1726366928,
              "playtime_disconnected": 0
            },
            {
              "appid": 1703340,
              "playtime_forever": 281,
              "playtime_windows_forever": 281,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1716928708,
              "playtime_disconnected": 0
            },
            {
              "appid": 1780270,
              "playtime_forever": 166,
              "playtime_windows_forever": 166,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1726020986,
              "playtime_disconnected": 0
            },
            {
              "appid": 1818750,
              "playtime_forever": 40,
              "playtime_windows_forever": 40,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1727976317,
              "playtime_disconnected": 0
            },
            {
              "appid": 1818940,
              "playtime_forever": 0,
              "playtime_windows_forever": 0,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 0,
              "playtime_disconnected": 0
            },
            {
              "appid": 2107090,
              "playtime_forever": 282,
              "playtime_windows_forever": 282,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1716676252,
              "playtime_disconnected": 0
            },
            {
              "appid": 2200780,
              "playtime_forever": 16,
              "playtime_windows_forever": 0,
              "playtime_mac_forever": 16,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1729710862,
              "playtime_disconnected": 0
            },
            {
              "appid": 2401680,
              "playtime_forever": 215,
              "playtime_windows_forever": 215,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1719888905,
              "playtime_disconnected": 0
            },
            {
              "appid": 2670630,
              "playtime_forever": 90,
              "playtime_windows_forever": 90,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1710541287,
              "playtime_disconnected": 0
            },
            {
              "appid": 2778420,
              "playtime_forever": 3,
              "playtime_windows_forever": 3,
              "playtime_mac_forever": 0,
              "playtime_linux_forever": 0,
              "playtime_deck_forever": 0,
              "rtime_last_played": 1714092149,
              "playtime_disconnected": 0
            }
          ]
        }
      };
      
      // Process the games data
      return data.response.games.map(game => ({
        id: `steam-${game.appid}`,
        title: getKnownGameName(game.appid) || `Game ${game.appid}`,
        cover: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`,
        platform: 'Steam',
        macSupported: game.playtime_mac_forever > 0, // Determine Mac support from playtime data
        storeId: game.appid.toString(),
        playtime: Math.floor(game.playtime_forever / 60) // Convert minutes to hours
      }));
    } catch (error) {
      console.error("Error processing Steam games:", error);
      return [];
    }
  }
};

// Function to provide names for known popular game IDs
function getKnownGameName(appId) {
  const gameNames = {
    4000: "Garry's Mod",
    3590: "Plants vs. Zombies",
    24780: "SimCity 4 Deluxe",
    105600: "Terraria",
    209520: "XCOM: Enemy Unknown",
    1303990: "Spiritfarer",
    244210: "I Am Bread",
    270880: "American Truck Simulator", 
    284160: "BeamNG.drive",
    293760: "Cities: Skylines",
    313120: "Stranded Deep",
    322170: "Geometry Dash",
    365670: "RimWorld",
    343440: "Vampyr",
    403120: "Battleblock Theater",
    413150: "Stardew Valley",
    428690: "Satisfactory",
    275850: "No Man's Sky",
    471710: "Rocket League",
    493340: "Planet Coaster",
    588430: "Totally Accurate Battle Simulator",
    606800: "Moonlighter",
    621060: "PC Building Simulator",
    645630: "The Last Campfire",
    648800: "Raft",
    304930: "Unrailed!",
    24200: "Sanctum",
    860890: "Aground",
    787860: "Deep Rock Galactic",
    979060: "AMID EVIL",
    996380: "ABRISS",
    1017180: "Islanders",
    1097150: "Fall Guys",
    285900: "Gang Beasts",
    1122340: "Embr",
    1167630: "Destiny 2",
    1211020: "Artisan",
    1240210: "The Wild at Heart",
    1241700: "TOEM",
    1237950: "Timberborn",
    1262580: "Townscaper",
    1426210: "Core Keeper",
    1449500: "The Wandering Village",
    1493760: "Dorfromantik",
    1498140: "Wavetale",
    1509960: "Moncage",
    1465360: "Diplomacy is Not an Option",
    1703340: "Brotato",
    1780270: "Chants of Sennaar",
    1818750: "Stacklands",
    1818940: "Tchia",
    2107090: "Braid, Anniversary Edition",
    2200780: "Terra Nil",
    2401680: "Hello Kitty Island Adventure",
    2670630: "Animal Well",
    2778420: "Balatro"
  };
  
  return gameNames[appId] || null;
}

// GameCard Component
const GameCard = ({ game }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [imageError, setImageError] = useState(false);
  
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
      src: imageError ? 'https://via.placeholder.com/150x200?text=' + encodeURIComponent(game.title) : game.cover,
      alt: game.title,
      onError: () => setImageError(true)
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
      
      game.playtime !== undefined && game.playtime > 0 && React.createElement("span", {
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
        // Get games from our pre-loaded data
        const steamGames = await apiService.getSteamGames();
        
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
        
        alert(`Successfully loaded your Steam library! Found ${steamGames.length} games.`);
      } else {
        // For other platforms, use demo data
        setConnectedServices(prev => {
          if (!prev.includes(authService)) {
            return [...prev, authService];
          }
          return prev;
        });
        
        // Get demo games for non-Steam platforms
        const platformGames = apiService.getPlatformGames(authService);
        
        // Update games list
        setGames(prev => {
          const platformName = authService === 'psplus' ? 'PlayStation' : authService;
          const nonPlatformGames = prev.filter(game => game.platform !== platformName);
          return [...nonPlatformGames, ...platformGames];
        });
        
        alert(`Connected to ${authService === 'psplus' ? 'PlayStation' : authService.charAt(0).toUpperCase() + authService.slice(1)}!`);
      }
      
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
  
  // Login Modal Component
  const LoginModal = () => {
    if (!showLogin) return null;
    
    const services = {
      xbox: 'Xbox',
      psplus: 'PlayStation Plus',
      steam: 'Steam',
      epic: 'Epic Games'
    };
    
    // Steam uses pre-loaded data, so it has a simpler login form
    if (authService === 'steam') {
      return React.createElement("div", {
        className: "modal-overlay"
      }, 
        React.createElement("div", {
          className: "modal-content"
        }, [
          React.createElement("h3", { key: "title" }, `Load Your Steam Library`),
          React.createElement("p", { key: "desc" }, "Click the button below to load your pre-fetched Steam game data"),
          
          React.createElement("div", { key: "info", className: "demo-notice" },
            "Using pre-loaded Steam data to avoid CORS issues with GitHub Pages."
          ),
          
          React.createElement("div", { key: "buttons", className: "modal-buttons" }, [
            React.createElement("button", {
              key: "cancel",
              type: "button",
              onClick: () => setShowLogin(false),
              className: "cancel-btn"
            }, "Cancel"),
            
            React.createElement("button", {
              key: "connect",
              type: "button",
              className: "connect-btn",
              disabled: isLoading,
              onClick: () => handleLogin({ useLocalData: true })
            }, isLoading ? "Loading..." : "Load Steam Library")
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
            "Demo Mode: Using simulated data for this platform. Real API integration is only available for Steam."
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
            }, isLoading ? "Connecting..." : "Connect (Demo)")
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
                            alert("Refreshing Steam library...");
                            // Here you would refresh the Steam library
                            handleLogin({ useLocalData: true });
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
                    }, service === 'steam' ? "Load Library" : "Connect")
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
          
          React.createElement("div", { key: "about", className: "settings-section" }, [
            React.createElement("h3", { key: "section-title" }, "About GameHub"),
            
            React.createElement("div", { key: "about-info", className: "about-info" }, [
              React.createElement("p", { key: "version" }, "Version: 1.0.0"),
              React.createElement("p", { key: "platform" }, "Platform: macOS"),
              React.createElement("p", { key: "description" }, "GameHub is a game library aggregator that lets you manage all your games in one place.")
            ])
          ])
        ])
      ])
    ])
  ]);
};

// For compatibility with babel transpilation via script tag
// (Render will happen after the whole script is parsed)
setTimeout(() => {
  ReactDOM.render(
    React.createElement(GameHubApp),
    document.getElementById('root')
  );
}, 0);
