import Service from '@ember/service';
import Surreal from 'surrealdb.js';
import { tracked } from '@glimmer/tracking';

export default class SurrealdbService extends Service {
  @tracked created;
  @tracked updated;
  @tracked people;
  @tracked groups;

  async start() {
    const db = new Surreal('http://127.0.0.1:8000/rpc');

    try {
      // Signin as a namespace, database, or root user
      await db.signin({
        user: 'root',
        pass: 'root',
      });

      // Select a specific namespace / database
      await db.use('test', 'test');

      // Create a new person with a random id
      this.created = await db.create('person', {
        title: 'Founder & CEO',
        name: {
          first: 'Tobie',
          last: 'Morgan Hitchcock',
        },
        marketing: true,
        identifier: Math.random().toString(36).substr(2, 10),
      });

      // Update a person record with a specific id
      this.updated = await db.change('person:jaime', {
        marketing: true,
      });

      // Select all people records
      this.people = await db.select('person');

      // Perform a custom advanced query
      this.groups = await db.query(
        'SELECT marketing, count() FROM type::table($tb) GROUP BY marketing',
        {
          tb: 'person',
        }
      );
    } catch (e) {
      console.error('ERROR', e);
    }
  }
}
