#!/usr/bin/env bash
# À exécuter UNE SEULE FOIS sur le VPS, par l'utilisateur `etudiant` (le mot de passe sudo est demandé).
# Prépare Apache pour servir le portfolio statique :  bash setup-vps.sh portfolio.enzo-loddo.fr
set -euo pipefail

DOMAIN="${1:?Indique le nom de domaine, ex. : bash setup-vps.sh portfolio.enzo-loddo.fr}"
ROOT=/var/www/portfolio

echo "==> Dossier du site : $ROOT"
sudo mkdir -p "$ROOT"
sudo chown -R etudiant:etudiant "$ROOT"
[ -f "$ROOT/index.html" ] || echo '<p>Portfolio : première mise en ligne en attente.</p>' > "$ROOT/index.html"

echo "==> Modules Apache"
sudo a2enmod expires headers deflate rewrite >/dev/null

echo "==> Site Apache : /etc/apache2/sites-available/portfolio.conf"
sudo tee /etc/apache2/sites-available/portfolio.conf >/dev/null <<CONF
<VirtualHost *:80>
    ServerName $DOMAIN
    DocumentRoot $ROOT

    <Directory $ROOT>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorDocument 404 /404.html
</VirtualHost>
CONF
sudo a2ensite portfolio >/dev/null
sudo apache2ctl configtest
sudo systemctl reload apache2

cat <<MSG

Apache sert maintenant http://$DOMAIN (si le DNS pointe vers ce VPS).
Étape suivante, pour activer le HTTPS :

    sudo certbot --apache -d $DOMAIN

(réponds aux questions de certbot ; choisis la redirection HTTP vers HTTPS)
MSG
