import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, global } from "vitest";
import Services from "../Services";

describe("Services Component", () => {
  it("renders services page correctly", () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "Mocked fetch" }),
      }),
    );

    render(
      <MemoryRouter initialEntries={["/services"]}>
        <Routes>
          <Route path="/services" element={<Services />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Service Name")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });
});
