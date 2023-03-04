import { Sequelize } from "sequelize";
import { operationsAPI } from "./operations.js";

var database = new Sequelize(
  "reading_list",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mariadb",
    dialectOptions: {
      options: {
        enableArithAbort: true,
        trustedConnection: true,
      },
    },
  }
);

// const database = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false,
//         }
//     }

// });




export const Book = database.define("Book", {
    bookId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },

    title: {
        type: Sequelize.STRING,
    },

    authorId: {
        type: Sequelize.INTEGER,
    },

    authorName: {
        type: Sequelize.STRING,
    },

    publisherId: {
        type: Sequelize.INTEGER,
    },

    publisherName: {
        type: Sequelize.STRING,
    },

    publicationYear: {
        type: Sequelize.INTEGER,
    },

    language: {
        type: Sequelize.STRING,
    },

    domain: {
        type: Sequelize.STRING,
    },

    pages: {
        type: Sequelize.INTEGER,
    },

    isbnCode: {
        type: Sequelize.STRING,
    },
});

export const Author = database.define("Author", {
    authorId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },

    authorName: {
        type: Sequelize.STRING,
    },

    nationality: {
        type: Sequelize.STRING,
    },
});

Author.hasMany(Book, {
    foreignKey: "authorId",
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
    foreignKeyConstraint: true,
});

Book.belongsTo(Author, {
    foreignKey: "bookId",
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
    foreignKeyConstraint: true,
});

export const Publisher = database.define("Publisher", {
    publisherId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },

    publisherName: {
        type: Sequelize.STRING,
    },

    country: {
        type: Sequelize.STRING,
    },
});

Publisher.hasMany(Book, {
    foreignKey: "publisherId",
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
    foreignKeyConstraint: true,
});

Book.belongsTo(Publisher, {
    foreignKey: "bookId",
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
    foreignKeyConstraint: true,
});

operationsAPI.init(database);

export { database as connection };
