import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, global } from "vitest";
import ReviewsPage from "../ReviewsPage";

describe("ReviewsPage Component", () => {
  it("renders reviews page correctly", () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: 55,
              patient_firstname: "wael",
              patient_lastname: "alhasan",
              rating: 5,
              service_name: "Teeth Cleaning",
              comment: "danke schöne",
              created_at: "2026-03-10 13:28:51.386094",
            },
          ]),
      }),
    );

    render(
      <MemoryRouter initialEntries={["/reviews"]}>
        <Routes>
          <Route path="/reviews" element={<ReviewsPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText("Patient Reviews")).toBeInTheDocument();
    expect(screen.getByText("Service: Teeth Cleaning")).toBeInTheDocument();

    expect(screen.getByText("wael alhasan")).toBeInTheDocument();
    expect(screen.getByText("danke schöne")).toBeInTheDocument();
    expect(screen.getByText("5 ⭐")).toBeInTheDocument();
  });
});
