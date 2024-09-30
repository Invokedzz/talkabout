import { loginGETmiddleware, registerGETmiddleware, homemiddleware, createtopicGETmiddleware, createcommentsGETmiddleware, deletecommentPOSTmiddleware, deletetopicmiddleware, viewtopicsmiddleware, createtopicPOSTmiddleware, registerPOSTmiddleware, createcommentsPOSTmiddleware, viewcommentsmiddlewares, deletecommentmiddleware, profilemiddleware } from "../middlewares";


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

describe("Test for delete comment", (): void => {

    let Request: Partial <Request>;

    let Response: Partial <Response>;

    const mockQuery = jest.fn();

    beforeEach((): void => {

        Request = {

            body: {

                id: "1",

            },

        };

        Response = {

            redirect: jest.fn(),

        };

    });

    afterEach((): void => {

        jest.clearAllMocks();

    });

    (createPool.query as jest.Mock) = mockQuery;

    it ("Should delete the comment successfully", async (): Promise <void> => {
        
        await deletecommentPOSTmiddleware(Request as Request, Response as Response);

        expect(Response.redirect).toHaveBeenCalledWith("/home");

    });

});

describe("Testing the delete topic method", (): void => {

    let Request: Partial <Request>;

    let Response: Partial <Response>;

    const mockQuery = jest.fn();

    beforeEach((): void => {

        Request = {

            params: {

                id: "10",

            },

        };

        Response = {

            redirect: jest.fn(),

        };

        (createPool.query as jest.Mock) = mockQuery;

    });

    afterEach((): void => {

        jest.clearAllMocks();

    });

    it ("Should delete something successfully", async (): Promise <void> => {

        mockQuery.mockResolvedValue(null);

        await deletetopicmiddleware(Request as Request, Response as Response);

        expect(mockQuery).toHaveBeenCalledWith('DELETE FROM topics WHERE id = ?', ["10"]);

        expect(Response.redirect).toHaveBeenCalledWith("/viewtopics");

    });

});

describe("Test for creating topics", (): void => {

    let Request: Partial <Request>;

    let Response: Partial <Response>;

    const mockQuery = jest.fn();

    beforeEach((): void => {

        Request = {};

        Response = {

            render: jest.fn(),

        };

        (createPool.query as jest.Mock) = mockQuery;

    });

    afterEach((): void => {

        jest.clearAllMocks();

    });

    it ("Should view a topic", async (): Promise <void> => {

        const mockTests = [{title: "testing", theme: "testing", text: "testing"}];

        mockQuery.mockResolvedValueOnce([mockTests]);

        await viewtopicsmiddleware(Request as Request, Response as Response);

        expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM topics');

        expect(Response.render).toHaveBeenCalledWith("viewtopics", { topics: mockTests });

    });

});

describe("Testing topic post", (): void => {

    let Request: Partial <Request>;

    let Response: Partial <Response>

    const mockQuery = jest.fn();

    beforeEach((): void => {

        Request = {

            body: {
            
                title: "testing",

                theme: "testing",

                text: "testing",
            
            },

        };

        Response = {

            render: jest.fn(),

        };

        (createPool.query as jest.Mock) = mockQuery;

    });

    afterEach((): void => {

        jest.clearAllMocks();

    });

    it ("Should return the values successfully", async (): Promise <void> => {

        const testMocks = [{title: "testing", theme: "testing", text: "testing"}];

        mockQuery.mockResolvedValue(testMocks);

        await createtopicPOSTmiddleware(Request as Request, Response as Response);

        expect(mockQuery).toHaveBeenCalledWith('INSERT INTO topics (title, theme, text) VALUES (?, ?, ?)', ["testing", "testing", "testing"]);

        expect(Response.render).toHaveBeenCalledWith("receivetopics", { title: "testing" });

    });

});


describe("Create topic post middleware", (): void => {

    let Request: Partial <Request>;

    let Response: Partial <Response>;

    const mockQuery = jest.fn();

    beforeEach((): void => {

        Request = {

            body: {
            
                comment: "testing",

            },

            params: {

                topicid: "1",

            },

        };

        Response = {

            render: jest.fn(),

        };

        (createPool.query as jest.Mock) = mockQuery;

    });

    afterEach((): void => {

        jest.clearAllMocks();

    });

    it ("Should return the values successfully", async (): Promise <void> => {

        await createcommentsPOSTmiddleware(Request as Request, Response as Response);
        
        expect(createPool.query).toHaveBeenCalledWith(
                'INSERT INTO comment (comments, topic_id) VALUES (?, ?)',
                ['testing', 1] 
        );

        expect(Response.render).toHaveBeenCalledWith('successcomments', { comment: 'testing', topicid: 1 });

        });
        

    });

describe ("Should handle view comments middleware properly", (): void => {

    let Request: Partial <Request>;

    let Response: Partial <Response>;

    const mockQuery = jest.fn();

    beforeEach((): void => {

        Request = {

            params: {

                topicid: "1",

            },

        };

        Response = {

            render: jest.fn(),

        };

        (createPool.query as jest.Mock) = mockQuery;

    });

    afterEach((): void => {

        jest.clearAllMocks();

    });

    it ("Should access the database successfully", async (): Promise <void> => {

        const rows = [{title: "testing", theme: "testing", text: "testing"}];

        mockQuery.mockResolvedValue([rows]),

        await viewcommentsmiddlewares(Request as Request, Response as Response);

        expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM comment JOIN topics ON comment.topic_id = topics.id WHERE topics.id = ?', [1]);

        expect(Response.render).toHaveBeenCalledWith('viewcomments', { rows });

    });

});

describe ("Delete comment middleware test", (): void => {

    let Request: Partial <Request>;

    let Response: Partial <Response>;

    const mockQuery = jest.fn();

    beforeEach((): void => {

        Request = {};

        Response = {

            render: jest.fn(),

        };

    });

    afterEach((): void => {

        jest.clearAllMocks();

    });

    it ("Should select elements properly", async (): Promise <void> => {

        const gatherid = [{title: "testing", theme: "testing", text: "testing"}];

        mockQuery.mockResolvedValue([gatherid]),

        await deletecommentmiddleware(Request as Request, Response as Response);

        expect(createPool.query).toHaveBeenCalledWith('SELECT * FROM comment');

        expect(Response.render).toHaveBeenCalledWith('delete', { gatherid: gatherid });

    });

});

describe ("Testing the user profile middleware", (): void => {

    let Request: Partial <Request>;

    let Response: Partial <Response>;

    const mockQuery = jest.fn();

    beforeEach((): void => {

        Request = {};

        Response = {

            render: jest.fn(),

        };

    });

    afterEach((): void => {

        jest.clearAllMocks();

    });

    (createPool.query as jest.Mock) = mockQuery;

    it ("Should return success properly", async (): Promise <void> => {

        const [user] = [{text: "testing", theme: "testing", title: "testing"}];

        mockQuery.mockResolvedValue(user),

        await profilemiddleware(Request as Request, Response as Response);

        expect(Response.render).toHaveBeenCalledWith('profile', { user: user });

    });

});