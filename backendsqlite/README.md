# Pour lancer l'app en dev
```
npm run setup
npm run setup:env
# Ajouter une valeur à la variable TOKENSECRET dans le .env
npm run dev
```

# Pour lancer le build
```
npm run setup
npm run build
# Ajouter une valeur à la variable TOKENSECRET dans le .env
npm run start
```

# Doc Swagger
https://bazaar.osc-fr1.scalingo.io/doc/

# Tests

Pour lancer tous les tests :\
`npm run test`

Pour les lancer individuellement :
- spec\
`npm run test:spec`
- integ\
`npm run test:integ`
- e2e\
`npm run test:e2e`