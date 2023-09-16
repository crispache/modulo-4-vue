import { UserGitHub } from "~/types/User";
import { githubService } from '~/apis/github';

export function useGithub() {

    const users = ref<UserGitHub[]>([]);
    const errorMessage = ref<string>('');
    const isLoading = ref<boolean>(false);

    const getUsers = async (organization_name: string) => {
        try {

            isLoading.value = true;
            errorMessage.value = '';
            
            const { data, error } = await githubService.getUsers(organization_name);
          
            if(error) {
                errorMessage.value = error
            }

            users.value = [...data];

        } catch (err) {
            errorMessage.value = 'Se ha producido un error al cargar el listado';
        } finally {
            isLoading.value = false;
        } 
    }


    return {
        // props
        users: readonly(users),
        errorMessage,
        isLoading,

        // methods
        getUsers,
    };
}