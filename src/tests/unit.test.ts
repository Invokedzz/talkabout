import { loginGETmiddleware, registerGETmiddleware, homemiddleware, createtopicGETmiddleware, createcommentsGETmiddleware } from "../middlewares";

import { Request, Response } from "express";

import { createPool } from "../database";

describe("Verifying all the GET methods", (): void => {

    let Request: Partial <Request>;

    let Response: Partial <Response>;

    beforeEach((): void => {

        Request = {};

        Response = {

            render: jest.fn(),

        };

    });

    afterEach((): void => {

        jest.clearAllMocks();

    });

    it ("Should render the login page correctly", (): void => {

       loginGETmiddleware(Request as Request, Response as Response);

       expect(Response.render).toHaveBeenCalledWith("login");

    });

    it ("Should render the register page correctly", (): void => {

        registerGETmiddleware(Request as Request, Response as Response);

        expect(Response.render).toHaveBeenCalledWith("register");

    });

    it ("Should render the homepage correctly", (): void => {

        homemiddleware(Request as Request, Response as Response);

        expect(Response.render).toHaveBeenCalledWith("home");

    });

    it ("Should render the createtopic GET correctly", (): void => {

        createtopicGETmiddleware(Request as Request, Response as Response);

        expect(Response.render).toHaveBeenCalledWith("createtopic");

    });

});

describe("Rendering the comments page", (): void => {

    let Request: Partial <Request>;

    let Response: Partial <Response>;

    const queryMock = jest.fn();

    beforeEach((): void => {

        Request = {

            params: {

                topicid: "1",

            },

        };

        Response = {

            render: jest.fn(),

        };

        (createPool.query as jest.Mock) = queryMock;

    });

    afterEach((): void => {

        jest.clearAllMocks();

    });

    it ("Should return the id properly and render the page", (): void => {

        queryMock.mockResolvedValue([{comment: "test"}]);

        createcommentsGETmiddleware(Request as Request, Response as Response);

        expect(Response.render).toHaveBeenCalledWith("comments", {topicid: "1"});

    });

});