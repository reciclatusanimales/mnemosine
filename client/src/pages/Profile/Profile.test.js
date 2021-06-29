import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { goToPath, renderWithAuthProvider } from "../../utils/tests";
import AppRouter from "../../routes/AppRouter";

const initialState = {
	user: {
		user: {
			id: "3cdd3924-eace-bb0c-13d8-7c2c862e6d1e",
			username: "tuto",
			email: "tuto@gmail.com",
			imageUrl:
				"http://localhost:5000/uploads/profile_photos/photo_3cdd3924-eace-bb0c-13d8-7c2c862e6d1e.jpg",
			accountType: "email",
		},
		config: { avatarColor: "light" },
	},
};

describe("When profile page is mounted", () => {
	it("must display the profile page", () => {
		goToPath("/profile");
		renderWithAuthProvider(<AppRouter />, { initialState });
		console.log(screen.debug());
		expect(screen.getByText(/profile/i)).toBeInTheDocument();
	});
});
