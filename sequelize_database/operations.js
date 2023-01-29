import { Book, Author, Publisher } from "./sync.js";
import seq from "sequelize";


async function sequelizeAuth(sequelizeConnection) {
    try {
        await sequelizeConnection.authenticate()
        console.log("Sequelize has successfully connected to the database!");
    }
    catch (err) {
        console.error(`There was an error connecting to the database: ${err}`);
    }
}

async function sequelizeSync(sequelizeConnection) {
    try {
        await sequelizeConnection.sync({ force: false, alter: true });
        console.log("Synchronization completed!");
    }
    catch (err) {
        console.error(`Synchronization failed : ${err}`);
    }
}

async function sequelizeInit(sequelizeConnection) {
    await sequelizeAuth(sequelizeConnection);
    await sequelizeSync(sequelizeConnection);
}

function validateId(sentId, response, callbackFn = function () { }) {
    if (Number.isFinite(sentId) && sentId > 0) return callbackFn();
    else response.status(500).json("Invalid id!");
}

function validateString(sentString, response, callbackFn = function () { }) {
    if (/^[a-zA-Z() ]+$/.test(sentString)) return callbackFn();
    else response.status(500).json("Invalid string!");
}

function validateNumber(sentNumber, response, callbackFn = function () { }) {
    if (Number.isFinite(sentNumber)) return callbackFn();
    else response.status(500).json("Invalid number!");
}

function validateBody(sentBody, response, callbackFn = function () { }) {
    if (Object.keys(sentBody).length != 0) return callbackFn();
    else response.status(500).json("Body is missing!");
}

async function execAsyncRequest(asyncRequest) {
    try {
        return await asyncRequest();
    } catch (err) {
        throw err;
    }
}

async function getAllBooks() {
    return await execAsyncRequest(async function retrievedBook() {
        return await Book.findAll();
    })
}

async function getAllAuthors() {
    return await execAsyncRequest(async function retrievedAuthor() {
        return await Author.findAll();
    })
}

async function getAllPublishers() {
    return await execAsyncRequest(async function retrievedPublisher() {
        return await Publisher.findAll();
    })
}

async function getBookById(id) {
    return await execAsyncRequest(async function retrievedBook() {
        return Book.findByPk(id);
    });
}

async function getAuthorById(id) {
    return await execAsyncRequest(async function retreivedAuthor() {
        return Author.findByPk(id);
    });
}

async function getPublisherById(id) {
    return await execAsyncRequest(async function retrievedPublisher() {
        return Publisher.findByPk(id);
    });
}

async function getBooksByTitle(title) {
    return await execAsyncRequest(async function retreivedBook() {
        return Book.findAll({ where: { title: { [seq.Op.substring]: title } } });
    })
}

async function getBookByDomanin(domain) {
    return await execAsyncRequest(async function retreivedBook() {
        return Book.findAll({ where: { domain: { [seq.Op.substring]: domain } } });
    })
}

async function getAuthorsByNationality(nationality) {
    return await execAsyncRequest(async function retreivedAuthor() {
        return Author.findAll({ where: { nationality: { [seq.Op.substring]: nationality } } });
    })
}

async function getPublishersbyCountry(country) {
    return await execAsyncRequest(async function retreivedPublisher() {
        return Publisher.findAll({ where: { country: { [seq.Op.substring]: country } } });
    })
}

async function getBooksByYear(publicationYear) {
    return await execAsyncRequest(async function retrievedBook() {
        return Book.findAll({ where: { publicationYear: publicationYear } });
    });
}

async function getBooksByAuthorId(id) {
    return await execAsyncRequest(async function retreivedBook() {
        return Book.findAll({ where: { authorId: id } });
    });
}

async function getBooksByPublisherId(id) {
    return await execAsyncRequest(async function retreivedBook() {
        return Book.findAll({ where: { publisherId: id } });
    });
}

async function createBook(book) {
    await execAsyncRequest(async function createBook() {
        await Book.create({
            title: book.title,
            authorId: book.authorId,
            authorName: book.authorName,
            publisherId: book.publisherId,
            publisherName: book.publisherName,
            publicationYear: book.publicationYear,
            language: book.language,
            domain: book.domain,
            pages: book.pages,
            isbnCode: book.isbnCode
        });
    });
}

async function createAuthor(author) {
    await execAsyncRequest(async function createAuthor() {
        await Author.create({
            authorName: author.authorName,
            nationality: author.nationality
        });

    });
}

async function createPublisher(publisher) {
    await execAsyncRequest(async function createPublisher() {
        await Publisher.create({
            publisherName: publisher.publisherName,
            country: publisher.country
        });

    });
}

async function updateBook(id, book) {
    await execAsyncRequest(async function updateBook() {
        const record = await Book.findByPk(id);
        if (record) {
            await record.update({
                title: book.title,
                authorId: book.authorId,
                authorName: book.authorName,
                publisherId: book.publisherId,
                publisherName: book.publisherName,
                publicationYear: book.publicationYear,
                language: book.language,
                domain: book.domain,
                pages: book.pages,
                isbnCode: book.isbnCode
            });
        }
    });
}

async function updateAuthor(id, author) {
    await execAsyncRequest(async function updateAuthor() {
        const record = await Author.findByPk(id);
        if (record) {
            await record.update({
                authorName: author.authorName,
                nationality: author.nationality,
            });
        }
    });
}

async function updatePublisher(id, publisher) {
    await execAsyncRequest(async function updatePublisher() {
        const record = await Publisher.findByPk(id);
        if (record) {
            await record.update({
                publisherName: publisher.publisherName,
                country: publisher.country,
            });
        }
    });
}

async function deleteBook(id) {
    await execAsyncRequest(async function deleteBook() {
        const record = await Book.findByPk(id);
        if (record) await record.destroy();
    });
}

async function deleteAuthor(id) {
    await execAsyncRequest(async function deleteAuthor() {
        const record = await Author.findByPk(id);
        if (record) await record.destroy();
    });
}

async function deletePublisher(id) {
    await execAsyncRequest(async function deletePublisher() {
        const record = await Publisher.findByPk(id);
        if (record) await record.destroy();
    });
}


export const operationsAPI = {
    init: sequelizeInit,
    validateId: validateId,
    validateNumber: validateNumber,
    validateString: validateString,
    validateBody: validateBody,
    getBooks: getAllBooks,
    getAuthors: getAllAuthors,
    getPublishers: getAllPublishers,
    getBookById: getBookById,
    getAuthorById: getAuthorById,
    getPublisherById: getPublisherById,
    getBooksByTitle: getBooksByTitle,
    getBookByDomanin:getBookByDomanin,
    getAuthorsByNationality: getAuthorsByNationality,
    getPublishersbyCountry: getPublishersbyCountry,
    getBooksByAuthorId: getBooksByAuthorId,
    getBooksByPublisherId: getBooksByPublisherId,
    getBooksByYear: getBooksByYear,
    createBook: createBook,
    createAuthor: createAuthor,
    createPublisher: createPublisher,
    updateBook: updateBook,
    updateAuthor: updateAuthor,
    updatePublisher: updatePublisher,
    deleteBook: deleteBook,
    deleteAuthor: deleteAuthor,
    deletePublisher: deletePublisher
};