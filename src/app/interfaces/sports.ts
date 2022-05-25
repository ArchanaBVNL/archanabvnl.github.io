export interface Sport {
    football?: (FootballEntityOrCricketEntityOrGolfEntity)[] | null;
    cricket?: (FootballEntityOrCricketEntityOrGolfEntity)[] | null;
    golf?: (FootballEntityOrCricketEntityOrGolfEntity)[] | null;
  }
  export interface FootballEntityOrCricketEntityOrGolfEntity {
    stadium: string;
    country: string;
    region: string;
    tournament: string;
    start: string;
    match: string;
  }
  