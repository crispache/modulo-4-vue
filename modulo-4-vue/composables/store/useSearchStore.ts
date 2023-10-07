import { ListUserInfo } from "~/types/User";

export const useSearchStore = defineStore('search', () => {

    const isDefaultStateLoaded = ref<boolean>(false);
    const searchField = ref<string>('Lemoncode');
    const usersList = ref<ListUserInfo[]>([])
    const page = ref<number>(1);
    const totalPages = ref<number>(0);


    const currentIsDefaultStateLoaded  = computed(() => isDefaultStateLoaded.value )
    const currentSearchField = computed(() => searchField.value )
    const currentUsersList = computed(() => usersList.value )
    const currentPage = computed(() => page.value )
    const currentTotalPages = computed(() => totalPages.value )


    const updateDefaultState = (state: boolean) => {
        isDefaultStateLoaded.value = state
    }

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
        isDefaultStateLoaded,
        searchField,
        usersList,
        page,
        totalPages,

        // computed (getters)
        currentIsDefaultStateLoaded,
        currentSearchField,
        currentUsersList,
        currentPage, 
        currentTotalPages,
     
        // actions
        updateDefaultState,
        updateSearchField,
        updateUsersList,
        updatePage,
        updateTotalPages,
    }

},{ persist: false}) // TODO: REVISAR