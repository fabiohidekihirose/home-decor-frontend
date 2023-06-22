export interface ProductProps {
  id: number;
  department_name: string;
  image: string;
  price: number;
  name: string;
  quantity: number;
  description: string;
  inCart: number;
  discount: number;
}

export interface DepartmentProps {
  id: number;
  label: string;
  department: string;
  image: string;
}

export interface CartItemCardProps {
  cartItem: ProductProps;
}
