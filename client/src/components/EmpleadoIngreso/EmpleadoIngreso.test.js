import { act, fireEvent, render, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import App from '../../App';


describe('Registrar Ingresos', () => {

    beforeEach(async ()=>{
        await act(() => {
            render(<App />);
        })
        const ingresosElement = screen.getAllByText(/ingresos/i)[0];
        userEvent.click(ingresosElement);
        const searchInput = await screen.findByRole('searchbox', {name: /search/i});
        await act(() => {
            userEvent.type(searchInput, '4');
        })
        const btn = await screen.findAllByText(/registrar/i);
        await act(() => {
            userEvent.click(btn[btn.length-1]);
        })
    });

    it('render Loading', async () => {

        const loading = await screen.findByText(/loading/i);
        expect(loading).toBeInTheDocument();
    });
    
    it('renders Title and Empleado-Ingresos', async () => {
        
        const employee = await screen.findByText(/lapuente micaela/i);
        const title = screen.getByRole('heading', {name: /registrar ingreso/i});    
        const legajo = await screen.findByText(/Legajo Nº: 4/i);
        const horario = screen.getByText(/elegí el horario de ingreso/i);      
        const input = screen.getByTestId('inputHor');
        const btnRegistrar = screen.getByRole('button', {name: /registrar ingreso/i});
        const historial = screen.getByRole('heading', {name: /historial/i});
        expect(employee).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(legajo).toBeInTheDocument();
        expect(horario).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(input.value).not.toBeTruthy();
        expect(btnRegistrar).toBeInTheDocument();
        expect(btnRegistrar).toBeDisabled();
        expect(historial).toBeInTheDocument();
    });

    it('render Ingresos-Egresos component', async () => {

        const horaIngreso = await screen.findByText(/2022-11-02 09:02/i);
        const horaEgreso = screen.getByText(/2022-11-01 17:12/i);
        const deleteIcon = screen.getAllByTestId('DeleteIcon');
        expect(horaIngreso).toBeInTheDocument();
        expect(horaEgreso).toBeInTheDocument();
        expect(deleteIcon).toHaveLength(2);
        expect(deleteIcon[0]).toBeInTheDocument();
    });

    it('registrar ingreso', async () => {
       
        const input = await screen.findByTestId('inputHor');
        const btnRegistrar = screen.getByRole('button', {name: /registrar ingreso/i});

        await act(() => {
            fireEvent.change(input, {target: {value: '2022-12-02 09:02'}});
        });

        expect(input.value).toBe('2022-12-02T09:02');
        expect(input).toHaveClass('inputTime');
        expect(btnRegistrar).not.toBeDisabled();

        await act(() => {
            userEvent.click(btnRegistrar);
        });

        expect(input.value).not.toBeTruthy();
        expect(btnRegistrar).toBeDisabled();
    });

    it('error ingreso mayor a fecha actual', async () => {
       
        const input = await screen.findByTestId('inputHor');
        const btnRegistrar = screen.getByRole('button', {name: /registrar ingreso/i});

        await act(() => {
            fireEvent.change(input, {target: {value: '2023-12-02 09:02'}});
        });

        let error = await screen.findByText('La fecha es mayor a la actual');

        expect(error).toBeInTheDocument();
        expect(error).toHaveClass('error');
        expect(input).toHaveClass('errorInput');
        expect(input.value).toBe('2023-12-02T09:02');
        expect(btnRegistrar).toBeDisabled();

        await act(() => {
            fireEvent.change(input, {target: {value: '2023-01-02 09:02'}});
        });

        error = screen.queryByText('La fecha es mayor a la actual');

        expect(error).not.toBeInTheDocument();
        expect(input).not.toHaveClass('errorInput');
        expect(input.value).toBe('2023-01-02T09:02');
        expect(btnRegistrar).not.toBeDisabled();
    });

    it('error ingreso anterior a ultimo egreso', async () => {
       
        const input = await screen.findByTestId('inputHor');
        const btnRegistrar = screen.getByRole('button', {name: /registrar ingreso/i});

        await act(() => {
            fireEvent.change(input, {target: {value: '2022-10-02 09:02'}});
        });

        let error = await screen.findByText('Ingreso no puede ser anterior a último Egreso');

        expect(error).toBeInTheDocument();
        expect(error).toHaveClass('error');
        expect(input).toHaveClass('errorInput');
        expect(input.value).toBe('2022-10-02T09:02');
        expect(btnRegistrar).toBeDisabled();

        await act(() => {
            fireEvent.change(input, {target: {value: '2023-01-02 09:02'}});
        });

        error = screen.queryByText('Ingreso no puede ser anterior a último Egreso');
        
        expect(error).not.toBeInTheDocument();
        expect(input).not.toHaveClass('errorInput');
        expect(input.value).toBe('2023-01-02T09:02');
        expect(btnRegistrar).not.toBeDisabled();
    });

    it('style horas trabajadas', async () => {
       
        const horasTrabajadas = await screen.findAllByText(/minutos/i);;
        
        expect(horasTrabajadas).toHaveLength(2);
        expect(horasTrabajadas[0]).toHaveClass('horasV');
        expect(horasTrabajadas[1]).toHaveClass('horasR');

    });

});

describe('Registrar Egresos', () => {

    beforeEach(async ()=>{
        await act(() => {
            render(<App />);
        })
        const egresosElement = screen.getAllByText(/egresos/i)[0];
        userEvent.click(egresosElement);
        const searchInput = await screen.findByRole('searchbox', {name: /search/i});
        await act(() => {
            userEvent.type(searchInput, 'Si');
        })
        const btn = await screen.findAllByText(/registrar/i);
        await act(() => {
            userEvent.click(btn[btn.length-1]);
        })
    })

    
    it('render Loading', async () => {

        const loading = await screen.findByText(/loading/i);
        expect(loading).toBeInTheDocument();
    });
    
    it('renders Title and Empleado-Egresos', async () => {
        
        const employee = await screen.findByText(/sierra lourdes/i);
        const title = screen.getByRole('heading', {name: /registrar egreso/i});    
        const legajo = await screen.findByText(/Legajo Nº: 5/i);
        const horario = screen.getByText(/elegí el horario de egreso/i);      
        const input = screen.getByTestId('inputHor');
        const historial = screen.getByRole('heading', {name: /historial/i});
        const btnRegistrar = screen.getByRole('button', {name: /registrar egreso/i});
        expect(employee).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(legajo).toBeInTheDocument();
        expect(horario).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(input.value).not.toBeTruthy();
        expect(historial).toBeInTheDocument();
        expect(btnRegistrar).toBeInTheDocument();
        expect(btnRegistrar).toBeDisabled();
    });

    it('render Ingresos-Egresos component', async () => {

        const horaIngreso = await screen.findByText(/2022-11-01 08:58/i);
        const horaEgreso = screen.getByText(/2022-11-01 17:12/i);
        const deleteIcon = screen.getAllByTestId('DeleteIcon');
        expect(horaIngreso).toBeInTheDocument();
        expect(horaEgreso).toBeInTheDocument();
        expect(deleteIcon).toHaveLength(2);
        expect(deleteIcon[0]).toBeInTheDocument();
    });

    it('registrar egreso con advertencia', async () => {
       
        const input = await screen.findByTestId('inputHor');
        const btnRegistrar = screen.getByRole('button', {name: /registrar egreso/i});

        await act(() => {
            fireEvent.change(input, {target: {value: '2022-11-02 09:02'}});
        });

        expect(input.value).toBe('2022-11-02T09:02');
        expect(input).toHaveClass('inputTime');
        expect(btnRegistrar).not.toBeDisabled();

        await act(() => {
            userEvent.click(btnRegistrar);
        });

        const advertencia = screen.getByText(/advertencia/i);
        const tiempo = screen.getByText(/22 hs. 4 minutos/i);

        expect(input.value).not.toBeTruthy();
        expect(btnRegistrar).toBeDisabled();
        expect(advertencia).toBeInTheDocument();
        expect(tiempo).toBeInTheDocument();
    });

    it('registrar egreso sin advertencia', async () => {
       
        const input = await screen.findByTestId('inputHor');
        const btnRegistrar = screen.getByRole('button', {name: /registrar egreso/i});

        await act(() => {
            fireEvent.change(input, {target: {value: '2022-11-01 12:02'}});
        });

        expect(input.value).toBe('2022-11-01T12:02');
        expect(input).toHaveClass('inputTime');
        expect(btnRegistrar).not.toBeDisabled();

        await act(() => {
            userEvent.click(btnRegistrar);
        });

        const egresoConfirmado = screen.getByText(/egreso confirmado/i);
        const tiempo = screen.getByText(/1 hs. 4 minutos/i);

        expect(input.value).not.toBeTruthy();
        expect(btnRegistrar).toBeDisabled();
        expect(egresoConfirmado).toBeInTheDocument();
        expect(tiempo).toBeInTheDocument();
    });

    it('error ingreso mayor a fecha actual', async () => {
       
        const input = await screen.findByTestId('inputHor');
        const btnRegistrar = screen.getByRole('button', {name: /registrar egreso/i});

        await act(() => {
            fireEvent.change(input, {target: {value: '2023-12-02 09:02'}});
        });

        let error = await screen.findByText('La fecha es mayor a la actual');

        expect(error).toBeInTheDocument();
        expect(error).toHaveClass('error');
        expect(input).toHaveClass('errorInput');
        expect(input.value).toBe('2023-12-02T09:02');
        expect(btnRegistrar).toBeDisabled();

        await act(() => {
            fireEvent.change(input, {target: {value: '2023-01-02 09:02'}});
        });

        error = screen.queryByText('La fecha es mayor a la actual');

        expect(error).not.toBeInTheDocument();
        expect(input).not.toHaveClass('errorInput');
        expect(input.value).toBe('2023-01-02T09:02');
        expect(btnRegistrar).not.toBeDisabled();
    });

    it('error egreso anterior a ultimo ingreso', async () => {
       
        const input = await screen.findByTestId('inputHor');
        const btnRegistrar = screen.getByRole('button', {name: /registrar egreso/i});

        await act(() => {
            fireEvent.change(input, {target: {value: '2022-10-02 09:02'}});
        });

        let error = await screen.findByText('Egreso no puede ser anterior a Ingreso');

        expect(error).toBeInTheDocument();
        expect(error).toHaveClass('error');
        expect(input).toHaveClass('errorInput');
        expect(input.value).toBe('2022-10-02T09:02');
        expect(btnRegistrar).toBeDisabled();

        await act(() => {
            fireEvent.change(input, {target: {value: '2023-01-02 09:02'}});
        });

        error = screen.queryByText('Egreso no puede ser anterior a Ingreso');
        
        expect(error).not.toBeInTheDocument();
        expect(input).not.toHaveClass('errorInput');
        expect(input.value).toBe('2023-01-02T09:02');
        expect(btnRegistrar).not.toBeDisabled();
    });

});
