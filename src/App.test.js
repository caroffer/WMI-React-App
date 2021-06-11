import { render, screen } from "@testing-library/react";
import App from "./App";
import useAsync from "./hooks/useAsync";

jest.mock("./hooks/useAsync", () => ({
  __esModule: true,
  default: jest.fn(),
}));

beforeEach(() => {
  jest.resetAllMocks();
});

test("renders Loading", () => {
  useAsync.mockReturnValue({ isPending: true });
  render(<App />);
  const loadingElement = screen.getByText(/Loading/i);
  expect(loadingElement).toBeInTheDocument();
});

test("renders title", () => {
  useAsync.mockReturnValue({ isPending: false, result: [{ WMI: "foo" }] });
  render(<App />);
  const titleElement = screen.getByText(/WMI Data - Honda/i);
  expect(titleElement).toBeInTheDocument();
});

test("renders wmi data", () => {
  useAsync.mockReturnValue({
    isPending: false,
    result: [{ WMI: "foo", Country: "USA" }],
  });
  render(<App />);
  const linkElements = screen.getAllByText(/usa/i);
  expect(linkElements.length).toBe(1);
});

test("shows length > 0", () => {
  useAsync.mockReturnValue({ isPending: false, result: [{ WMI: "foo" }] });
  render(<App />);
  const linkElement = screen.getByText(/total:\s+[0-9]/i);
  expect(linkElement).toBeInTheDocument();
});
