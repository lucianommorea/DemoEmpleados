import { render, screen } from '../../test-utils';
import Landing from './Landing';


describe('Landing', () => {

    beforeEach(()=>{
        render(<Landing />);
    })

    
    it('renders Title Registro Empleados in landing', () => {
       
      const inicioElement = screen.getByText(/registro empleados/i);
      const inputRadio1 = screen.getByRole('radio', {name: /en la empresa/i});
      const inputRadio2 = screen.getByRole('radio', {name: /fuera de la empresa/i});

      expect(inicioElement).toBeInTheDocument();
      expect(inputRadio1).toBeChecked();
      expect(inputRadio2).not.toBeChecked();

    });
    
});
