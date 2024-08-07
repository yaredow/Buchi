describe("Signin page", () => {
  it("should display validation errors when the fields are left empty", () => {
    cy.visit("http://localhost:3000/auth/signin");

    cy.contains("Submit");

    cy.get('[data-testid="Submit"]').click();
  });

  it("should redirect user to profile page if the login is successful", () => {
    cy.get('[data-testid="email"]').type("yaredyilma2023@gmail.com");
    cy.get('[data-testid="password"]').type("test@1234@");

    cy.get('[data-testid="Submit"]').click();

    cy.url().should("include", "/profile");
  });
});
