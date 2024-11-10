import { render,screen } from "@testing-library/react"
import { ProductList } from "../ProductList/ProductList"
import { mockData } from "../moks"


test("Should render Product list component   ",()=>{
    render(<ProductList products={mockData} />)

    expect(screen.getByTestId('list')).toBeInTheDocument();

    const productCards = screen.getAllByTestId('card');
    expect(productCards).toHaveLength(mockData.length);
})