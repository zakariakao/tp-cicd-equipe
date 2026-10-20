const test = require("node:test");
const assert = require("node:assert/strict");
const { calculerTTC } = require("../src/calculator");

test("100 HT avec 20 % de TVA donne 120", () => {
  assert.equal(calculerTTC(100, 20), 120);
});

test("Une TVA de 0 % conserve le prix", () => {
  assert.equal(calculerTTC(100, 0), 100);
});

test("Un prix nul est accepté", () => {
  assert.equal(calculerTTC(0, 20), 0);
});

test("Le résultat est arrondi à deux décimales", () => {
  assert.equal(calculerTTC(19.99, 20), 23.99);
});

test("Un prix négatif est refusé", () => {
  assert.throws(() => calculerTTC(-100, 20));
});

test("Une TVA négative est refusée", () => {
  assert.throws(() => calculerTTC(100, -20));
});

test("Une valeur non numérique est refusée", () => {
  assert.throws(() => calculerTTC(NaN, 20));
});