import userEvent from "@testing-library/user-event";
import App from "../../App";
import { act, fireEvent, render, screen } from "../../test-utils";


describe('Crear Empleado', () => {

    beforeEach( async ()=>{
        render(<App />);
        const empleadosElement = screen.getAllByText(/empleados/i)[0];
        userEvent.click(empleadosElement);
        
        const buttonAlta = await screen.findByRole('button', {name: /alta empleado/i});
        userEvent.click(buttonAlta);
    });

    it('render Form labels', async () => {

        const nombre = screen.getByText(/nombre/i);
        const apellido = screen.getByText(/apellido/i);
        const dni = screen.getByText(/dni/i);
        const fechaNac = screen.getByText(/fecha de nacimiento/i);
        const email = screen.getByText(/email/i);
        const telefono = screen.getByText(/telefono/i);
        const domicilio = screen.getByText(/domicilio/i);
        const ciudad = screen.getByText(/ciudad/i);
        const fechaAlta = screen.getByText(/fecha Alta/i);

        expect(nombre).toBeInTheDocument();
        expect(apellido).toBeInTheDocument();
        expect(dni).toBeInTheDocument();
        expect(fechaNac).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(telefono).toBeInTheDocument();
        expect(domicilio).toBeInTheDocument();
        expect(ciudad).toBeInTheDocument();
        expect(fechaAlta).toBeInTheDocument();
    });

    it('render empty inputs', async () => {

        const dni = screen.getByLabelText(/dni/i);
        const fechaNac = screen.getByLabelText(/fecha de nacimiento/i);
        const fechaAlta = screen.getByLabelText(/fecha Alta/i);

        expect(dni.value).toBeFalsy();
        expect(fechaNac.value).toBeFalsy();
        expect(fechaAlta.value).toBeFalsy();

        const inputs = screen.getAllByRole('textbox');
 
        inputs.forEach((nom => {
            expect(nom.value).toBeFalsy()
        }))
    });

    it('button Alta', async () => {

        const button = screen.getByRole('button', {name: /alta empleado/i});

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('btn');
    });

    it('click button with empty form', async () => {

        const button = screen.getByRole('button', {name: /alta empleado/i});

        userEvent.click(button);

        const error = await screen.findByText('ERROR');
        const error2 = await screen.findByText(/no pudo darse de alta/i);
     
        expect(error).toBeInTheDocument();
        expect(error2).toBeInTheDocument();

        const btnOk = screen.getByRole('button', {name: /ok/i});

        userEvent.click(btnOk);

        const inputs = await screen.findAllByRole('textbox');
        const dni = screen.getByLabelText(/dni/i);
        const fechaNac = screen.getByLabelText(/fecha de nacimiento/i);
        const fechaAlta = screen.getByLabelText(/fecha Alta/i);

        expect(dni).toHaveClass('errorInput');
        expect(fechaNac).toHaveClass('errorInputFecha');
        expect(fechaAlta).toHaveClass('errorInputFecha');

        inputs.forEach(nom => {
            expect(nom.value).toBeFalsy();
            expect(nom).toHaveClass('errorInput')
        });
    });

    it('send form correct', async () => {

        const button = screen.getByRole('button', {name: /alta empleado/i});
        const nombre = screen.getByLabelText(/nombre/i);
        const apellido = screen.getByLabelText(/apellido/i);
        const dni = screen.getByLabelText(/dni/i);
        const fechaNac = screen.getByLabelText(/fecha de nacimiento/i);
        const email = screen.getByLabelText(/email/i);
        const telefono = screen.getByLabelText(/telefono/i);
        const domicilio = screen.getByLabelText(/domicilio/i);
        const ciudad = screen.getByLabelText(/ciudad/i);
        const fechaAlta = screen.getByLabelText(/fecha Alta/i);

        userEvent.type(nombre, 'Juan');
        userEvent.type(apellido, 'Lopez');
        fireEvent.change(dni, {target: {value: '22'}});
        fireEvent.change(fechaNac, {target: {value: '1995-09-17'}});
        userEvent.type(email, 'Juan');
        userEvent.type(telefono, 'Lopez');
        userEvent.type(domicilio, 'Juan');
        userEvent.type(ciudad, 'Lopez');
        fireEvent.change(fechaAlta, {target: {value: '2022-12-02'}});

        await act(() => {
            userEvent.click(button);
        })

        const alta1 = await screen.findByText('ALTA EMPLEADO');
        const alta2 = screen.getByText(/se ha dado de alta a Juan/i);
        const btnOk = screen.getByText('OK');
        const empleadosMenuRedirect = screen.getByText(/morea/i);

        expect(alta1).toBeInTheDocument();
        expect(alta2).toBeInTheDocument();
        expect(btnOk).toBeInTheDocument();
        expect(empleadosMenuRedirect).toBeInTheDocument();
    });

    it('send form with empty inputs, save completed inputs', async () => {

        const button = screen.getByRole('button', {name: /alta empleado/i});
        const nombre = screen.getByLabelText(/nombre/i);
        const apellido = screen.getByLabelText(/apellido/i);
        userEvent.type(nombre, 'Juan');
        userEvent.type(apellido, 'Lopez');

        await act(() => {
            userEvent.click(button);
        })

        const error = await screen.findByText('ERROR');
        const error2 = await screen.findByText(/no pudo darse de alta/i);
     
        expect(error).toBeInTheDocument();
        expect(error2).toBeInTheDocument();

        const btnOk = screen.getByRole('button', {name: /ok/i});

        await act(() => {
            userEvent.click(btnOk);
        })

        expect(nombre.value).toBe('Juan');
        expect(apellido.value).toBe('Lopez');
    });

    
})

