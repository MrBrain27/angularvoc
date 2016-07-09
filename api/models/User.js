/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    word: {
      type: 'string',
      maxLength: 120,
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    vocab: {
      type: 'string',
      maxLength: 120,
      required: true
    }

  }
};

