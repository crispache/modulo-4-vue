

export interface ListUserInfo {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string | null;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name?: string | null | undefined;
    email?: string | null | undefined;
}

export interface UserDetails {
  name: string | null | undefined;
  login: string;
  avatar_url: string;
 
  public_repos: number;
  followers: number;
  following: number;

  email: string | null | undefined;

  html_url: string;
  repos_url: string;

  bio: string | null | undefined;
  location: string | null | undefined;
}