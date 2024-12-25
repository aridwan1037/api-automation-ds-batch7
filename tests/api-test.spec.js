const { test, expect } = require("@playwright/test");
const { Ajv } = require("ajv");
const { log, error } = require("console");

const ajv = new Ajv()

test("Test Case 1", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/2");
  const responseData = await response.json()

  //assertion
  expect(response.status()).toBe(200)
  expect(responseData.data.email).toBe("janet.weaver@reqres.in")
  
  const valid = ajv.validate(require('./json-schema/get-singleObject-schema.json'), responseData)

  if(!valid){
    console.error("AJV validation Errors: ",ajv.errorsText())
  }
  expect(valid).toBe(true)
});

// test("Test Case 2", async ({ request }) => {
//   const bodyData = {
//     name: "Apple MacBook Pro 16",
//     data: {
//       year: 2019,
//       price: 1849.99,
//       "CPU model": "Intel Core i9",
//       "Hard disk size": "1 TB",
//     },
//   };

//   const headerData = {
//     Accept: "application/json",
//   };

//   const response = await request.post("https://api.restful-api.dev/objects", {
//     headers: headerData,
//     data: bodyData,
//   });

//   console.log(response.status());
//   console.log(await response.json());
// });


/*
test.describe("Positif Test Cases", () => {
  //bisa juga dituliskan seperti dibawah tanpa async {}
  test("Test Case 2", () => {
    console.log("Dieksekusi dari positif 2");
  });
});

test.describe("Negative Test Cases", () => {
  test("Test Case 3", async ({}) => {
    console.log("Dieksekusi dari negatif 1");
  });
  test("Test Case 4", async ({}) => {
    console.log("Dieksekusi dari negatif 1");
  });
  test("Test Case 5", async ({}) => {
    console.log("Dieksekusi dari negatif 1");
  });
});
*/