# 📚 KgConnect Backend API - Guide pour Développeurs Frontend

Bienvenue! Cette documentation vous permet de coder le frontend sans jamais regarder le code backend.

---

## 🚀 Fichiers de Documentation

### 1. **API_DOCUMENTATION.md** ⭐ (À LIRE EN PREMIER)
Le fichier de documentation principale et la plus complète.

✅ **Contient**:
- Description de chaque endpoint
- Paramètres requis et optionnels
- Exemples de requêtes/réponses
- Codes d'erreur possibles
- Exemples cURL complets
- Structure des données

📖 **Idéal pour**: Comprendre chaque endpoint, ses paramètres, et tester rapidement avec cURL

**Comment utiliser**:
```bash
# Lire directement depuis votre terminal
cat API_DOCUMENTATION.md

# Ou l'ouvrir dans votre éditeur de code
code API_DOCUMENTATION.md
```

---

### 2. **openapi.yaml**
Spécification OpenAPI 3.0 (standard de l'industrie).

✅ **Avantages**:
- Compatible avec Swagger UI
- Import dans Insomnia/Postman
- Documentation auto-générée interactive
- Génération de clients API automatiques

**Comment utiliser**:

#### Option A: Swagger UI en ligne
```
https://editor.swagger.io/
-> File -> Import File -> Sélectionner openapi.yaml
```

#### Option B: Localement avec Docker
```bash
docker run -p 8080:8080 -v ${PWD}/openapi.yaml:/openapi.yaml \
  swaggerapi/swagger-ui -e openapi.yaml
```

#### Option C: Importer dans Postman
```
1. Ouvrir Postman
2. File -> Import -> openapi.yaml
```

---

### 3. **KgConnect_API.postman_collection.json**
Collection Postman complète avec tous les endpoints.

✅ **Contient**:
- Tous les appels API pré-configurés
- Variables d'environnement (base_url, token)
- Exemples de requêtes/réponses
- Tests intégrés (optionnel)

**Comment utiliser**:

1. **Importer la collection**:
   ```
   Postman -> Import -> KgConnect_API.postman_collection.json
   ```

2. **Configurer les variables d'environnement**:
   ```
   - base_url: http://localhost:8000/api
   - token: [À remplir après login]
   ```

3. **Tester les endpoints**:
   - Cliquez sur un endpoint
   - Cliquez sur "Send"
   - Observez la réponse

---

## 🔐 Authentification - Étapes pour Commencer

### Étape 1: Créer un compte

**Fichier de docs**: → API_DOCUMENTATION.md → "Register"

```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "dev@example.com",
    "password": "SecurePass123!",
    "firstname": "Dev",
    "lastname": "Frontend"
  }'
```

### Étape 2: Se connecter et récupérer le token

**Fichier de docs**: → API_DOCUMENTATION.md → "Login"

```bash
curl -X POST http://localhost:8000/api/login_check \
  -H "Content-Type: application/json" \
  -d '{
    "email": "dev@example.com",
    "password": "SecurePass123!"
  }'
```

Réponse:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Étape 3: Utiliser le token dans vos requêtes

**À faire pour TOUS les endpoints (sauf register/login)**:

```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X GET http://localhost:8000/api/me \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📦 Ressources API Disponibles

| Ressource | Opérations | Authentification | Description |
|-----------|-----------|-----------------|-------------|
| **Users** | CRUD | Oui | Gestion des utilisateurs |
| **Trips** | CRUD | Oui | Trajets offerts par les utilisateurs |
| **Reservations** | CRUD | Oui | Réservations de places dans les trajets |
| **Messages** | ❌ Pas encore | N/A | À venir dans les futures versions |

---

## 🎯 Cas d'Usage Courants

### Cas 1: Afficher la liste des trajets Paris → Madrid

**📖 Consultez**: API_DOCUMENTATION.md → Trips → "List All Trips"

```bash
curl -X GET "http://localhost:8000/api/trips?departureCountry=France&departureCity=Paris&arrivalCountry=Spain&arrivalCity=Madrid&status=active" \
  -H "Authorization: Bearer $TOKEN"
```

### Cas 2: Créer une réservation

**📖 Consultez**: API_DOCUMENTATION.md → Reservations → "Create Reservation"

```bash
curl -X POST http://localhost:8000/api/reservations \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sender": "/api/users/550e8400-e29b-41d4-a716-446655440000",
    "trip": "/api/trips/660e8400-e29b-41d4-a716-446655440001",
    "reservedWeight": 10.5,
    "status": "pending"
  }'
```

### Cas 3: Mettre à jour son profil

**📖 Consultez**: API_DOCUMENTATION.md → Users → "Update User"

```bash
curl -X PATCH http://localhost:8000/api/users/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/merge-patch+json" \
  -d '{
    "firstname": "Jean-Pierre",
    "phone": "+33687654321"
  }'
