const { example, exampleRole, rawToUi } = require("../roles");

describe("Roles model", () => {
  test("Shows 'Present' when endDate is null", () => {
    const raw = example({
      roles: [
        exampleRole({
          employers: [
            {
              endDate: null
            }
          ]
        })
      ]
    });
    const ui = rawToUi(raw);

    expect(ui).toMatchObject([
      {
        employers: [
          {
            endDate: "Present"
          }
        ]
      }
    ]);
  });

  test("Shows start and end date formatted correctly", () => {
    const raw = example({
      roles: [
        exampleRole({
          employers: [
            {
              startDate: "2017-08-08",
              endDate: "2019-08-08"
            }
          ]
        })
      ]
    });

    const ui = rawToUi(raw);

    expect(ui).toMatchObject([
      {
        employers: [
          {
            startDate: "Aug 8 2017",
            endDate: "Aug 8 2019"
          }
        ]
      }
    ]);
  });
});
