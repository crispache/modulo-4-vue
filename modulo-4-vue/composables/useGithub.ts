import { UserGitHub } from "~/types/User";
import { githubService } from '~/apis/github';

export function useGithub() {

    const users = ref<UserGitHub[]>([]);
    const currentPage = ref<number>(1);
    const totalPages = ref<number>(0);
    const errorMessage = ref<string>('');
    const isLoading = ref<boolean>(false);

    const getUsers = async (organizationName: string,currentPage: number ) => {
        try {

            isLoading.value = true;
            errorMessage.value = '';
            
            const { data, pages, error } = await githubService.getUsers(organizationName, currentPage);
          
            if(error) {
                errorMessage.value = error
            }

            users.value = [...data];
            totalPages.value = pages;

        } catch (err) {
            users.value = [];
            errorMessage.value = 'Se ha producido un error al cargar el listado';
        } finally {
            isLoading.value = false;
        } 
    }


    return {
        // props
        users: readonly(users),
        currentPage,
        totalPages,
        errorMessage,
        isLoading,

        // methods
        getUsers,
    };
}