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

export interface Standing {
  standing_place: string;
  standing_team: string;
  standing_P: string;
  standing_W: string;
  standing_L: string;
  team_key: string;
  league_key: string;
}

export interface Player {
  player: string;
  player_id: string;
}

export interface TeamDetails {
  team_key: string;
  team_name: string;
  team_logo: string | null;
  players: Player[];
}

export async function getUpcomingGames(leagueId: string): Promise<Game[]> {
  if (!API_KEY) {
    throw new Error("API key is not defined");
  }

  const today = new Date();
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 7);

  const fromDate = formatDate(today);
  const toDate = formatDate(sevenDaysLater);

  const url = `${API_BASE_URL}?met=Fixtures&leagueId=${leagueId}&from=${fromDate}&to=${toDate}&APIkey=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch upcoming games: ${response.statusText}`);
  }

  const data = await response.json();

  return (data.result || []).sort(
    (a: Game, b: Game) =>
      new Date(
        a.event_date + (a.event_time ? "T" + a.event_time : "")
      ).getTime() -
      new Date(
        b.event_date + (b.event_time ? "T" + b.event_time : "")
      ).getTime()
  );
}

export async function getTeamDetails(
  teamId: string
): Promise<TeamDetails | null> {
  if (!API_KEY) {
    throw new Error("API key is not defined");
  }

  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const fromDate = formatDate(oneYearAgo);
  const toDate = formatDate(today);

  const url = `${API_BASE_URL}?met=Fixtures&teamId=${teamId}&from=${fromDate}&to=${toDate}&APIkey=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch team details: ${response.statusText}`);
  }

  const data = await response.json();
  const matches = data.result || [];

  if (matches.length === 0 || matches[0]?.param === "from") {
    console.error(
      "Aucun match trouvé pour cette équipe dans la plage de dates ou l'API a renvoyé une erreur."
    );
    return null;
  }

  matches.sort(
    (a: Game, b: Game) =>
      new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
  );

  let teamDetails: TeamDetails | null = null;

  for (const match of matches) {
    const hasLineups = match.lineups && Object.keys(match.lineups).length > 0;

    if (hasLineups) {
      const isHomeTeam = match.home_team_key === teamId;
      const teamData = isHomeTeam
        ? match.lineups.home_team
        : match.lineups.away_team;

      if (teamData) {
        const players = [
          ...(teamData.starting_lineups ?? []),
          ...(teamData.substitutes ?? []),
        ];

        if (players.length > 0) {
          teamDetails = {
            team_key: teamId,
            team_name: isHomeTeam
              ? match.event_home_team
              : match.event_away_team,
            team_logo: isHomeTeam
              ? match.event_home_team_logo
              : match.event_away_team_logo,
            players: players,
          };
          break;
        }
      }
    }
  }

  if (!teamDetails) {
    const latestMatch = matches[0];
    const isHomeTeam = latestMatch.home_team_key === teamId;
    return {
      team_key: teamId,
      team_name: isHomeTeam
        ? latestMatch.event_home_team
        : latestMatch.event_away_team,
      team_logo: isHomeTeam
        ? latestMatch.event_home_team_logo
        : latestMatch.event_away_team_logo,
      players: [],
    };
  }

  return teamDetails;
}
export async function getStandings(leagueId: string): Promise<Standing[]> {
  if (!API_KEY) {
    throw new Error("API key is not defined");
  }

  const url = `${API_BASE_URL}?met=Standings&leagueId=${leagueId}&APIkey=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch standings: ${response.statusText}`);
  }

  const data = await response.json();

  return data.result?.total || [];
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
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

  return (data.result || []).sort(
    (a: Game, b: Game) =>
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
