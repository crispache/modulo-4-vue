import { ListUserInfo } from "~/types/User";

export const useSearchStore = defineStore('search', () => {

    const searchField = ref<string>('Lemoncode');
    const usersList = ref<ListUserInfo[]>([])
    const page = ref<number>(1);
    const totalPages = ref<number>(0);


    const currentSearchField = computed(() => searchField.value )
    const currentUsersList = computed(() => usersList )
    const currentPage = computed(() => page.value )
    const currentTotalPages = computed(() => totalPages.value )


    const updateSearchField = (newSearchField: string) => {
        searchField.value = newSearchField
    }

    const updateUsersList = (newUsersList: ListUserInfo[]) => {
        usersList.value = [... newUsersList]
    }

    const updatePage = (newPage: number) => {
        page.value = newPage
    }

    const updateTotalPages = (newTotalPages: number) => {
        totalPages.value = newTotalPages
    }



    return {
        // state 
        searchField,
        usersList,
        page,
        totalPages,

        // computed (getters)
        currentSearchField,
        currentUsersList,
        currentPage, 
        currentTotalPages,
     
        // actions
        updateSearchField,
        updateUsersList,
        updatePage,
        updateTotalPages,
    }

},{ persist: true})