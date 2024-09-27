import { loginGETmiddleware, registerGETmiddleware, homemiddleware, createtopicGETmiddleware, createcommentsGETmiddleware } from "../middlewares";

import { Request, Response } from "express";

import { createPool } from "../database";

describe("Verifying the login method", (): void => {

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

});