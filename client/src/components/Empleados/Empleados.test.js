import { cleanup, render, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import Empleados from './Empleados';
import App from '../../App';

describe('Empleados', () => {

    // beforeEach( ()=>{

    // })

    // afterEach(()=>{
    //   cleanup();
    // })

    
    it('renders title and components', async () => {
       
      render(<Empleados />);

      const title = await screen.findByText(/empleados/i);
      const button = await screen.findByText(/alta/i);
      const btnReset = await screen.findByText(/reset/i);
      const apellido = await screen.findByText(/apellido/i);
      const empleados = await screen.findAllByText('SI')

      expect(title).toBeInTheDocument();
      expect(button).toBeInTheDocument();
      expect(btnReset).toBeInTheDocument();
      expect(apellido).toBeInTheDocument();
      expect(empleados).toHaveLength(7);

    });

    it('click button, go to Create Employee', async () => {

        render(<App />);
        const empleadosElement = screen.getAllByText(/empleados/i)[0];
        userEvent.click(empleadosElement);
        
        const buttonAlta = await screen.findByRole('button', {name: /alta empleado/i});

        expect(buttonAlta).toHaveClass('btnAdd');
        userEvent.click(buttonAlta);

        const form = screen.getByText(/ciudad/i);

        expect(form).toBeInTheDocument();
    });

    it('search employee by id', async () => {

      render(<Empleados />);

      const searchInput = screen.getByRole('searchbox', {name: /search/i});
      userEvent.type(searchInput, '2');

      expect(searchInput.value).toBe('2');      
       
      const employee = await screen.findByText(/lapuente/i);
      const nombre = screen.getByText(/activo/i);
      const employee2 = screen.queryByText(/morea/i);
      const check = screen.queryByTestId('check');
      const remove = screen.getByTestId('remove');

      expect(employee).toBeInTheDocument();
      expect(nombre).toBeInTheDocument();
      expect(employee2).not.toBeInTheDocument();
      expect(remove).toBeInTheDocument();
      expect(check).not.toBeInTheDocument();

    });

    it('search employee by name', async () => {

      render(<Empleados />);

      const searchInput = screen.getByRole('searchbox', {name: /search/i});
      userEvent.type(searchInput,'Sie');
      expect(searchInput.value).toBe('Sie');      
       
      const employee = await screen.findByText(/sierra/i);
      const nombre = screen.getByText(/activo/i);
      const employee2 = screen.queryByText(/lapuente/i);
      const check = screen.getByTestId('check');
      const remove = screen.queryByTestId('remove');

      expect(employee).toBeInTheDocument();
      expect(nombre).toBeInTheDocument();
      expect(employee2).not.toBeInTheDocument();
      expect(check).toBeInTheDocument();
      expect(remove).not.toBeInTheDocument();

    });  

    it('reset search', async () => {

      render(<Empleados />);

      const searchInput = screen.getByRole('searchbox', {name: /search/i});
      userEvent.type(searchInput, 'Sie');
      expect(searchInput.value).toBe('Sie');      
       
      const employee = await screen.findByText(/sierra/i);
      const nombre = screen.getByText(/activo/i);
      const employee2 = screen.queryByText(/lapuente/i);

      expect(employee).toBeInTheDocument();
      expect(nombre).toBeInTheDocument();
      expect(employee2).not.toBeInTheDocument();

      const resetBtn = screen.getByRole('button', {name: /reset/i});
      userEvent.click(resetBtn);
      const employee3 = await screen.findByText(/sierra/i);
      const employee4 = screen.getByText(/morea/i);
      const employee5 = screen.getByText(/lapuente/i);

      expect(employee3).toBeInTheDocument();
      expect(employee4).toBeInTheDocument();
      expect(employee5).toBeInTheDocument();
    });  

    it('click editar', async () => {
      
      render(<App />);

      const empleadosElement = screen.getAllByText(/empleados/i)[0];
      userEvent.click(empleadosElement);

      const editar = await screen.findAllByTestId('edit-employee')
      expect(editar).toHaveLength(7);   

      const searchInput = screen.getByRole('searchbox', {name: /search/i});
      userEvent.type(searchInput, '2');
      expect(searchInput.value).toBe('2');  

      const editar2 = await screen.findByTestId('edit-employee') 
      userEvent.click(editar2);

      const loading = await screen.findByText(/loading/i);
      expect(loading).toBeInTheDocument();  

      const profile = await screen.findByText(/Perfil de/i);
      expect(profile).toBeInTheDocument();  
       
    });  


});
