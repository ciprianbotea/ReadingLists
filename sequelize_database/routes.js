import { router } from "../server.js";
import "./sync.js";
import { operationsAPI as operationsAPI } from "./operations.js";


//Get all books
router.route("/sequelize/get-books")
    .get(async function getBooks(_, response) {
        const result = await operationsAPI.getBooks();
        if (result.length == 0) {
            response.status(500).json("There is no book in the database!");
        }
        else response.status(200).json(result);
});

//Get all authors
router.route("/sequelize/get-authors")
    .get(async function getAuthors(_, response) {
        const result = await operationsAPI.getAuthors();
        if (result.length == 0) {
            response.status(500).json("There is no author in the database!");
        }
        else response.status(200).json(result);
});

//Get all publishers
router.route("/sequelize/get-publishers")
    .get(async function getPublishers(_, response) {
        const result = await operationsAPI.getPublishers();
        if (result.length == 0) {
            response.status(500).json("There is no publisher in the database!");
        }
        else response.status(200).json(result);
});

//Get book by id
router.route("/sequelize/get-book-by-id/:id")
    .get(async function getBookById(request, response) {
        const bookId = +request.params.id;
        operationsAPI.validateId(bookId, response, async function handleSuccessfulValidation() {
            const result = await operationsAPI.getBookById(bookId);
            if (result == null) response.status(500).json(`There is no book with the ID ${bookId} in the database!`);
            else response.status(200).json(result);
        })
});

//Get author by id
router.route("/sequelize/get-author-by-id/:id")
    .get(async function getAuthorById(request, response) {
        const authorId = +request.params.id;
        operationsAPI.validateId(authorId, response, async function handleSuccessfulValidation() {
            const result = await operationsAPI.getAuthorById(authorId);
            if (result == null) response.status(500).json(`There is no author with the ID ${authorId} in the database!`);
            else response.status(200).json(result);
        })
});

//Get publisher by id
router.route("/sequelize/get-publisher-by-id/:id")
    .get(async function getPublisherById(request, response) {
        const publisherId = +request.params.id;
        operationsAPI.validateId(publisherId, response, async function handleSuccessfulValidation() {
            const result = await operationsAPI.getPublisherById(publisherId);
            if (result == null) response.status(500).json(`There is no publisher with the ID ${publisherId} in the database!`);
            else response.status(200).json(result);
        })
});

//Get book by title
router.route("/sequelize/get-books-by-title/:title")
    .get(async function getBooksByTitle(request, response) {
        const title = request.params.title;
        const result = await operationsAPI.getBooksByTitle(title);
        if (result.length == 0) response.status(500).json(`There is no book with the title ${title} in the database!`);
        else response.status(200).json(result);
});

//GET - Books by title
router.route("/sequelize/get-books-by-domain/:domain")
    .get(async function getBooksByDomanin(request, response) {
        const bookDomain = request.params.domain;
        operationsAPI.validateString(bookDomain, response, async function handleSuccessfulValidation() {
            const result = await operationsAPI.getBookByDomanin(bookDomain);
            if (result.length == 0) response.status(500).json(`There is no book which belongs to ${bookDomain} domain in the database!`);
            else response.status(200).json(result);
        })
});

//GET - Authors by nationality
router.route("/sequelize/get-authors-by-nationality/:nationality")
    .get(async function getAuthorsByNationality(request, response) {
        const authorNationality = request.params.nationality;
        operationsAPI.validateString(authorNationality, response, async function handleSuccessfulValidation() {
            const result = await operationsAPI.getAuthorsByNationality(authorNationality);
            if (result.length == 0) response.status(500).json(`There is no ${authorNationality} author in the database!`);
            else response.status(200).json(result);
        })
});

//Get publisher by country
router.route("/sequelize/get-publishers-by-country/:country")
    .get(async function getPublishersbyCountry(request, response) {
        const publisherCountry = request.params.country;
        operationsAPI.validateString(publisherCountry, response, async function handleSuccessfulValidation() {
            const result = await operationsAPI.getPublishersbyCountry(publisherCountry);
            if (result.length == 0) response.status(500).json(`There is no publisher from ${publisherCountry} in the database!`);
            else response.status(200).json(result);
        })
});

//Get books by publication year
router.route("/sequelize/get-books-by-year/:publicationYear")
    .get(async function getBooksByYear(request, response) {
        const publicationYear = +request.params.publicationYear;
        operationsAPI.validateNumber(publicationYear, response, async function handleSuccessfulValidation() {
            const result = await operationsAPI.getBooksByYear(publicationYear);
            if (result.length == 0) response.status(500).json(`There is no book published in ${publicationYear} in the database!`);
            else response.status(200).json(result);
        })
});

//Get books by author id
router.route("/sequelize/get-books-by-author-id/:authorId")
    .get(async function getBooksByAuthorId(request, response) {
        const authorId = +request.params.authorId;
        operationsAPI.validateId(authorId, response, async function handleSuccessfulValidation() {
            const result = await operationsAPI.getBooksByAuthorId(authorId);
            if (result.length == 0) response.status(500).json(`There is no book of the author with the ID ${authorId}`);
            else response.status(200).json(result);
        })
});

