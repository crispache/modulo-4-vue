import Header from '@/components/Header.vue'
import { render, screen } from '@testing-library/vue'


describe('Pruebas en la componente Header.vue', () => {

    it('debería de tener un título la cabecera de App Github', () => {

        render(Header);
        screen.debug(); 
        expect( screen.getByTitle('App Github')).toBeTruthy();
    
    })


})