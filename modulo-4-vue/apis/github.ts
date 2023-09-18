import { UserGitHub } from "~/types/User";
import { octokit } from "./config";
import { USERS_MOCKS } from '@/mocks/users'


interface Response {
    data: UserGitHub[],
    error?: string,
}

const ITEMS_PER_PAGE = 8;


export const githubService = {

    async getUsers(organizationName: string, currentPage: number ): Promise<Response> {
        try {
            const { data } = await octokit.request("GET /orgs/{org}/members", {
                org: organizationName,
                page: currentPage,
                per_page: ITEMS_PER_PAGE,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            
           /*  return { data: USERS_MOCKS as UserGitHub[] } */
           return {
            data
           }
            
        } catch (err) {
            if( err instanceof Error && 'message' in err ){
                return {
                    data: [],
                    error: err.message
                }
            } else {
                return {
                    data: [],
                    error: 'Se ha producido un error al cargar los datos.'
                }
            }
          
            
        }
    },


}