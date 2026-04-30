'use strict';

const { cleanExternalMediaUrl } = require('../../../../utils/clean-external-media-url');

module.exports = {
  beforeCreate(event) { cleanExternalMediaUrl(event.params.data); },
  beforeUpdate(event) { cleanExternalMediaUrl(event.params.data); },
};
