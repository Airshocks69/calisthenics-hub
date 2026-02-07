// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'member' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

// Training Types
export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: 'strength' | 'flexibility' | 'endurance' | 'skill';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions: string;
  imageUrl?: string;
  videoUrl?: string;
  createdAt: Date;
}

export interface TrainingReport {
  id: string;
  userId: string;
  date: Date;
  exercises: TrainingExercise[];
  duration: number;
  notes?: string;
  progress?: number;
  createdAt: Date;
}

export interface TrainingExercise {
  exerciseId: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
}

// Shop Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  createdAt: Date;
}

export interface CartItem {
  productId: string;
  product?: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}
