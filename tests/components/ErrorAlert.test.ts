import ErrorAlert from '@/components/ErrorAlert.vue'
import { render, screen } from '@testing-library/vue'
import { mount,shallowMount} from "@vue/test-utils";

describe('Pruebas en la componente ErrorAlert.vue', () => {


    it('debería de renderizar los valores por defecto de las props: isOpen y errorMessage', () => {

        const defaultError = 'Se ha producido un error. Por favor, inténtelo de nuevo más tarde. Gracias.'
        const wrapper = mount(ErrorAlert);
            
        expect(wrapper.props('isOpen')).toBe(false);
        expect(wrapper.props('errorMessage')).toBe(defaultError);
    })




    it('Si se quiere mostrar el error y un mensaje específico, las props se tiene que mostrar con los valores que se les proporciona', () => {

        const propsExample = {
            isOpen: true,
            errorMessage: 'Se ha producido un error al cargar el listado.'
        }

        const wrapper = mount(ErrorAlert, {
            props: propsExample
        });

        expect(wrapper.props('isOpen')).toBe(true);
        expect(wrapper.props('errorMessage')).toBe(propsExample.errorMessage);

        const { getByText } = render(ErrorAlert, {
            props: propsExample
        });

        getByText(propsExample.errorMessage)
    })



    it('Cuando se muestra un error, tras 3 seg se debería de cerrar la alerta y no mostrar el mensaje', async () => {

        // Estado por defecto
        const defaultError = 'Se ha producido un error. Por favor, inténtelo de nuevo más tarde. Gracias.'
        const wrapper = mount(ErrorAlert, {
            props: {
                isOpen: false,
            }
        });
        
        // Vue actualiza prop de forma asincrona
        await wrapper.setProps({ isOpen: true });
        await wrapper.vm.$nextTick();

        expect( wrapper.props('isOpen') ).toBe(true)
        expect( wrapper.props('errorMessage') ).toBe(defaultError)


        // 3 seg
        await new Promise((resolve) => setTimeout(resolve, 3000))

        // Emit close-alert ha sido llamado
        expect(wrapper.emitted('close-alert')).toBeTruthy();

        // TODO: El emit 'close-alert' desde el padre cuando se testea, actualizar esta prop isOpen.
        // TODO: Aqui solo se comprueba que se llame al emit
       // await wrapper.setProps({ isOpen: false });
    })




    // TODO: PTE
   /*  it('Simular click cerrar alerta',  () => {

        const propsExample = {
            isOpen: true,
            errorMessage: 'Se ha producido un error al cargar el listado.'
        }

        const wrapper = render(ErrorAlert, {
            props: propsExample,
        });

      // ... /
        
    }) */

})