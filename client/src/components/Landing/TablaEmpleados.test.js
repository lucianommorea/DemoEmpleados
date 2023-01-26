import { findByRole, render, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import App from '../../App';


describe('Tabla Empleados', () => {

    beforeEach(()=>{
        render(<App />);
    })
    
    it('renders first employee in landing', async () => {
       
      const employeeIn = await screen.findByText(/gomez/i);
      // const employeeOut = await screen.findByText(/messi/i);
      const nombre = screen.getByText(/nombre/i);
      const ingreso = screen.getByText(/2022-11-01 10:58/i);

      expect(employeeIn).toBeInTheDocument();
      // expect(employeeOut).toBeInTheDocument();
      expect(nombre).toBeInTheDocument();
      expect(ingreso).toBeInTheDocument();

    });

    it('click out, render employees out data', async () => {

      const inputRadio2 = screen.getByRole('radio', {name: /fuera de la empresa/i});

      userEvent.click(inputRadio2);
      
      expect(inputRadio2).toBeChecked();
       
      const employee = await screen.findByText(/messi/i);
      const nombre = screen.getByText(/nombre/i);
      const egreso = screen.getByText(/2022-11-04 17:00/i);

      expect(employee).toBeInTheDocument();
      expect(nombre).toBeInTheDocument();
      expect(egreso).toBeInTheDocument();

    });

    it('click in, render employees in data', async () => {

      const inputRadio1 = screen.getByRole('radio', {name: /en la empresa/i});
      const inputRadio2 = screen.getByRole('radio', {name: /fuera de la empresa/i});

      userEvent.click(inputRadio2);

      const employee2 = await screen.findByText(/messi/i);
      const nombre2 = await screen.findByText(/nombre/i);
      const egreso = await screen.findByText(/2022-11-02 18/i);

      expect(inputRadio2).toBeChecked();
      expect(inputRadio1).not.toBeChecked();
      expect(employee2).toBeInTheDocument();
      expect(nombre2).toBeInTheDocument();
      expect(egreso).toBeInTheDocument();

      userEvent.click(inputRadio1);
      
      expect(inputRadio2).not.toBeChecked();
      expect(inputRadio1).toBeChecked();

      const employee = await screen.findByText(/gomez/i);
      const nombre = await screen.findByText(/nombre/i);
      const ingreso = await screen.findByText(/2022-11-01 10:58/i);

      expect(employee).toBeInTheDocument();
      expect(nombre).toBeInTheDocument();
      expect(ingreso).toBeInTheDocument();

    });

    it('link to profile', async () => {

      const link = await screen.findByRole('link', {name: /lapuente/i});

      userEvent.click(link);

      const loading = await screen.findByText(/loading/i);
      expect(loading).toBeInTheDocument();

      const employeePage = await screen.findByText(/historial/i);
      expect(employeePage).toBeInTheDocument();
    });

});
