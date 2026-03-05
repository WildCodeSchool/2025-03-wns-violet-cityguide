/**
 * COMPREHENSIVE TEST TEMPLATES FOR REACT COMPONENTS
 * This file contains examples for common testing scenarios
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// ============================================
// EXAMPLE COMPONENT FOR TESTING
// ============================================
/* 
Imagine we have this component:

import { useState } from 'react';

function ExampleComponent({ initialCount = 0, onSubmit }) {
  const [count, setCount] = useState(initialCount);
  const [text, setText] = useState('');

  return (
    <div className={count > 5 ? 'high-count' : 'low-count'}>
      <h1>Counter Component</h1>
      <p data-testid="counter-display">Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={() => onSubmit(text, count)}>Submit</button>
    </div>
  );
}
*/

// ============================================
// 1. TESTING RENDERED TEXT
// ============================================
describe('Testing Rendered Text', () => {
  it('should render static text correctly', () => {
    // Arrange: Setup your component
    const { container } = render(<MemoryRouter><div>Hello World</div></MemoryRouter>);
    
    // Act & Assert: Check the text is present
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('should render dynamic text from props', () => {
    // Mock component with props
    const TestComponent = ({ title }: { title: string }) => <h1>{title}</h1>;
    
    render(<TestComponent title="My Title" />);
    
    expect(screen.getByText('My Title')).toBeInTheDocument();
  });

  it('should render text with specific data-testid', () => {
    const TestComponent = () => <p data-testid="counter-display">Count: 5</p>;
    
    render(<TestComponent />);
    
    const element = screen.getByTestId('counter-display');
    expect(element).toHaveTextContent('Count: 5');
  });

  it('should render text containing partial match', () => {
    render(<div>Welcome to the application</div>);
    
    // Use regex for partial matching
    expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
  });
});

// ============================================
// 2. TESTING RENDERED CLASSES
// ============================================
describe('Testing Rendered Classes', () => {
  it('should render element with specific CSS class', () => {
    const TestComponent = () => <div className="container primary-theme">Content</div>;
    
    render(<TestComponent />);
    
    const element = screen.getByText('Content');
    expect(element).toHaveClass('container');
    expect(element).toHaveClass('primary-theme');
  });

  it('should render conditional classes based on state', () => {
    const TestComponent = ({ isActive }: { isActive: boolean }) => (
      <button className={isActive ? 'active' : 'inactive'}>Button</button>
    );
    
    const { rerender } = render(<TestComponent isActive={true} />);
    
    expect(screen.getByText('Button')).toHaveClass('active');
    
    // Rerender with different props
    rerender(<TestComponent isActive={false} />);
    expect(screen.getByText('Button')).toHaveClass('inactive');
  });

  it('should render multiple conditional classes', () => {
    const TestComponent = ({ count }: { count: number }) => (
      <div className={`container ${count > 5 ? 'high-count' : 'low-count'} ${count === 0 ? 'empty' : ''}`}>
        Content
      </div>
    );
    
    const { rerender } = render(<TestComponent count={0} />);
    
    const element = screen.getByText('Content');
    expect(element).toHaveClass('container', 'low-count', 'empty');
    
    rerender(<TestComponent count={10} />);
    expect(element).toHaveClass('container', 'high-count');
    expect(element).not.toHaveClass('empty');
  });

  it('should check exact className string', () => {
    const TestComponent = () => <div className="btn btn-primary">Button</div>;
    
    render(<TestComponent />);
    
    const element = screen.getByText('Button');
    expect(element.className).toBe('btn btn-primary');
  });
});

// ============================================
// 3. TESTING FUNCTION CALLS ON ACTIONS
// ============================================
describe('Testing Function Calls on User Actions', () => {
  it('should call function when button is clicked', () => {
    // Create a mock function
    const handleClick = vi.fn();
    
    const TestComponent = () => (
      <button onClick={handleClick}>Click Me</button>
    );
    
    render(<TestComponent />);
    
    // Simulate click
    const button = screen.getByText('Click Me');
    fireEvent.click(button);
    
    // Assert function was called
    expect(handleClick).toHaveBeenCalled();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should call function with correct arguments on click', () => {
    const handleSubmit = vi.fn();
    
    const TestComponent = () => (
      <button onClick={() => handleSubmit('test-data', 42)}>Submit</button>
    );
    
    render(<TestComponent />);
    
    fireEvent.click(screen.getByText('Submit'));
    
    // Check function was called with specific arguments
    expect(handleSubmit).toHaveBeenCalledWith('test-data', 42);
  });

  it('should call function multiple times on multiple clicks', () => {
    const handleClick = vi.fn();
    
    const TestComponent = () => <button onClick={handleClick}>Click</button>;
    
    render(<TestComponent />);
    
    const button = screen.getByText('Click');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  it('should call onChange function when input changes', () => {
    const handleChange = vi.fn();
    
    const TestComponent = () => (
      <input onChange={handleChange} placeholder="Type here" />
    );
    
    render(<TestComponent />);
    
    const input = screen.getByPlaceholderText('Type here');
    fireEvent.change(input, { target: { value: 'Hello' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('should call submit function with form data', async () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());
    
    const TestComponent = () => (
      <form onSubmit={handleSubmit}>
        <input name="username" defaultValue="testuser" />
        <button type="submit">Submit</button>
      </form>
    );
    
    render(<TestComponent />);
    
    fireEvent.submit(screen.getByRole('button'));
    
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('should call function with userEvent (more realistic)', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    const TestComponent = () => <button onClick={handleClick}>Click</button>;
    
    render(<TestComponent />);
    
    await user.click(screen.getByText('Click'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// ============================================
// 4. TESTING USESTATE & CUSTOM HOOKS INITIALIZATION
// ============================================
describe('Testing useState and Custom Hooks Initialization', () => {
  it('should initialize useState with default value', () => {
    const TestComponent = ({ initialValue = 'default' }) => {
      const [value] = useState(initialValue);
      return <div>{value}</div>;
    };
    
    render(<TestComponent />);
    
    expect(screen.getByText('default')).toBeInTheDocument();
  });

  it('should initialize useState with prop value', () => {
    const TestComponent = ({ initialCount }: { initialCount: number }) => {
      const [count] = useState(initialCount);
      return <div data-testid="count">{count}</div>;
    };
    
    render(<TestComponent initialCount={10} />);
    
    expect(screen.getByTestId('count')).toHaveTextContent('10');
  });

  it('should render multiple state values on initialization', () => {
    const TestComponent = () => {
      const [name] = useState('John');
      const [age] = useState(25);
      const [active] = useState(true);
      
      return (
        <div>
          <p data-testid="name">{name}</p>
          <p data-testid="age">{age}</p>
          <p data-testid="active">{active ? 'Active' : 'Inactive'}</p>
        </div>
      );
    };
    
    render(<TestComponent />);
    
    expect(screen.getByTestId('name')).toHaveTextContent('John');
    expect(screen.getByTestId('age')).toHaveTextContent('25');
    expect(screen.getByTestId('active')).toHaveTextContent('Active');
  });

  it('should initialize with custom hook values', () => {
    // Mock custom hook
    const useCustomHook = () => {
      return { data: 'custom data', loading: false };
    };
    
    const TestComponent = () => {
      const { data, loading } = useCustomHook();
      
      if (loading) return <div>Loading...</div>;
      return <div data-testid="data">{data}</div>;
    };
    
    render(<TestComponent />);
    
    expect(screen.getByTestId('data')).toHaveTextContent('custom data');
  });

  it('should verify state is NOT initialized with wrong value', () => {
    const TestComponent = ({ initialValue = 'correct' }) => {
      const [value] = useState(initialValue);
      return <div data-testid="value">{value}</div>;
    };
    
    render(<TestComponent />);
    
    const element = screen.getByTestId('value');
    expect(element).not.toHaveTextContent('wrong');
    expect(element).toHaveTextContent('correct');
  });
});

// ============================================
// 5. TESTING USESTATE CHANGES AFTER ACTIONS
// ============================================
describe('Testing useState Changes After User Actions', () => {
  it('should update state when button is clicked', () => {
    const TestComponent = () => {
      const [count, setCount] = useState(0);
      
      return (
        <div>
          <p data-testid="counter">{count}</p>
          <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
      );
    };
    
    render(<TestComponent />);
    
    // Initial state
    expect(screen.getByTestId('counter')).toHaveTextContent('0');
    
    // Click button
    fireEvent.click(screen.getByText('Increment'));
    
    // State should update
    expect(screen.getByTestId('counter')).toHaveTextContent('1');
  });

  it('should update state multiple times on multiple clicks', () => {
    const TestComponent = () => {
      const [count, setCount] = useState(0);
      
      return (
        <div>
          <span data-testid="count">{count}</span>
          <button onClick={() => setCount(prev => prev + 1)}>Add</button>
        </div>
      );
    };
    
    render(<TestComponent />);
    
    const button = screen.getByText('Add');
    
    fireEvent.click(button);
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    
    fireEvent.click(button);
    expect(screen.getByTestId('count')).toHaveTextContent('2');
    
    fireEvent.click(button);
    expect(screen.getByTestId('count')).toHaveTextContent('3');
  });

  it('should update text state on input change', async () => {
    const TestComponent = () => {
      const [text, setText] = useState('');
      
      return (
        <div>
          <input 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            data-testid="text-input"
          />
          <p data-testid="display-text">{text}</p>
        </div>
      );
    };
    
    render(<TestComponent />);
    
    const input = screen.getByTestId('text-input');
    
    // Type in input
    fireEvent.change(input, { target: { value: 'Hello World' } });
    
    // State should update and display
    expect(screen.getByTestId('display-text')).toHaveTextContent('Hello World');
    expect(input).toHaveValue('Hello World');
  });

  it('should toggle boolean state on button click', () => {
    const TestComponent = () => {
      const [isVisible, setIsVisible] = useState(false);
      
      return (
        <div>
          <button onClick={() => setIsVisible(!isVisible)}>Toggle</button>
          {isVisible && <p data-testid="message">Now you see me</p>}
        </div>
      );
    };
    
    render(<TestComponent />);
    
    // Initially not visible
    expect(screen.queryByTestId('message')).not.toBeInTheDocument();
    
    // Click to show
    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('message')).toBeInTheDocument();
    
    // Click to hide
    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.queryByTestId('message')).not.toBeInTheDocument();
  });

  it('should update object state correctly', () => {
    const TestComponent = () => {
      const [user, setUser] = useState({ name: '', age: 0 });
      
      return (
        <div>
          <input 
            placeholder="Name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input 
            placeholder="Age"
            type="number"
            onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
          />
          <p data-testid="user-info">{user.name} - {user.age}</p>
        </div>
      );
    };
    
    render(<TestComponent />);
    
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByPlaceholderText('Age'), { target: { value: '30' } });
    
    expect(screen.getByTestId('user-info')).toHaveTextContent('Alice - 30');
  });

  it('should update array state correctly', () => {
    const TestComponent = () => {
      const [items, setItems] = useState<string[]>([]);
      
      return (
        <div>
          <button onClick={() => setItems([...items, `Item ${items.length + 1}`])}>
            Add Item
          </button>
          <ul>
            {items.map((item, index) => (
              <li key={index} data-testid={`item-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      );
    };
    
    render(<TestComponent />);
    
    // Add first item
    fireEvent.click(screen.getByText('Add Item'));
    expect(screen.getByTestId('item-0')).toHaveTextContent('Item 1');
    
    // Add second item
    fireEvent.click(screen.getByText('Add Item'));
    expect(screen.getByTestId('item-1')).toHaveTextContent('Item 2');
  });

  it('should handle async state updates', async () => {
    const TestComponent = () => {
      const [data, setData] = useState('loading...');
      
      const fetchData = async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 100));
        setData('Data loaded');
      };
      
      return (
        <div>
          <button onClick={fetchData}>Fetch</button>
          <p data-testid="data">{data}</p>
        </div>
      );
    };
    
    render(<TestComponent />);
    
    expect(screen.getByTestId('data')).toHaveTextContent('loading...');
    
    fireEvent.click(screen.getByText('Fetch'));
    
    // Wait for async update
    await waitFor(() => {
      expect(screen.getByTestId('data')).toHaveTextContent('Data loaded');
    });
  });
});

// ============================================
// BONUS: COMBINED REAL-WORLD EXAMPLE
// ============================================
describe('Real-World Component Test Example', () => {
  it('should handle complete user interaction flow', async () => {
    const mockOnSubmit = vi.fn();
    
    const TestComponent = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
      const [formData, setFormData] = useState({ username: '', email: '' });
      const [submitted, setSubmitted] = useState(false);
      
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setSubmitted(true);
      };
      
      return (
        <div className={submitted ? 'form-submitted' : 'form-active'}>
          <h1>User Form</h1>
          <form onSubmit={handleSubmit}>
            <input
              data-testid="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Username"
            />
            <input
              data-testid="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email"
            />
            <button type="submit">Submit</button>
          </form>
          {submitted && <p data-testid="success">Form submitted successfully!</p>}
        </div>
      );
    };
    
    render(<TestComponent onSubmit={mockOnSubmit} />);
    
    // 1. Test rendered text
    expect(screen.getByText('User Form')).toBeInTheDocument();
    
    // 2. Test initial class
    expect(screen.getByText('User Form').closest('div')).toHaveClass('form-active');
    
    // 3. Test initial state
    expect(screen.queryByTestId('success')).not.toBeInTheDocument();
    
    // 4. Test state changes on input
    const usernameInput = screen.getByTestId('username');
    const emailInput = screen.getByTestId('email');
    
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    
    expect(usernameInput).toHaveValue('johndoe');
    expect(emailInput).toHaveValue('john@example.com');
    
    // 5. Test function call and state change on submit
    fireEvent.click(screen.getByText('Submit'));
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      username: 'johndoe',
      email: 'john@example.com'
    });
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    
    // 6. Test class change after submission
    expect(screen.getByText('User Form').closest('div')).toHaveClass('form-submitted');
    
    // 7. Test conditional rendering
    expect(screen.getByTestId('success')).toBeInTheDocument();
  });
});

export {};
