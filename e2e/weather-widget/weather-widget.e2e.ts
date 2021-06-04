import { expect } from 'chai';
import { SpectronClient } from 'spectron';

import commonSetup from './../common-setup';

describe('weather widget', function () {

  commonSetup.apply(this);

  let client: SpectronClient;
  beforeEach(function (){
    client = this.app.client;
  });

  it('should display weather widget!', async function  () {
    let weatherWidget = await client.$('app-home app-weather-widget');
    expect(weatherWidget).to.exist;
  });

  it('weather image should populate', async function  () {
    const weatherImage = await client.$('app-weather-widget img');
    expect(weatherImage).to.exist;
  });

});
