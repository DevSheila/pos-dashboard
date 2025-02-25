import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "@/components/ThemeToggle";
import { ThemeContext } from "@/context/ThemeContext";

describe("ThemeToggle Component", () => {
  it("renders the button with the correct initial theme icon", () => {
    const mockToggleTheme = vi.fn();

    render(
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: mockToggleTheme }}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    const button = screen.getByRole("button", { name: /toggle theme/i });

    expect(button).toBeInTheDocument();
    expect(button.innerHTML.toLowerCase()).toContain("moon"); // Should show Moon icon in light mode
  });

  it("toggles theme when clicked", async () => {
    const mockToggleTheme = vi.fn();
    const user = userEvent.setup();

    render(
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: mockToggleTheme }}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    const button = screen.getByRole("button", { name: /toggle theme/i });

    await user.click(button);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it("renders the correct icon based on theme", () => {
    const mockToggleTheme = vi.fn();

    const { rerender } = render(
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: mockToggleTheme }}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    expect(screen.getByRole("button").innerHTML.toLowerCase()).toContain("moon"); // Light mode shows moon

    rerender(
      <ThemeContext.Provider value={{ theme: "dark", toggleTheme: mockToggleTheme }}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    expect(screen.getByRole("button").innerHTML.toLowerCase()).toContain("sun"); // Dark mode shows sun
  });
});