//Get books by publisher id
router.route("/sequelize/get-books-by-publisher-id/:publisherId")
    .get(async function getBooksByPublisherId(request, response) {
        const publisherId = +request.params.publisherId;
        operationsAPI.validateId(publisherId, response, async function handleSuccessfulValidation() {
            const result = await operationsAPI.getBooksByPublisherId(publisherId);
            if (result.length == 0) response.status(500).json(`There is no book of the publisher with the ID ${publisherId}`);
            else response.status(200).json(result);
        })
});

//Create book
router.route("/sequelize/create-book")
    .post(async function createBook({ body }, response) {
        try {
            operationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                if (Object.keys(body).length < 1) {
                    response.status(500).json("The format is incorrect!");

                }
                else {
                    await operationsAPI.createBook(body);
                    response.status(200).json("The book was created!");
                }
            });
        } catch (err) {
            console.error(`There was an error while calling API: ${err}`);
        }
});

//Create author
router.route("/sequelize/create-author")
    .post(async function createAuthor({ body }, response) {
        try {
            operationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                if (Object.keys(body).length < 1) {
                    response.status(500).json("The format is incorrect!");
                }
                else {
                    await operationsAPI.createAuthor(body);
                    response.status(200).json("The author was created!");
                }
            });
        } catch (err) {
            console.error(`There was an error while calling API: ${err}`);
        }
});

//Create publisher
router.route("/sequelize/create-publisher")
.post(async function createPublisher({ body }, response) {
    try {
        operationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
            if (Object.keys(body).length < 2) {
                response.status(500).json("The format is incorrect!");
            }
            else {
                await operationsAPI.createPublisher(body);
                response.status(200).json("The publisher was created!");
            }
        });
    } catch (err) {
        console.error(`There was an error while calling API: ${err}`);
    }
});

//Update book
router.route("/sequelize/update-book/:id")
    .put(async function updateBook({ params: { id }, body }, response) {
        try {
            const record = await operationsAPI.getBookById(+id);
            if (record == null)
                response.status(200).json("The book does not exist!");
            else {
                operationsAPI.validateId(+id, response, async function handleSuccessfulValidation() {
                    operationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                        await operationsAPI.updateBook(+id, body);
                        response.status(200).json("The book was updated");
                    });
                });
            }

        } catch (err) {
            console.error(`There was an error while calling API :${err}`);
        }
});

//Update author
router.route("/sequelize/update-author/:id")
    .put(async function updateAuthor({ params: { id }, body }, response) {
        try {
            const record = await operationsAPI.getAuthorById(+id);
            if (record == null)
                response.status(500).json("The author does not exist!");
            else {
                operationsAPI.validateId(+id, response, async function handleSuccessfulValidation() {
                    operationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                        await operationsAPI.updateAuthor(+id, body);
                        response.status(200).json("The author was updated");
                    });
                });
            }
        } catch (err) {
            console.error(`There was an error while calling API :${err}`);
        }
});

//Update publisher
router.route("/sequelize/update-publisher/:id")
    .put(async function updatePublisher({ params: { id }, body }, response) {
        try {
            const record = await operationsAPI.getPublisherById(+id);
            if (record == null)
                response.status(500).json("The publisher does not exist!");
            else {
                operationsAPI.validateId(+id, response, async function handleSuccessfulValidation() {
                    operationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                        await operationsAPI.updatePublisher(+id, body);
                        response.status(200).json("The publisher was updated");
                    });
                });
            }
        } catch (err) {
            console.error(`There was an error while calling API :${err}`);
        }
});

//Delete book
router.route("/sequelize/delete-book/:id")
    .delete(async function deleteBook({ params: { id } }, response) {
        try {
            const record = await operationsAPI.getBookById(+id);
            if (record == null)
                response.status(200).json("The book does not exist!");
            else {
                operationsAPI.validateId(+id, response, async function handleSuccessfulValidation() {
                    await operationsAPI.deleteBook(+id);
                    response.status(200).json("The book was deleted!");
                });
            }
        } catch (err) {
            console.error(`There was an error while calling API :${err}`);
        }
    });

//Delete author
router.route("/sequelize/delete-author/:id")
    .delete(async function deleteAuthor({ params: { id } }, response) {
        try {
            const record = await operationsAPI.getAuthorById(+id);
            if (record == null)
                response.status(500).json("The author does not exist!");
            else {
                operationsAPI.validateId(+id, response, async function handleSuccessfulValidation() {
                    await operationsAPI.deleteAuthor(+id);
                    response.status(200).json("The author was deleted!");
                });
            }
        } catch (err) {
            console.error(`There was an error while calling API :${err}`);
        }
});

//Delete publisher
router.route("/sequelize/delete-publisher/:id")
    .delete(async function deletePublisher({ params: { id } }, response) {
        try {
            const record = await operationsAPI.getPublisherById(+id);
            if (record == null)
                response.status(500).json("The publisher does not exist!");
            else {
                operationsAPI.validateId(+id, response, async function handleSuccessfulValidation() {
                    await operationsAPI.deletePublisher(+id);
                    response.status(200).json("The publisher was deleted!");
                });
            }
        } catch (err) {
            console.error(`There was an error while calling API :${err}`);
        }
});