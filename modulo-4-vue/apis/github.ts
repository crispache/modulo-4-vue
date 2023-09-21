import { UserGitHub } from "~/types/User";
import { octokit } from "./config";
import { USERS_MOCKS } from '@/mocks/users'
import { getTotalPagesApiGithub } from "~/utils/getPaginationApiGithub";


interface Response {
    data: UserGitHub[],
    pages: number,
    error?: string,
}

const ITEMS_PER_PAGE = 8;


export const githubService = {

    async getUsers(organizationName: string, currentPage: number ): Promise<Response> {
        try {
            const { data , headers } = await octokit.request("GET /orgs/{org}/members", {
                org: organizationName,
                page: currentPage,
                per_page: ITEMS_PER_PAGE,
                request:{
                    parseSuccessResponseBody: true,
                },
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
           
           
            console.log('totalPages', totalPages)
      
           /*  return { data: USERS_MOCKS as UserGitHub[] } */
           return {
            data,
            pages: totalPages,
           }
            
        } catch (err) {
            if( err instanceof Error && 'message' in err ){
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


}