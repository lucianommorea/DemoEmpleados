import { render, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { act } from 'react-dom/test-utils';

describe('Perfil Empleados', () => {

    beforeEach( async ()=>{
        await act(() => {
            render(<App />);
        })
        const empleadosElement = screen.getAllByText(/empleados/i)[0];
        userEvent.click(empleadosElement);
        const searchInput = await screen.findByRole('searchbox', {name: /search/i});
        await act(() => {
            userEvent.type(searchInput, '4');
        })
        const edit = await screen.findByTestId('edit-employee');
        await act(() => {
            userEvent.click(edit);
        })
    })

    it('render Loading', async () => {

        const loading = await screen.findByText(/loading/i);
        expect(loading).toBeInTheDocument();
    });

    it('render title', async () => {

        const title = await screen.findByText(/Perfil de micaela lapuente/i);
        expect(title).toBeInTheDocument();

    });

    it('renders form labels', async () => {

        const nombre = await screen.findByText(/nombre/i);
        const apellido = screen.getByText(/apellido/i);
        const dni = screen.getByText(/dni/i)
        const fechaNacimiento = screen.getByText(/fecha de nacimiento/i);
        const email = screen.getByText(/email/i);
        const telefono = screen.getByText(/telefono/i);
        const domicilio = screen.getByText(/domicilio/i);
        const ciudad = screen.getByText(/ciudad/i);
        const fechaAlta = screen.getByText(/fecha alta/i);
        const fechaBaja = screen.queryByText(/fecha baja/i);

        expect(nombre).toBeInTheDocument();
        expect(apellido).toBeInTheDocument();
        expect(dni).toBeInTheDocument();
        expect(fechaNacimiento).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(telefono).toBeInTheDocument();
        expect(domicilio).toBeInTheDocument();
        expect(ciudad).toBeInTheDocument();
        expect(fechaAlta).toBeInTheDocument();
        expect(fechaBaja).not.toBeInTheDocument();
    });

    it('render profile values', async () => {

        const nombre = await screen.findAllByText(/micaela/i);
        const apellido = screen.getAllByText(/lapuente/i);
        const dni = screen.getByText(/38831617/i);
        const fechaNacimiento = screen.getByText(/1995-09-17/i);
        const email = screen.getByText(/mica-mdq@gmail.com/i);
        const telefono = screen.getByText(/65686/i);
        const domicilio = screen.getByText(/Rondeau 546/i);
        const ciudad =  screen.getByText(/Mar del Plata/i);
        const fechaAlta =  screen.getByText(/2021-06-11/i);
        
        expect(nombre).toHaveLength(2);
        expect(nombre[1]).toBeInTheDocument();
        expect(apellido[1]).toBeInTheDocument();
        expect(dni).toBeInTheDocument();
        expect(fechaNacimiento).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(telefono).toBeInTheDocument();
        expect(domicilio).toBeInTheDocument();
        expect(ciudad).toBeInTheDocument();
        expect(fechaAlta).toBeInTheDocument();
    });

    it('render buttons', async () => {

        const btns = await screen.findAllByRole('button');
        expect(btns).toHaveLength(2);
        expect(btns[0]).toHaveTextContent(/modificar empleado/i);
        expect(btns[1]).toHaveTextContent(/dar de baja/i);
        expect(btns[0]).toHaveClass('btn1');
        expect(btns[1]).toHaveClass('btn2');
    });

    it('renders Ingresos-Egresos', async () => {

        const historial = await screen.findByText(/Historial/i);
        const horasTrabajadas = screen.getByText(/horas trabajadas/i);
        const horas = screen.getByText(/8 hs. 14 minutos/i);

        expect(historial).toBeInTheDocument();
        expect(horasTrabajadas).toBeInTheDocument();
        expect(horas).toBeInTheDocument();
    });

    it('button dar de baja', async () => {

        let btnBaja = await screen.findByRole('button', {name: /dar de baja/i});
        let btnAlta =  screen.queryByRole('button', {name: /dar de alta/i});
        let fechaBaja = screen.queryByText(/fecha baja/i);
        expect(fechaBaja).not.toBeInTheDocument();
        expect(btnBaja).toBeInTheDocument();
        expect(btnAlta).not.toBeInTheDocument();
        expect(btnBaja).toHaveClass('btn2');

        await act(() => {
            userEvent.click(btnBaja);
        })

        const sure = await screen.findByText(/está seguro/i);
        let btns = screen.getAllByRole('button');
        const btnYes = screen.getByRole('button', {name: 'Sí'});

        expect(sure).toBeInTheDocument();
        expect(btnYes).toBeInTheDocument();
        expect(btns).toHaveLength(4);

        userEvent.click(btnYes);

        btns = await screen.findAllByRole('button');
        btnAlta = screen.getByRole('button', {name: /dar de alta/i});
        btnBaja = screen.queryByRole('button', {name: /dar de baja/i});
        fechaBaja = screen.getByText(/fecha baja/i);
        expect(fechaBaja).toBeInTheDocument();
        expect(btnAlta).toBeInTheDocument();
        expect(btnBaja).not.toBeInTheDocument();
        expect(btnAlta).toHaveClass('btn3');
        expect(btns).toHaveLength(2);
    });

    it('modify employee', async () => {

        const btnModify = await screen.findByRole('button', {name: /modificar empleado/i});
        expect(btnModify).toBeInTheDocument();
        expect(btnModify).toHaveClass('btn1');

        await act(() => {
            userEvent.click(btnModify);
        })

        const nombre = await screen.findByDisplayValue(/micaela/i);
        const dni = screen.getByDisplayValue(/38831617/i);
        const domicilio = screen.getByDisplayValue(/Rondeau 546/i);
        const ciudad = screen.getByDisplayValue(/Mar del Plata/i);
        const historial = screen.queryByText(/Historial/i);
        const horasTrabajadas = screen.queryByText(/horas trabajadas/i);
        const horas = screen.queryByText(/8 hs. 14 minutos/i);

        expect(historial).not.toBeInTheDocument();
        expect(horasTrabajadas).not.toBeInTheDocument();
        expect(horas).not.toBeInTheDocument();

        userEvent.clear(nombre);
        userEvent.clear(dni);
        userEvent.clear(domicilio);
        userEvent.clear(ciudad);
        userEvent.type(nombre, 'Juan');
        userEvent.type(dni, '');
        userEvent.type(domicilio, 'Piedras 321');
        userEvent.type(ciudad, 'La Plata');

        const btnConfirm = await screen.findByText(/confirmar modifica/i)
        expect(btnConfirm).toBeInTheDocument();
        userEvent.click(btnConfirm);

        const error = await screen.findByText('ERROR');
        const btnOk = screen.getByRole('button', {name: 'OK'})
        expect(error).toBeInTheDocument();

        await act(() => {
            userEvent.click(btnOk);
        })

        userEvent.type(dni, '2');
        await act(() => {
            userEvent.click(btnConfirm);
        })
        
        const exito = await screen.findByText(/EXITO/i);
        expect(exito).toBeInTheDocument();

    });

    it('volver atras button', async () => {

        const btnModify = await screen.findByRole('button', {name: /modificar empleado/i});

        await act(() => {
            userEvent.click(btnModify);
        })

        let nombre = await screen.findByDisplayValue(/micaela/i);
        let dni = screen.getByDisplayValue(/38831617/i);
        let domicilio = screen.getByDisplayValue(/Rondeau 546/i);
        let ciudad = screen.getByDisplayValue(/Mar del Plata/i);
        expect(nombre).toBeInTheDocument();
        expect(dni).toBeInTheDocument();
        expect(domicilio).toBeInTheDocument();
        expect(ciudad).toBeInTheDocument();

        userEvent.clear(nombre);
        userEvent.clear(dni);
        userEvent.clear(domicilio);
        userEvent.clear(ciudad);
        userEvent.type(nombre, 'Juan');
        userEvent.type(dni, '');
        userEvent.type(domicilio, 'Piedras 321');
        userEvent.type(ciudad, 'La Plata');

        const btnVolver = await screen.findByText(/volver/i)
        expect(btnVolver).toBeInTheDocument();
        userEvent.click(btnVolver);

        nombre = await screen.findAllByText(/micaela/i);
        const apellido = screen.getAllByText(/lapuente/i);
        dni = screen.getByText(/38831617/i);
        const fechaNacimiento = screen.getByText(/1995-09-17/i);
        const email = screen.getByText(/mica-mdq@gmail.com/i);
        const telefono = screen.getByText(/65686/i);
        domicilio = screen.getByText(/Rondeau 546/i);
        ciudad = screen.getByText(/Mar del Plata/i);
        const fechaAlta = screen.getByText(/2021-06-11/i);
        
        expect(nombre[1]).toBeInTheDocument();
        expect(apellido[1]).toBeInTheDocument();
        expect(dni).toBeInTheDocument();
        expect(fechaNacimiento).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(telefono).toBeInTheDocument();
        expect(domicilio).toBeInTheDocument();
        expect(ciudad).toBeInTheDocument();
        expect(fechaAlta).toBeInTheDocument();
    });

});
