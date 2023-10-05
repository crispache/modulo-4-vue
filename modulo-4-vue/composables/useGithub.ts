import { ListUserInfo, UserDetails } from "~/types/User";
import { githubService } from '~/apis/github';
import { useSearchStore } from "./store/useSearchStore";
import { storeToRefs } from "pinia";

export function useGithub() {

    // Store
    const searchStore = useSearchStore();
    const { currentUsersList, currentPage: currentPageStore, totalPages: totalPagesStore } = storeToRefs(searchStore); 
    const { updateTotalPages, updateUsersList, updatePage } = useSearchStore();

    const users = ref<ListUserInfo[]>(currentUsersList.value);
    const userDetails = ref<UserDetails | undefined>(undefined);
    const currentPage = ref<number>(currentPageStore.value);
    const totalPages = ref<number>(totalPagesStore.value);
    const errorMessage = ref<string>('');
    const isLoading = ref<boolean>(false);
   

    const getUsers = async (organizationName: string, currentPage: number ) => {
        try {

            isLoading.value = true;
            errorMessage.value = '';

            // TODO: ACTUALIZAR TOTAL PAGE Y ACTUALIZAR CURRENTPAGE
            updatePage(currentPage);
            
            const { data, pages, error } = await githubService.getUsers(organizationName, currentPage);
          
            if(error) {
                errorMessage.value = error
            }

            users.value = [...data];
            updateUsersList(data);

            // TODO: -> review
            if (pages) {
                totalPages.value = pages;
                updateTotalPages(pages)
            } 


        } catch (err) {
            users.value = [];
            totalPages.value = 0;
            errorMessage.value = 'Se ha producido un error al cargar el listado';
        } finally {
            isLoading.value = false;
        } 
    }


    const getUserDetail = async (userName: string) => {
        try {

            isLoading.value = true;
            errorMessage.value = '';
            
            const { data, error } = await githubService.getUserDetail(userName);
          
            if(error) {
                errorMessage.value = error
            }
            userDetails.value = data;
        } catch (err) {
            userDetails.value = undefined;
            errorMessage.value = 'Se ha producido un error al cargar los datos';
        } finally {
            isLoading.value = false;
        } 
    }




    return {
        // props
       /*  users: readonly(users),
        userDetails: readonly(userDetails), */
        users,
        userDetails,
        currentPage,
        totalPages,
        errorMessage,
        isLoading,

        // methods
        getUsers,
        getUserDetail,
    
    };
}