# TRi Urbain Collaboratif (TRUC) 

Dépôt du projet TRUC, réalisé lors du Mini Hackathon du Grand Nancy se déroulant le 28 février 2014 par la TrashTeam

## Plan de livraison

### Fait lors du Hackathon du 28 février 2014

- Comment je me débarrasse de tel déchet ?
    - Liste de déchets types avec déclinaisons ? papier, carton, bois, textile, gravas, végétaux, ...
    - Catégorisation des déchets http://fr.wikipedia.org/wiki/Types_de_d%C3%A9chets ?
    - Catégorisation des lieux de collecte (compatibilité de la catégorie de mon déchet avec ce qu’accepte le point de collecte)
- Où je m’en débarrasse ? => Localisation des déchetteries, des points de collecte (pour les DASRIA: http://www.lorsep.org/upload/news/docs/plaquette%20DASRI.pdf)
- Quand je m'en débarrasse ? Croiser avec l'opendata météo ? http://www.data.gouv.fr/fr/dataset/modele-meteo-europe


### Feuille de route (reste à faire)

Unité utilisée pour l'estimation du chiffrage : sprint = 15j (équipe TrashTeam)

#### Lot 1 (coût estimé : 3 sprints)

- Afficher le chemin le plus court pour se rendre à la dechetterie la plus proche (API G-Ny)
- Industrialisation de la maquette (1 serveur)
- Portage sur APP mobile

#### Lot 2 (coût estimé : 1 sprint)

Nécessite opendata du Grand Nancy actuellement non disponibles.

- Y a-t-il du monde à la déchetterie (récupération des données provenant de l’utilisation des badges à l’entrée des déchetteries) ?

#### Lot 3 (coût estimé : 2 sprints)

- Co-remorquage/voiturage des déchets : Je vais aller à la déchetterie, j’ai une remorque/voiture, dans laquelle il y a encore de la place, je propose aux gens à proximité de profiter de ma remorque pour jeter leurs déchets (+ compte à rebours)

#### Lot 4 (coût estimé : 2 sprints)

Nécessite opendata des partenaires du Grand Nancy actuellement non disponibles.

- Je vais jeter un truc, mais quelqu’un en a peut être besoin… Solution! Je mets sur l’application la localisation de l’objet en question (+ reversement/synchro éventuelle avec donnons.org/recup.net et partenaires du grand Nancy), si une personne est intéressée, elle peut venir le récupérer. Au bout d’un certain temps (compte à rebours type ebay), je le jette.


#### Lot 5 (coût estimé : 1 sprint)

- J’ai des observations à faire concernant un lieu de collecte, je veux pouvoir les faire partager aux autres usagers qui allaient se rendre au même point de dépôt. Ex: magasin acceptant les piles fermé exceptionnellement, déchetterie ayant une benne pour les gravats en rade ... 

#### Lot 5 (coût estimé : 1 sprint)

- Je veux que l’application me propose les dates des “Collecte des encombrants” devant chez moi. Je veux pouvoir être notifié par l’application quelques jours avant et pouvoir ajouter automatiquement dans mon calendrier personnel ces dates.

#### Lot 6 (coût estimé : 1 sprint)

- Je suis un professionnel qui a des déchets spécifiques (produits dangereux, cartouches toner, gravats), comment puis-je les faire recycler ou m’en débarrasser ?

#### Lot 7 (coût estimé : 2 sprints)

- J’ai une remorque et je veux bien la prêter ou la louer, je le dis sur le site et cela en informe les inscrits du site proches géographiquement. J’ai alors un moyen de contacter la personne pour “réserver” la remorque à une date donnée.

#### Lot 8 (coût estimé : 1 sprint)

- Analyse des logs pour anticiper les plans de charges des déchetteries. (bouton : je veux aller jeter => suggestion de dates et d’heures)

## Chiffrage du TRUC

Un total d'environ 14 sprints.

A noter que les priorités entre les lots sont ajustables et modulables (possibilité d'ajout/retrait de fonctionnalitées)
