const { test, expect } = require("@playwright/test");
const { Ajv } = require("ajv");
const { log, error } = require("console");

const ajv = new Ajv();

test("Tugas GET", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/2");
  const responseData = await response.json();
  const valid = ajv.validate(
    require("./json-schema/get-singleObject-schema.json"),
    responseData
  );

  //assertion
  expect(response.status()).toBe(200);
  expect(responseData.data.email).toBe("janet.weaver@reqres.in");
  expect(valid).toBe(true);

  if (!valid) {
    console.error("AJV validation Errors: ", ajv.errorsText());
  }
});

test("Tugas POST", async ({ request }) => {
  const bodyData = {
    name: "morpheus",
    job: "leader",
  };

  const headerData = {
    Accept: "application/json",
  };

  const response = await request.post("https://reqres.in/api/users", {
    headers: headerData,
    data: bodyData,
  });
  const responseData = await response.json();
  const valid = ajv.validate(
    require("./json-schema/post-createUser-schema.json"),
    responseData
  );

  //assertion
  expect(response.status()).toBe(201);
  expect(responseData).toHaveProperty("id");
  expect(valid).toBe(true);

  if (!valid) {
    console.error("AJV validation Errors: ", ajv.errorsText());
  }
});

test("Tugas DELETE", async ({ request }) => {
  const response = await request.delete("https://reqres.in/api/users/2");

  //assertion
  expect(response.status()).toBe(204);
});

test("Tugas PUT", async ({ request }) => {
  const bodyData = {
    name: "morpheus",
    job: "zion resident",
  };

  const headerData = {
    Accept: "application/json",
  };

  const response = await request.put("https://reqres.in/api/users/2", {
    headers: headerData,
    data: bodyData,
  });
  const responseData = await response.json();
  const valid = ajv.validate(
    require("./json-schema/put-update-schema.json"),
    responseData
  );

  //assertion
  expect(response.status()).toBe(200);
  expect(responseData.job).toBe("zion resident");
  expect(valid).toBe(true);

  if (!valid) {
    console.error("AJV validation Errors: ", ajv.errorsText());
  }
});