describe('Form Errors', () => {

    beforeEach( async ()=>{
        render(<App />);
        const empleadosElement = screen.getAllByText(/empleados/i)[0];
        userEvent.click(empleadosElement);
        
        const buttonAlta = await screen.findByRole('button', {name: /alta empleado/i});
        userEvent.click(buttonAlta);
    });

    it('error name number', async () => {

        const input = screen.getByRole('textbox', {name: /nombre/i})
        
        await act(() => {
            userEvent.type(input, '12');
        })

        const error = await screen.findByText(/solo letras y espacios/i);

        expect(input.value).toBeTruthy();
        expect(input).toHaveClass('errorInput');
        expect(error).toBeInTheDocument();

        await act(() => {
            userEvent.clear(input);
        })

        expect(error).not.toBeInTheDocument();
        expect(input).not.toHaveClass('errorInput');
    });

    it('error name max 30', async () => {

        const input = screen.getByRole('textbox', {name: /nombre/i})
        
        await act(() => {
            userEvent.type(input, 'qwertyuiopasdfghjklzxcvbnmqwert');
        })

        const error = await screen.findByText(/Máximo 30 caracteres/i);

        expect(input.value).toBeTruthy();
        expect(input).toHaveClass('errorInput');
        expect(error).toBeInTheDocument();

        await act(() => {
            userEvent.clear(input);
        })

        expect(error).not.toBeInTheDocument();
        expect(input).not.toHaveClass('errorInput');
    });

    it('error apellido number', async () => {

        const input = screen.getByRole('textbox', {name: /apellido/i})
        
        await act(() => {
            userEvent.type(input, '12');
        })

        const error = await screen.findByText(/solo letras y espacios/i);

        expect(input.value).toBeTruthy();
        expect(input).toHaveClass('errorInput');
        expect(error).toBeInTheDocument();

        await act(() => {
            userEvent.clear(input);
        })

        expect(error).not.toBeInTheDocument();
        expect(input).not.toHaveClass('errorInput');
    });

    it('error apellido max 40', async () => {

        const input = screen.getByRole('textbox', {name: /apellido/i})
        
        await act(() => {
            userEvent.type(input, 'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfg');
        })

        const error = await screen.findByText(/Máximo 40 caracteres/i);

        expect(input.value).toBeTruthy();
        expect(input).toHaveClass('errorInput');
        expect(error).toBeInTheDocument();

        await act(() => {
            userEvent.clear(input);
        })

        expect(error).not.toBeInTheDocument();
        expect(input).not.toHaveClass('errorInput');
    });

    it('error dni duplicated', async () => {

        const input = screen.getByLabelText(/dni/i);
        
        await act(() => {
            userEvent.type(input, '36780159');
        })

        const error = await screen.findByText(/DNI ya registrado/i);

        expect(input.value).toBeTruthy();
        expect(input).toHaveClass('errorInput');
        expect(error).toBeInTheDocument();

        await act(() => {
            userEvent.clear(input);
        })

        expect(error).not.toBeInTheDocument();
        expect(input).not.toHaveClass('errorInput');
    });

    it('error dni mayor', async () => {

        const input = screen.getByLabelText(/dni/i);
        
        await act(() => {
            userEvent.type(input, '200000000');
        })

        const error = await screen.findByText(/DNI no puede ser mayor a 100.000.000/i);

        expect(input.value).toBeTruthy();
        expect(input).toHaveClass('errorInput');
        expect(error).toBeInTheDocument();

        await act(() => {
            userEvent.clear(input);
        })

        expect(error).not.toBeInTheDocument();
        expect(input).not.toHaveClass('errorInput');
    });

    it('error dni negativo', async () => {

        const input = screen.getByLabelText(/dni/i);
        
        await act(() => {
            userEvent.type(input, '-2');
        })

        const error = await screen.findByText(/DNI no puede ser menor a 0/i);

        expect(input.value).toBeTruthy();
        expect(input).toHaveClass('errorInput');
        expect(error).toBeInTheDocument();

        await act(() => {
            userEvent.clear(input);
        })

        expect(error).not.toBeInTheDocument();
        expect(input).not.toHaveClass('errorInput');
    });

    it('error fecha de nacimiento', async () => {

        const input = screen.getByLabelText(/fecha de nacimiento/i);
        
        await act(() => {
            userEvent.type(input, '2023-12-02');
        })

        const error = await screen.findByText(/Fecha mayor a la actual/i);

        expect(input.value).toBeTruthy();
        expect(input).toHaveClass('errorInputFecha');
        expect(error).toBeInTheDocument();

        await act(() => {
            userEvent.clear(input);
        })

        expect(error).not.toBeInTheDocument();
        expect(input).not.toHaveClass('errorInputFecha');
    });

    it('error email largo', async () => {

        const input = screen.getByRole('textbox', {name: /email/i});
        
        await act(() => {
            userEvent.type(input, 'aaa@aaasdasdasdasdasdadasdasda.comasdadaasdadadaassa');
        })

        const error = await screen.findByText(/Máximo 50 caracteres/i);

        expect(input.value).toBeTruthy();
        expect(input).toHaveClass('errorInput');
        expect(error).toBeInTheDocument();

        await act(() => {
            userEvent.clear(input);
        })

        expect(error).not.toBeInTheDocument();
        expect(input).not.toHaveClass('errorInput');
    });

    it('error telefono largo', async () => {

        const input = screen.getByRole('textbox', {name: /telefono/i});
        
        await act(() => {
            userEvent.type(input, '123456789012345678901');
        })

        const error = await screen.findByText(/Máximo 20 caracteres/i);

        expect(input.value).toBeTruthy();
        expect(input).toHaveClass('errorInput');
        expect(error).toBeInTheDocument();

        await act(() => {
            userEvent.clear(input);
        })

        expect(error).not.toBeInTheDocument();
        expect(input).not.toHaveClass('errorInput');
    });

    it('error domicilio largo', async () => {

        const input = screen.getByRole('textbox', {name: /domicilio/i});
        
        await act(() => {
            userEvent.type(input, 'aaa@aaasdasdasdasdasdadasdasda.comasdadaasdadadaassa');
        })

        const error = await screen.findByText(/Máximo 50 caracteres/i);

        expect(input.value).toBeTruthy();
        expect(input).toHaveClass('errorInput');
        expect(error).toBeInTheDocument();

        await act(() => {
            userEvent.clear(input);
        })

        expect(error).not.toBeInTheDocument();
        expect(input).not.toHaveClass('errorInput');
    });

    it('error ciudad max 30', async () => {

        const input = screen.getByRole('textbox', {name: /ciudad/i})
        
        await act(() => {
            userEvent.type(input, 'qwertyuiopasdfghjklzxcvbnmqwert');
        })

        const error = await screen.findByText(/Máximo 30 caracteres/i);

        expect(input.value).toBeTruthy();
        expect(input).toHaveClass('errorInput');
        expect(error).toBeInTheDocument();

        await act(() => {
            userEvent.clear(input);
        })

        expect(error).not.toBeInTheDocument();
        expect(input).not.toHaveClass('errorInput');
    });

    it('error fecha de alta', async () => {

        const input = screen.getByLabelText(/fecha alta/i);
        
        await act(() => {
            userEvent.type(input, '2023-12-02');
        })

        const error = await screen.findByText(/Fecha mayor a la actual/i);

        expect(input.value).toBeTruthy();
        expect(input).toHaveClass('errorInputFecha');
        expect(error).toBeInTheDocument();

        await act(() => {
            userEvent.clear(input);
        })

        expect(error).not.toBeInTheDocument();
        expect(input).not.toHaveClass('errorInputFecha');
    });


})