```

---

## 🛠️ Outils Recommandés pour Tester

### 1. **Postman** (Recommandé pour la simplicité)
```bash
# Installer Postman depuis https://www.postman.com/downloads/
# Importer: KgConnect_API.postman_collection.json
```

### 2. **Insomnia** (Léger et rapide)
```bash
# Installer depuis https://insomnia.rest/
# Importer: openapi.yaml
```

### 3. **cURL** (Dans le terminal)
```bash
# Déjà intégré dans votre système d'exploitation
#Exemples dans API_DOCUMENTATION.md
```

### 4. **VS Code REST Client** (Extension)
```bash
# Extension: REST Client (humao.rest-client)
# Crééz un fichier .http et écrivez vos requêtes
```

---

## 📊 Structure des Réponses

Toutes les réponses suivent le standard **JSON-LD et Hydra** (API Platform):

### Réponse Simple (Objet unique)
```json
{
  "@id": "/api/users/550e8400-e29b-41d4-a716-446655440000",
  "@type": "User",
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "firstname": "Jean",
  "lastname": "Dupont"
}
```

### Réponse Collection (Liste d'objets)
```json
{
  "@context": "/api/contexts/Trip",
  "@id": "/api/trips",
  "@type": "hydra:Collection",
  "hydra:member": [
    { ... },
    { ... }
  ],
  "hydra:totalItems": 42,
  "hydra:view": {
    "@id": "/api/trips?page=1",
    "hydra:first": "/api/trips?page=1",
    "hydra:last": "/api/trips?page=42"
  }
}
```

**À retenir**:
- `@id` = Identifiant unique (URL) de la ressource
- `hydra:member` = Liste des éléments (dans les collections)
- `hydra:totalItems` = Nombre total d'éléments
- Récupérez les IDs avec `response.data[0]["@id"]` pour lier d'autres ressources

---

## ❌ Erreurs Courantes et Solutions

### Erreur: 401 Unauthorized

**Cause**: Token manquant ou invalide

**Solution**:
```bash
1. Vérifiez le token inclus dans Authorization Header
2. Réécupérez un token avec POST /login_check
3. Assurez-vous que le format est: "Authorization: Bearer {token}"
```

### Erreur: 404 Not Found

**Cause**: Ressource n'existe pas ou UUID incorrect

**Solution**:
```bash
1. Vérifiez l'UUID est correct
2. Assurez-vous que la ressource existe
3. Consultez la liste (GET) avant de chercher les détails
```

### Erreur: 422 Unprocessable Entity

**Cause**: Données invalides ou logique métier non respectée

**Solution**:
- Lisez le message d'erreur détaillé dans la réponse
- Vérifiez que tous les champs requis sont fournis
- Respectez les types de données (string, float, datetime, etc.)

---

## 🔗 Variables à Retenir

### UUIDs (Remplacez dans les URLs)
- `{user_id}` = UUID de l'utilisateur (ex: `550e8400-e29b-41d4-a716-446655440000`)
- `{trip_id}` = UUID du trajet (ex: `660e8400-e29b-41d4-a716-446655440001`)
- `{reservation_id}` = UUID de la réservation (ex: `770e8400-e29b-41d4-a716-446655440002`)

### Formats
- **Dates**: ISO 8601 (ex: `2026-03-20T10:00:00Z`)
- **Énumérations**:
  - Status Trip: `active`, `completed`, `cancelled`
  - Status Reservation: `pending`, `confirmed`, `cancelled`, `completed`

---

## 📞 Support et Questions

Si vous avez des doutes sur un endpoint:

1. **Consultez d'abord**: API_DOCUMENTATION.md
2. **Testez avec**: Postman collection
3. **Vérifiez**: openapi.yaml pour les schémas complets
4. **Posez des questions**: À l'équipe backend

---

## ✅ Checklist pour Débuter

- [ ] Lire `API_DOCUMENTATION.md` (sections Users et Authentication)
- [ ] S'inscrire avec `/api/register`
- [ ] Se connecter avec `/api/login_check`
- [ ] Récupérer le token
- [ ] Tester `/api/me` avec le token
- [ ] Importer la Postman collection
- [ ] Tester quelques endpoints dans Postman
- [ ] Commencer à coder le frontend!

---

## 🎓 Prochaines Étapes

1. **Frontend**: Intégrez les appels API dans votre application React/Vue/Angular
2. **Stockage du Token**: Utilisez localStorage pour sauvegarder le JWT
3. **Intercepteurs HTTP**: Ajoutez automatiquement le token à chaque requête
4. **Gestion d'Erreurs**: Capturez les 401/404/422 et affichez les messages
5. **UI/UX**: Créez votre interface beautifu pour consommer ces APIs

---

**Bonne chance avec votre développement frontend! 🚀**
