

export const useSearchStore = defineStore('search', () => {

    const searchField = ref<string>('Lemoncode');

    const currentSearchField = computed( () => searchField.value )

    const updateSearchField = (newSearchField: string) => {
        searchField.value = newSearchField
    }

    return {
        searchField,
        currentSearchField,
        updateSearchField
    }

})