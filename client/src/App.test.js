import { render, screen } from './test-utils';
import HeaderLogin from './components/NavBar/HeaderLogin';

test('renders inicio', () => {
  render(
          <HeaderLogin />
  );
  const linkElement = screen.getByText(/inicio/i);
  expect(linkElement).toBeInTheDocument();
});
