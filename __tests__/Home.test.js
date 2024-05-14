import { render, screen, fireEvent, act } from "@testing-library/react";

import Home from "../pages/index";

import { ProductsSearch } from "../components/global/products-search"

test("Check The Home Filters Exist", () => {
  render(<Home />);

  expect(screen.getAllByRole("textbox")).toHaveLength(1);
  expect(screen.getAllByRole("combobox")).toHaveLength(1);
  expect(screen.getAllByRole("slider")).toHaveLength(1);

})

test("Check The Search Function", () => {
  const setSearchFilter = jest.fn();
  render(<ProductsSearch setSearchFilter={setSearchFilter} />)

  const input = screen.getByPlaceholderText('Search...');

  fireEvent.change(input, { target: { value: 'iphone' } });
  expect(setSearchFilter).toHaveBeenCalledWith('iphone');
})

