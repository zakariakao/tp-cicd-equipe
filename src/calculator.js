function calculerTTC(prix, tva) {
  if (!Number.isFinite(prix) || !Number.isFinite(tva)) {
    throw new Error("Le prix et la TVA doivent être numériques");
  }

  if (prix < 0 || tva < 0) {
    throw new Error("Le prix et la TVA doivent être positifs ou nuls");
  }

  const resultat = prix * (1 + tva / 100);

  return Math.round(resultat * 100) / 100;
}

module.exports = { calculerTTC };