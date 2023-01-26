import userEvent from "@testing-library/user-event";
import App from "../../App";
import { render, screen } from "../../test-utils";


describe('Crear Empleado', () => {

    beforeEach( async ()=>{
        render(<App />);
        const empleadosElement = screen.getAllByText(/empleados/i)[0];
        userEvent.click(empleadosElement);
        
        const buttonAlta = await screen.findByRole('button', {name: /alta empleado/i});
        userEvent.click(buttonAlta);
    });

    it('render Title', async () => {

        const title = screen.getByRole('heading', {name: /alta empleado/i});
        expect(title).toBeInTheDocument();

    })
})