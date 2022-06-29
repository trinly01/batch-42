

const convertStatusToBoolean = ctx => {
  console.log('ctx pogi', ctx.params.query);
  if (ctx.params.query.isDone) {
    ctx.params.query.isDone = ctx.params.query.isDone.toLowerCase() === 'true';
  }
  return ctx;
};

const requireDescription = ctx => {
  if (!ctx.data.desc) {
    throw new Error('Description can not be empty');
  }

  ctx.data.isDone = false;

  return ctx;
};

module.exports = {
  before: {
    all: [],
    find: [convertStatusToBoolean],
    get: [],
    create: [requireDescription],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
