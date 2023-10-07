import { ListUserInfo, UserDetails } from "~/types/User";
import { githubService } from '~/services/github';
import { useSearchStore } from "./store/useSearchStore";
import { storeToRefs } from "pinia";

export function useGithub() {

    // Store
    const searchStore = useSearchStore();
    const { currentUsersList, currentPage: currentPageStore, totalPages: totalPagesStore } = storeToRefs(searchStore); 
    const { updateTotalPages, updateUsersList, updatePage, updateSearchField } = useSearchStore();

    // Users
    const users = ref<ListUserInfo[]>(currentUsersList.value);
    const userDetails = ref<UserDetails | undefined>(undefined);

    // List
    const currentPage = ref<number>(currentPageStore.value);
    const totalPages = ref<number>(totalPagesStore.value);

    // Others
    const errorMessage = ref<string>('');
    const isLoading = ref<boolean>(false);
   

    const getUsers = async (organizationName: string, currentPage: number ) => {
        try {

            isLoading.value = true;
            errorMessage.value = '';
            updateSearchField(organizationName);
            updatePage(currentPage);
            
            const { data, pages, error } = await githubService.getUsers(organizationName, currentPage);
          
            if(error) {
                errorMessage.value = error
            }

            users.value = [...data];
            updateUsersList(data);

            if (pages) {
                totalPages.value = pages;
                updateTotalPages(pages);
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