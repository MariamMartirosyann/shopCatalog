import { mockDataProductCard } from "../moks"
import ProductCard from "../ProductCard/ProductCard"
import { render, screen } from "@testing-library/react"

test("should render ProductCard Component ",()=>{
    render(<ProductCard product={mockDataProductCard}/>)
    expect(screen.getByText(/Wireless Headphones/)).toBeInTheDocument();
    expect(screen.getByText(/Electronics/)).toBeInTheDocument();
    expect(screen.getByText(/Brand MM/)).toBeInTheDocument();
    expect(screen.getByText(/140/)).toBeInTheDocument();
    expect(screen.getByText(/4.7/)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    

})