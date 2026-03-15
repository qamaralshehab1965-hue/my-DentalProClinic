import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi, global } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "../Register";

describe("Register Component ", () => {
  it("Register a new user", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            message: "Registered successfully",
          }),
      }),
    );

    render(
      <MemoryRouter initialEntries={["/register"]}>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "Ali" },
    });

    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Ahmad" },
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "AliD@gmail.com" },
    });

    fireEvent.change(screen.getByLabelText("Phone"), {
      target: { value: "123456" },
    });

    fireEvent.change(screen.getByLabelText("Address"), {
      target: { value: "Berlin" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("Register"));

    expect(
      await screen.findByText("Registered successfully"),
    ).toBeInTheDocument();
  });
});
