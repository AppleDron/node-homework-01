const fs = require("node:fs/promises");
const path = require("node:path");

class Contacts {
  currentPath = process.cwd();
  contactPath = path.join(this.currentPath, "db", "contacts.json");

  constructor() {}

  async listContacts() {
    const content = await fs.readFile(this.contactPath);
    return JSON.parse(content.toString());
  }

  async getContactById(contactId) {
    const contacts = await this.listContacts();
    const contact = contacts.find(({ id }) => id === contactId);
    return contact ? contact : null;
  }

  async removeContact(contactId) {
    const contacts = await this.listContacts();

    // const filteredContacts = contacts.filter(({ id }) => id !== contactId);

    const index = contacts.findIndex(({ id }) => id === contactId);
    const deletedContact = contacts.splice(index, 1);

    return deletedContact ? deletedContact : null;
  }

  async addContact(name, email, phone) {
    const contacts = await this.listContacts();
    const contact = { name, email, phone };
    contacts.push(contact);

    const content = JSON.stringify(contacts);
    await fs.writeFile(this.contactPath, content);

    return contact;
  }
}

const contacts = new Contacts();

module.exports = contacts;
