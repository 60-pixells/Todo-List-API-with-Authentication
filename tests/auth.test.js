import supertest from "supertest";
import { assert, expect } from "chai";

const request = supertest("http://localhost:3008");
const userName = "testUserName";
const password = "TestPass@123";
let userId;
let token;
let todoId;


describe("register", () => {
    describe("given valid username and password", () => {
        it("should register the user successfully", async () => {
            const response = await request.post("/register").send({
                userName,
                password
            });
            userId = response.body.userId;

            assert.equal(response.statusCode, 200);
            assert.equal(response.body.message, "User registered successfully");
        });
    });

    describe("given invalid username", () => {
        it("should return error with status code 500 and message 'Username should contain only alphabets'", async () => {
            const response = await request.post("/register").send({
                userName: `${userName}123`,
                password
            });

            assert.equal(response.statusCode, 500);
            assert.equal(response.body.error, "Username should contain only alphabets");
        });
    });

    describe("given invalid password", () => {
        it("should return error with status code 500 and message 'Password must be at least 8 characters long'", async () => {
            const response = await request.post("/register").send({
                userName: `new${userName}`,
                password: "notvalidpassword"
            });

            assert.equal(response.statusCode, 500);
            assert.equal(response.body.error, "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character");
        });
    });

    describe("given existing username", () => {
        it("should return error with status code 500 and message 'Username already exists'", async () => {
            const response = await request.post("/register").send({
                userName,
                password
            });

            assert.equal(response.statusCode, 500);
            assert.equal(response.body.error, "Username already exists");
        });
    });
});


describe("login", () => {
    describe("given valid username and password", () => {
        it("should register the user successfully", async () => {
            const response = await request.post("/login").send({
                userName,
                password
            });
            token = response.body.token;

            assert.equal(response.statusCode, 200);
            expect(response.body).to.have.property("token");
        });
    });

    describe("given invalid username", () => {
        it("should return error with status code 401 and message Invalid username or password", async () => {
            const response = await request.post("/login").send({
                userName: `${userName}123`,
                password
            });

            assert.equal(response.statusCode, 401);
            assert.equal(response.body.error, "Invalid username or password");
        });
    });

    describe("given invalid password", () => {
        it("should return error with status code 401 and message Invalid username or password", async () => {
            const response = await request.post("/login").send({
                userName,
                password: "notvalidpassword"
            });

            assert.equal(response.statusCode, 401);
            assert.equal(response.body.error, "Invalid username or password");
        });
    });
});


describe("addTodo", () => {
    describe("given valid user id, title, and description", () => {
        it("should add a new todo successfully", async () => {
            const response = await request.post("/todos").set('authorization', token).send({
                userId,
                title: "Test Todo Title",
                description: "Test todo desc"
            });
            todoId = response.body.newTodo._id; 
            assert.equal(response.statusCode, 200);
            expect(response.body).to.have.property("newTodo");
        });
    });

    describe("given invalid user id", () => {
        it("should return error with status code 500 and message 'Invalid user id'", async () => {
            const response = await request.post("/todos").set('authorization', token).send({
                userId: `${userId}not_valid`,
                title: "Test Todo Title",
                description: "Test todo desc"
            });

            assert.equal(response.statusCode, 500);
            assert.equal(response.body.error, "User does not exists");
        });
    });
    describe("if authorizaiton is not given", () => {
        it("should return error with status code 401 and message UnAuthorized", async () => {
            const response = await request.post("/todos").send({
                userId: `${userId}not_valid`,
                title: "Test Todo Title",
                description: "Test todo desc"
            });

            assert.equal(response.statusCode, 401);
            assert.equal(response.body.error, "UnAuthorized");
        });
    });
});


describe("getTodos", () => {
    describe("given valid user id", () => {
        it("should return the todos array with status code 200", async () => {
            const response = await request.get(`/todos/${userId}`).set('authorization', token)

            assert.equal(response.statusCode, 200);
            expect(response.body).to.have.property("todos");
        });
    });

    describe("given invalid user id", () => {
        it("should return error with status code 500 and message User does not exists", async () => {
            const response = await request.get(`/todos/${userId}invalid`).set('authorization', token)

            assert.equal(response.statusCode, 500);
            assert.equal(response.body.error, "User does not exists");
        });
    });
    describe("if authorizaiton is not given", () => {
        it("should return error with status code 401 and message UnAuthorized", async () => {
            const response = await request.get(`/todos/${userId}`).send({
                userId: `${userId}not_valid`,
            });

            assert.equal(response.statusCode, 401);
            assert.equal(response.body.error, "UnAuthorized");
        });
    });
});

describe("update Todos", () => {
    describe("given valid user id, title, and description", () => {
        it("should update a new todo successfully", async () => {
           
            const response = await request.put("/todos").set('authorization', token).send({
                userId,
                todoId,
                title: "updated Todo Title",
                description: "updated todo desc"
            });

            assert.equal(response.statusCode, 200);
            assert.equal(response.body.message, "Updated the todo successfully")
        });
    });

    describe("given invalid user id", () => {
        it("should return error with status code 500 and message 'Invalid user id'", async () => {
            const response = await request.put("/todos").set('authorization', token).send({
                userId: `${userId}not_valid`,
                todoId,
                title: "Test Todo Title",
                description: "Test todo desc"
            });

            assert.equal(response.statusCode, 500);
            assert.equal(response.body.error, "User does not exists");
        });
    });
    describe("if authorizaiton is not given", () => {
        it("should return error with status code 401 and message UnAuthorized", async () => {
            const response = await request.put("/todos").send({
                userId: `${userId}not_valid`,
                todoId,
                title: "Test Todo Title",
                description: "Test todo desc"
            });

            assert.equal(response.statusCode, 401);
            assert.equal(response.body.error, "UnAuthorized");
        });
    });
});


describe("delete Todos", () => {
    describe("given valid user id", () => {
        it("should return the status code 200 with message ", async () => {
            const response = await request.delete("/todos").set('authorization', token).send({
                userId,
                todoId
            });

            assert.equal(response.statusCode, 200);
            assert.equal(response.body.message, "Deleted the todo successfully");
        });
    });

    describe("given invalid user id", () => {
        it("should return error with status code 500 and message User does not exists", async () => {
            const response = await request.delete("/todos").set('authorization', token).send({
                userId: `${userId}not_valid`,
                todoId,
            });

            assert.equal(response.statusCode, 500);
            assert.equal(response.body.error, "User does not exists");
        });
    });
    describe("given invalid todo id", () => {
        it("should return error with status code 500 and Todo id is required", async () => {
            const response = await request.delete("/todos").set('authorization', token).send({
                userId
            });

            assert.equal(response.statusCode, 500);
            assert.equal(response.body.error, "Todo id is required");
        });
    });
    describe("if authorizaiton is not given", () => {
        it("should return error with status code 401 and message UnAuthorized", async () => {
            const response = await request.delete("/todos").send({
                userId: `${userId}not_valid`,
            });

            assert.equal(response.statusCode, 401);
            assert.equal(response.body.error, "UnAuthorized");
        });
    });
    describe("Delete the user document completely", () => {
        it("should return 200 with message Deleted the user successfully", async () => {
            const response = await request.delete("/todos/user").set('authorization', token).send({
                userId,
            });

            assert.equal(response.statusCode, 200);
            assert.equal(response.body.message, "Deleted the user successfully");
        });
    });
});