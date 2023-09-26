import { ListUserInfo, UserDetails } from "~/types/User";
import { octokit } from "./config";
import { USERS_MOCKS } from '@/mocks/users'
import { getTotalPagesApiGithub } from "~/utils/getPaginationApiGithub";
import { USER_MOCK } from "~/mocks/userDetails";


interface UsersListResponse {
    data: ListUserInfo[],
    pages?: number,
    error?: string,
}

interface UserDetailResponse {
    data?: UserDetails,
    error?: string,
}

const ITEMS_PER_PAGE = 8;


export const githubService = {

    async getUsers(organizationName: string, currentPage: number): Promise<UsersListResponse> {
        try {
            const { data, headers } = await octokit.request("GET /orgs/{org}/members", {
                org: organizationName,
                page: currentPage,
                per_page: ITEMS_PER_PAGE,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });

            // TODO: Cambiar
              let totalPages = 0;
              if(currentPage === 1) {
                  if(headers.link && headers.link?.split(',')[1]) {
                      const lastUrl = headers.link?.split(',')[1]
                      totalPages = getTotalPagesApiGithub(lastUrl);
                  }
              }


            /*  return { data: USERS_MOCKS as ListUserInfo[], pages: 1, } */
            if(currentPage === 1) {
                return {
                    data,
                    pages: totalPages,
                }
            } else {
                return {
                    data,
                }
            }
            

        } catch (err) {
            if (err instanceof Error && 'message' in err) {
                return {
                    data: [],
                    pages: 0,
                    error: err.message
                }
            } else {
                return {
                    data: [],
                    pages: 0,
                    error: 'Se ha producido un error al cargar los datos.'
                }
            }


        }
    },




    async getUserDetail(userName: string): Promise<UserDetailResponse> {
        try {
            const { data } = await octokit.request("GET /users/{username}", {
                username: userName,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });

            const res: UserDetails = {
                login: data.login,
                avatar_url: data.avatar_url,
                html_url: data.html_url,
                repos_url: data.repos_url,
                name: data.name,
                company: data.company,
                location: data.location,
                email: data.email,
                bio: data.bio,
                public_repos: data.public_repos,
                followers: data.followers,
                following: data.following,
            }

            return { data: res as UserDetails }

        } catch (err) {
            if (err instanceof Error && 'message' in err) {
                return {
                    data: {},
                    error: err.message
                }
            } else {
                return {
                    data: {},
                    error: 'Se ha producido un error al cargar los datos.'
                }
            }


        }
    },


}