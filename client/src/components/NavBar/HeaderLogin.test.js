import { render, screen } from '../../test-utils';
import App from '../../App';
import userEvent from '@testing-library/user-event';

describe('Header Login', () => {

    beforeEach(()=>{
        render(<App />);
    })

    
    it('renders Title Registro Empleados in landing', () => {
       
      const inicioElement = screen.getByText(/registro empleados/i);
      expect(inicioElement).toBeInTheDocument();
    });

    it('renders inicio active', () => {
       
      const inicioElement = screen.getByText(/inicio/i);
      const empleadosElement = screen.getAllByText(/empleados/i)[0];
      const ingresosElement = screen.getByText(/registrar ingresos/i);
      const egresosElement = screen.getByText(/registrar egresos/i);
      const totalEmpElement = screen.getByText(/total de empleados en la empresa/i);

      expect(inicioElement).toHaveClass('linksIntActive');
      expect(inicioElement).not.toHaveClass('linksInt');
      expect(empleadosElement).not.toHaveClass('linksIntActive');
      expect(empleadosElement).toHaveClass('linksInt');
      expect(ingresosElement).not.toHaveClass('linksIntActive');
      expect(ingresosElement).toHaveClass('linksInt');
      expect(egresosElement).not.toHaveClass('linksIntActive');
      expect(egresosElement).toHaveClass('linksInt');
      expect(totalEmpElement).toBeInTheDocument();
    });

    it('renders empleados active', async () => {
       
        const inicioElement = screen.getByText(/inicio/i);
        const empleadosElement = screen.getAllByText(/empleados/i)[0];
        const ingresosElement = screen.getByText(/registrar ingresos/i);
        const egresosElement = screen.getByText(/registrar egresos/i);

        userEvent.click(empleadosElement);

        const empleadosElements =  await screen.findByTestId('empleados');

        expect(inicioElement).not.toHaveClass('linksIntActive');
        expect(inicioElement).toHaveClass('linksInt');
        expect(empleadosElement).toHaveClass('linksIntActive');
        expect(empleadosElement).not.toHaveClass('linksInt');
        expect(ingresosElement).not.toHaveClass('linksIntActive');
        expect(ingresosElement).toHaveClass('linksInt');
        expect(egresosElement).toHaveClass('linksInt');
        expect(egresosElement).not.toHaveClass('linksIntActive');
        expect(empleadosElements).toBeInTheDocument();
      });

    it('renders ingresos active', async () => {
       
        const inicioElement = screen.getByText(/inicio/i);
        const empleadosElement = screen.getAllByText(/empleados/i)[0];
        const ingresosElement = screen.getByText(/registrar ingresos/i);
        const egresosElement = screen.getByText(/registrar egresos/i);

        userEvent.click(ingresosElement);

        const ingresosElements2 = screen.getAllByText(/registrar ingresos/i)[1];

        expect(inicioElement).not.toHaveClass('linksIntActive');
        expect(inicioElement).toHaveClass('linksInt');
        expect(empleadosElement).not.toHaveClass('linksIntActive');
        expect(empleadosElement).toHaveClass('linksInt');
        expect(ingresosElement).toHaveClass('linksIntActive');
        expect(ingresosElement).not.toHaveClass('linksInt');
        expect(egresosElement).toHaveClass('linksInt');
        expect(egresosElement).not.toHaveClass('linksIntActive');
        expect(ingresosElements2).toBeInTheDocument();
      });

    it('renders egresos active', async () => {
       
        const inicioElement = screen.getByText(/inicio/i);
        const empleadosElement = screen.getAllByText(/empleados/i)[0];
        const ingresosElement = screen.getAllByText(/registrar ingresos/i)[0];
        const egresosElement = screen.getAllByText(/registrar egresos/i)[0];

        userEvent.click(egresosElement);

        const egresosElements2 = screen.getAllByText(/registrar egresos/i)[1];

        expect(inicioElement).not.toHaveClass('linksIntActive');
        expect(inicioElement).toHaveClass('linksInt');
        expect(empleadosElement).not.toHaveClass('linksIntActive');
        expect(empleadosElement).toHaveClass('linksInt');
        expect(ingresosElement).not.toHaveClass('linksIntActive');
        expect(ingresosElement).toHaveClass('linksInt');
        expect(egresosElement).not.toHaveClass('linksInt');
        expect(egresosElement).toHaveClass('linksIntActive');
        expect(egresosElements2).toBeInTheDocument();
      });

});
