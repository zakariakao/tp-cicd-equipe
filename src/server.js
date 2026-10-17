const express = require("express");
const { calculerTTC } = require("./calculator");
const { version } = require("../package.json");

const app = express();
const port = process.env.PORT || 3000;

// Route d'accueil
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenue dans notre TP CI/CD",
    version
  });
});

// Route pour vérifier que l'application répond
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    version
  });
});

// Route pour calculer le prix TTC
app.get("/api/ttc", (req, res) => {
  const { prix, tva } = req.query;

  if (
    typeof prix !== "string" ||
    typeof tva !== "string" ||
    prix.trim() === "" ||
    tva.trim() === ""
  ) {
    return res.status(400).json({
      error: "Les paramètres prix et tva sont obligatoires"
    });
  }

  try {
    const prixTTC = calculerTTC(Number(prix), Number(tva));

    return res.json({
      prixHT: Number(prix),
      tva: Number(tva),
      prixTTC
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

// Démarrage du serveur
app.listen(port, "0.0.0.0", () => {
  console.log(`Application disponible sur http://localhost:${port}`);
});