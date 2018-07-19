import { module, test } from 'qunit';
import { fillIn, visit, currentURL, find, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | developers', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /developers', async function(assert) {
    server.create('developer', {firstName: 'Matthew', lastName: 'Morrison'});
    await visit('/developers');
    assert.equal(currentURL(), '/developers');
    assert.equal(find('.full-name').innerHTML, 'Matthew Morrison');
  });

  test('selecting a developer', async function(assert) {
    let dev = server.create('developer', {firstName: 'Matthew', lastName: 'Morrison'});
    await visit('/developers');
    await click('.full-name');
    assert.equal(currentURL(), `/developers/${dev.id}`);
    assert.equal(find('.current-dev').innerHTML, 'Matthew Morrison');
  });

  test('delete a developer', async function(assert) {
    server.create('developer', {firstName: 'Matthew', lastName: 'Morrison'});
    await visit('/developers');
    await click('.full-name');
    await click('#delete');
    assert.equal(currentURL(), '/developers');
    assert.equal(server.db.developers.length, 0);
  });

  test('edit a developer', async function(assert) {
    server.create('developer', {firstName: 'Matthew', lastName: 'Morrison'});
    await visit('/developers');
    await click('.full-name');
    await fillIn('#first-name', 'Matt');
    await fillIn('#last-name', 'Morris');
    await click('#save');
    assert.equal(currentURL(), '/developers');
    assert.equal(server.db.developers.length, 1);
    let dev = server.db.developers[0];
    assert.equal(dev.firstName, 'Matt');
    assert.equal(dev.lastName, 'Morris');
  });

  test('create new developer', async function(assert) {
    await visit('/developers');
    await click('#create');
    assert.equal(currentURL(), '/developers/create');
    await fillIn('#first-name', 'Matt');
    await fillIn('#last-name', 'Morris');
    await click('#save');
    assert.equal(currentURL(), '/developers');
    assert.equal(server.db.developers.length, 1);
    let dev = server.db.developers[0];
    assert.equal(dev.firstName, 'Matt');
    assert.equal(dev.lastName, 'Morris');
  });

});
