const { pipe, prop, map, evolve, mergeRight, mergeLeft } = require("ramda");
const moment = require("moment");

const DATE_FORMAT = "MMM D YYYY";

const formatDate = date => moment(date).format(DATE_FORMAT);

const formatEndDate = date => (date ? formatDate(date) : "Present");

const evolveEmployers = employer => {
  return pipe(
    mergeRight({
      endDate: null
    }),
    evolve({
      startDate: formatDate,
      endDate: formatEndDate
    })
  )(employer);
};

const mapRoles = role =>
  evolve(
    {
      employers: map(evolveEmployers)
    },
    role
  );

function rawToUi(raw) {
  return pipe(
    prop("roles"),
    map(mapRoles)
  )(raw);
}

const baseExampleRole = {
  title: "Full-Stack Developer",
  employers: [
    {
      name: "Rentec Direct",
      startDate: "2019-08-08",
      accomplishments: ["everything"]
    }
  ]
};

const baseExample = {
  roles: [exampleRole()]
};

function example(overrides) {
  return mergeLeft(overrides, baseExample);
}

function exampleRole(overrides) {
  return mergeLeft(overrides, baseExampleRole);
}

module.exports = {
  example,
  exampleRole,
  rawToUi
};
