
const API_BASE_URL = "https://apiv2.allsportsapi.com/basketball/";
const API_KEY = process.env.API_KEY;

export interface Team {
  team_key: string;
  team_name: string;
  team_logo: string | null; 
}

export interface Game {
  event_key: string;
  event_date: string;
  event_time: string;
  event_home_team: string;
  event_away_team: string;
  event_final_result: string;
  event_status: string;
  league_name: string;
  league_round: string;
  event_home_team_logo: string | null;
  event_away_team_logo: string | null;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export async function getRecentResults(leagueId: string): Promise<Game[]> {
  if (!API_KEY) {
    throw new Error("API key is not defined");
  }

  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const fromDate = formatDate(sevenDaysAgo);
  const toDate = formatDate(today);

  const url = `${API_BASE_URL}?met=Fixtures&leagueId=${leagueId}&from=${fromDate}&to=${toDate}&APIkey=${API_KEY}`;
  
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch recent results: ${response.statusText}`);
  }

  const data = await response.json();
  
  return (data.result || []).sort((a: Game, b: Game) => 
    new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
  );
}

export async function getTeams(leagueId: string): Promise<Team[]> {
  if (!API_KEY) {
    throw new Error("API key is not defined");
  }

  const url = `${API_BASE_URL}?met=Teams&leagueId=${leagueId}&APIkey=${API_KEY}`;

  console.log("Fetching teams from URL:", url);
  const response = await fetch(url);


  if (!response.ok) {
    throw new Error(`Failed to fetch teams: ${response.statusText}`);
  }

  const data = await response.json();


  return data.result || []; 
}