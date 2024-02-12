import LoginPage from "../../pages/loginPages";
import HomePage from "../../pages/homePage";

describe("User can visit to GoIT page", () => {
  it("succesfully navigates to the GoIT page", () => {
    cy.visit("https://www.edu.goit.global/account/login");

    cy.wait(5000);
    cy.url().should("include", "account/login");

    cy.visit("https://www.edu.goit.global/account/login");
  });
});

describe("User can login to GoIT page", () => {
  beforeEach("go to page", () => {
    cy.visit("https://www.edu.goit.global/account/login");
  });

  it("succesfully navigates to the GoIT page", () => {
    cy.wait(5000);
    cy.url().should("include", "account/login");
  });

  it("successfully login to the GoIT page", () => {
    cy.loginUser("user888@gmail.com", "1234567890");

    cy.url().should("include", "homepage");
    cy.get(".next-1n2ne4o").should(
      "have.text",
      "Study without interruption and get achievements. You can do it!"
    );
  });
});

describe("Check Login", () => {
  beforeEach("go to page", () => {
    cy.visit("/");
  });

  it.only("succesfully login user 1 to the GoIT page", () => {
    cy.fixture("user1.json").then((user) => {
      const useremail = user.email;
      const password = user.password;

      cy.loginUser(useremail, password);

      cy.url().should("include", "homepage");
      cy.get('[id="go-to-the-course-homepage-widget"]')
        .scrollIntoView()
        .should("be.visible");
    });
  });

  it("succesfully login user 2 to the GoIT page", () => {
    cy.fixture("user2.json").then((user) => {
      //arrange
      const useremail = user.email;
      const password = user.password;

      //action
      cy.loginUser(useremail, password);

      //assert
      cy.url().should("include", "homepage");
    });
  });

  it("unsuccesfully login user 3 to the GoIT page", () => {
    cy.fixture("user3.json").then((user) => {
      const useremail = user.email;
      const password = user.password;

      cy.loginUser(useremail, password);

      cy.get(".login_error_toast").should(
        "have.text",
        "An incorrect username or password has been submitted"
      );
    });
  });
});

const loginPage = new LoginPage();
const homepage = new HomePage();

describe("Check Login", () => {
  beforeEach("go to page", () => {
    cy.visit("/");
  });

  it("succesfully login user 1 to the GoIT page", () => {
    cy.fixture("user1.json").then((user) => {
      const useremail = user.email;
      const password = user.password;

      loginPage.loginUser(useremail, password);

      cy.get('[id="go-to-the-course-homepage-widget"]')
        .scrollIntoView()
        .should("be.visible");
    });
  });
});

describe.only("user visit all tabls", () => {
  before("go to page and login", () => {
    cy.visit("/");
    cy.fixture("user1.json").then((user) => {
      const useremail = user.email;
      const password = user.password;

      loginPage.loginUser(useremail, password);
    });
  });

  it("user sucessfully visit all tabs", () => {
    homepage.selectMenuElement("Courses");
    cy.wait(2000);
    homepage.selectMenuElement("Duels");
    cy.wait(2000);
    homepage.selectMenuElement("Tournament");
    cy.wait(2000);
    homepage.selectMenuElement("Consultation");
    cy.wait(2000);
  });

  after(() => {
    homepage.menuComponent.logout();
    cy.wait(5000);
  });
});
