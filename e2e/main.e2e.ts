import { expect } from 'chai';
import { SpectronClient } from 'spectron';

import commonSetup from './common-setup';

describe('MagicMirror App', function () {

  commonSetup.apply(this);

  let client: SpectronClient;

  beforeEach(function() {
    client = this.app.client;
  });

  it('creates initial windows', async function () {
    const count = await client.getWindowCount();
    expect(count).to.equal(1);
  });

  it('should display weather widget!', async function () {
    const elem = await client.$('app-home app-weather-widget');
    expect(elem).to.exist;
  });

});
