import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { goToPath, renderWithAuthProvider } from "../utils/tests";
import AppRouter from "../routes/AppRouter";

describe("When profile page is mounted", () => {
	describe("if user is unauthenticated", () => {
		it("must redirect to login", () => {
			goToPath("/");
			renderWithAuthProvider(<AppRouter />, {
				initialState: { user: null },
			});
			expect(screen.getByText(/login/i)).toBeInTheDocument();
		});
	});
});
