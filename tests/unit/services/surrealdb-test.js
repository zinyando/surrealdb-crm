import { module, test } from 'qunit';
import { setupTest } from 'surrealdb-crm/tests/helpers';

module('Unit | Service | surrealdb', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:surrealdb');
    assert.ok(service);
  });
});
