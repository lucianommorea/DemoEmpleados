import { act, cleanup, render, screen, waitForElementToBeRemoved } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import App from '../../App';


describe('Egresos', () => {

    beforeEach( async () =>{
        await act(() => {
            render(<App />);
        })
        const egresosElement = screen.getAllByText(/egresos/i)[0];
        userEvent.click(egresosElement);
    });
    
    
    it('renders Title Registro Egresos', async () => {

        const links = screen.getAllByRole('link');
        const title = screen.getByRole('heading', {name:/registrar egresos/i});
        expect(links).toHaveLength(6);
        expect(title).toBeInTheDocument();
    });

    it('renders SearchBar', async () => {

        const input = screen.getByPlaceholderText(/buscar por apellido o legajo/i)
        const reset = screen.getByRole('button', {name: /reset/i});
        expect(reset).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(input.value).toBeFalsy();
    });

    it('renders TablaEgresos', async () => {

        const apellido = screen.getByText(/apellido/i);
        const nombre = screen.getByText(/martin/i);
        const messi = screen.getByText(/morea/i);
        const btnRegistrar = screen.getAllByRole('button', {name: /registrar/i});
        const reportIcons = screen.getAllByTestId("ReportIcon");
        expect(apellido).toBeInTheDocument();
        expect(nombre).toBeInTheDocument();
        expect(messi).toBeInTheDocument();
        expect(btnRegistrar).toHaveLength(2);
        expect(reportIcons).toHaveLength(5);
    });

    it('tooltip no se encuentra trabajando', async () => {
       
        const search = screen.getByRole('searchbox');
        const reportIcons = screen.getAllByTestId('ReportIcon');
        let tooltip = screen.queryByText(/el empleado no se encuentra trabajando/i);
        let tooltip2 = screen.queryByText(/el empleado se encuentra trabajando/i);

        expect(search).toBeInTheDocument();
        expect(reportIcons).toHaveLength(5);
        expect(tooltip).not.toBeInTheDocument();
        expect(tooltip2).not.toBeInTheDocument();

        userEvent.hover(reportIcons[0]);

        tooltip = await screen.findByText(/el empleado no se encuentra trabajando/i);
        tooltip2 = screen.queryByText(/el empleado se encuentra trabajando/i);
        expect(tooltip).toBeInTheDocument();
        expect(tooltip2).not.toBeInTheDocument();

        userEvent.unhover(reportIcons[0]);
        await waitForElementToBeRemoved(tooltip);

        expect(tooltip).not.toBeInTheDocument();
        expect(tooltip2).not.toBeInTheDocument();

    });

    it('search by name and click button Registrar', async () => {
        
        const searchInput = await screen.findByRole('searchbox', {name: /search/i});
        await act(() => {
            userEvent.type(searchInput, 'Sie');
        })
        const btn = await screen.findAllByText(/registrar/i);

        expect(btn[btn.length-1]).toBeInTheDocument();
        await act(() => {
            userEvent.click(btn[btn.length-1]);
        })
        
        const legajo = await screen.findByText(/legajo/i);
        const horario = await screen.findByText(/horario/i);
        const title = screen.getByRole('heading', {name: /registrar egreso/i});
        const historial = screen.getByRole('heading', {name: /historial/i});
        const btnRegistrar = screen.getByRole('button', {name: /registrar egreso/i});
        expect(legajo).toBeInTheDocument();
        expect(horario).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(historial).toBeInTheDocument();
        expect(btnRegistrar).toBeInTheDocument();
        expect(btnRegistrar).toBeDisabled();
    });

    it('search by id and tooltip no se encuentra trabajando', async () => {
        
        const searchInput = await screen.findByRole('searchbox', {name: /search/i});
        let tooltip = screen.queryByText(/no se encuentra trabajando/i);
        let tooltip2 = screen.queryByText(/el empleador se encuentra trabajando/i);

        expect(tooltip).not.toBeInTheDocument();
        expect(tooltip2).not.toBeInTheDocument();

        userEvent.type(searchInput, '5');

        const reportIcon = await screen.findByTestId('ReportIcon');

        userEvent.hover(reportIcon);

        tooltip = await screen.findByText(/no se encuentra trabajando/i);
        tooltip2 = screen.queryByText(/el empleador se encuentra trabajando/i);
        
        expect(tooltip).toBeInTheDocument();
        expect(tooltip2).not.toBeInTheDocument();


        userEvent.unhover(reportIcon);
        await waitForElementToBeRemoved(tooltip);

        tooltip = screen.queryByText(/no se encuentra trabajando/i);
        tooltip2 = screen.queryByText(/el empleador se encuentra trabajando/i);

        expect(tooltip).not.toBeInTheDocument();
        expect(tooltip2).not.toBeInTheDocument();
    });

    it('reset search', async () => {
  
        const searchInput = screen.getByRole('searchbox', {name: /search/i});
        userEvent.type(searchInput, '5');
        expect(searchInput.value).toBe('5');      
         
        const employee = await screen.findByText(/lapuente/i);
        const employee2 = screen.queryByText(/sierra/i);
  
        expect(employee).toBeInTheDocument();
        expect(employee2).not.toBeInTheDocument();
  
        const resetBtn = screen.getByRole('button', {name: /reset/i});
        userEvent.click(resetBtn);
        const employee3 = await screen.findByText(/sierra/i);
        const employee4 = await screen.findByText(/morea/i);
        const employee5 = await screen.findByText(/lapuente/i);
  
        expect(employee3).toBeInTheDocument();
        expect(employee4).toBeInTheDocument();
        expect(employee5).toBeInTheDocument();
      });  

});
