const contacts = require("./contacts");

const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <action>", "choose action")
  .option("-i, --id <id>", "user id")
  .option("-n, --name <name>", "user name")
  .option("-e, --email <email>", "user email")
  .option("-p, --phone <phone>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts().then((data) => console.table(data));
      break;

    case "get":
      contacts.getContactById(id).then((data) => console.log(data));
      break;

    case "add":
      contacts.addContact(name, email, phone).then((data) => console.log(data));
      break;

    case "remove":
      contacts.removeContact(id).then((data) => console.log(data));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
