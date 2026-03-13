# 📚 Documentation API KgConnect

> **Version**: 1.0.0  
> **Base URL**: `http://localhost:8000/api`  
> **Authentification**: JWT Bearer Token  
> **Format**: JSON

---

## 📋 Table des matières

1. [Authentication (Authentification)](#authentication)
2. [Users (Utilisateurs)](#users)
3. [Trips (Trajets)](#trips)
4. [Reservations (Réservations)](#reservations)
5. [Messages](#messages)
6. [Erreurs Courantes](#erreurs-courantes)
7. [Exemples Complets](#exemples-complets)

---

## Authentication

### 🔑 Register (Créer un compte)

Créez un nouveau compte utilisateur.

**Endpoint**: `POST /api/register`

**Headers** (non authentifié):
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstname": "Jean",
  "lastname": "Dupont",
  "phone": "+33612345678"
}
```

**Response** (201 Created):
```json
{
  "message": "User created"
}
```

**Erreurs possibles**:
- `400`: Email déjà utilisé ou données manquantes
- `422`: Validation échouée

---

### 🔐 Login (Se connecter)

Obtenez un JWT token pour accéder aux ressources protégées.

**Endpoint**: `POST /api/login_check`

**Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Erreurs possibles**:
- `401`: Email ou mot de passe incorrect

---

### 👤 Get Current User

Récupérez les informations de l'utilisateur actuellement connecté.

**Endpoint**: `GET /api/me`

**Headers** (authentifié):
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Response** (200 OK):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "firstname": "Jean",
  "lastname": "Dupont",
  "phone": "+33612345678",
  "roles": ["ROLE_USER"]
}
```

**Erreurs possibles**:
- `401`: Token manquant ou invalide

---

## Users

### 📋 List All Users

Récupérez la liste de tous les utilisateurs.

**Endpoint**: `GET /api/users`

**Headers** (authentifié):
```
Authorization: Bearer {token}
```

**Query Parameters**:
```
- page: int (défaut: 1, pagination de 30 par défaut)
- order[firstname]: asc|desc
- order[email]: asc|desc
- email: string (filtre)
```

**Exemple de requête**:
```
GET /api/users?page=1&order[firstname]=asc
```

**Response** (200 OK):
```json
{
  "@context": "/api/contexts/User",
  "@id": "/api/users",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "/api/users/550e8400-e29b-41d4-a716-446655440000",
      "@type": "User",
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "firstname": "Jean",
      "lastname": "Dupont",
      "phone": "+33612345678"
    }
  ],
  "hydra:totalItems": 1,
  "hydra:view": {
    "@id": "/api/users?page=1",
    "@type": "hydra:PartialCollectionView",
    "hydra:first": "/api/users?page=1",
    "hydra:last": "/api/users?page=1"
  }
}
```

---

### 👤 Get User Details

Récupérez les détails complets d'un utilisateur spécifique.

**Endpoint**: `GET /api/users/{id}`

**Parameters**:
- `id` (UUID): ID de l'utilisateur

**Headers** (authentifié):
```
Authorization: Bearer {token}
```

**Response** (200 OK):
```json
{
  "@id": "/api/users/550e8400-e29b-41d4-a716-446655440000",
  "@type": "User",
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "firstname": "Jean",
  "lastname": "Dupont",
  "phone": "+33612345678"
}
```

**Erreurs possibles**:
- `404`: Utilisateur non trouvé

---

### ✏️ Update User

Mettez à jour les informations d'un utilisateur.

**Endpoint**: `PATCH /api/users/{id}`

**Parameters**:
- `id` (UUID): ID de l'utilisateur

**Headers** (authentifié):
```
Authorization: Bearer {token}
Content-Type: application/merge-patch+json
```

**Request Body** (partiellement):
```json
{
  "firstname": "Jean-Pierre",
  "phone": "+33687654321"
}
```

**Response** (200 OK):
```json
{
  "@id": "/api/users/550e8400-e29b-41d4-a716-446655440000",
  "@type": "User",
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "firstname": "Jean-Pierre",
  "lastname": "Dupont",
  "phone": "+33687654321"
}
```

---

### 🗑️ Delete User

Supprimez un utilisateur.

**Endpoint**: `DELETE /api/users/{id}`

**Parameters**:
- `id` (UUID): ID de l'utilisateur

**Headers** (authentifié):
```
Authorization: Bearer {token}
```

**Response** (204 No Content)

**Erreurs possibles**:
- `404`: Utilisateur non trouvé

---

## Trips

### 📋 List All Trips

Récupérez la liste de tous les trajets disponibles.

**Endpoint**: `GET /api/trips`

**Headers** (authentifié):
```
Authorization: Bearer {token}
```

**Query Parameters**:
```
- page: int (défaut: 1)
- order[departureDate]: asc|desc
- order[pricePerKg]: asc|desc
- departureCountry: string (filtre)
- arrivalCountry: string (filtre)
- status: string (filtre - active, completed, cancelled)
```

**Exemple de requête**:
```
GET /api/trips?departureCountry=France&arrivalCountry=Spain&status=active
```

**Response** (200 OK):
```json
{
  "@context": "/api/contexts/Trip",
  "@id": "/api/trips",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "/api/trips/660e8400-e29b-41d4-a716-446655440001",
      "@type": "Trip",
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "sender": "/api/users/550e8400-e29b-41d4-a716-446655440000",
      "departureCountry": "France",
      "departureCity": "Paris",
      "arrivalCountry": "Spain",
      "arrivalCity": "Madrid",
      "departureDate": "2026-03-20T10:00:00Z",
      "availableWeight": 50.5,
      "pricePerKg": 2.5,
      "description": "Trajet sécurisé avec parking climatisé",
      "status": "active",
      "createdAt": "2026-03-10T08:30:00Z"
    }
  ],
  "hydra:totalItems": 1
}
```

---

### 🚗 Get Trip Details

Récupérez les détails d'un trajet spécifique.

**Endpoint**: `GET /api/trips/{id}`

**Parameters**:
- `id` (UUID): ID du trajet

**Headers** (authentifié):
```
Authorization: Bearer {token}
```

**Response** (200 OK):
```json
{
  "@id": "/api/trips/660e8400-e29b-41d4-a716-446655440001",
  "@type": "Trip",
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "sender": {
    "@id": "/api/users/550e8400-e29b-41d4-a716-446655440000",
    "@type": "User",
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "firstname": "Jean",
    "lastname": "Dupont"
  },
  "departureCountry": "France",
  "departureCity": "Paris",
  "arrivalCountry": "Spain",
  "arrivalCity": "Madrid",
  "departureDate": "2026-03-20T10:00:00Z",
  "availableWeight": 50.5,
  "pricePerKg": 2.5,
  "description": "Trajet sécurisé avec parking climatisé",
  "status": "active",
  "createdAt": "2026-03-10T08:30:00Z",
  "updatedAt": null
}
```

---

### ➕ Create Trip

Créez un nouveau trajet.

**Endpoint**: `POST /api/trips`

**Headers** (authentifié):
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body**:
```json
{
  "sender": "/api/users/550e8400-e29b-41d4-a716-446655440000",
  "departureCountry": "France",
  "departureCity": "Paris",
  "arrivalCountry": "Spain",
  "arrivalCity": "Madrid",
  "departureDate": "2026-03-20T10:00:00Z",
  "availableWeight": 50.5,
  "pricePerKg": 2.5,
  "description": "Trajet sécurisé avec parking climatisé",
  "status": "active"
}
```

**Fields**:
- `sender` (string, requis): IRI/URL de l'utilisateur
- `departureCountry` (string, max 255, requis)
- `departureCity` (string, max 255, requis)
- `arrivalCountry` (string, max 255, requis)
- `arrivalCity` (string, max 255, requis)
- `departureDate` (ISO 8601 datetime, requis): Ex: `2026-03-20T10:00:00Z`
- `availableWeight` (float, requis): Poids disponible en kg
- `pricePerKg` (float, requis): Prix par kg
- `description` (string, optionnel)
- `status` (string, requis): `active`, `completed`, ou `cancelled`

**Response** (201 Created):
```json
{
  "@id": "/api/trips/660e8400-e29b-41d4-a716-446655440001",
  "@type": "Trip",
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "sender": "/api/users/550e8400-e29b-41d4-a716-446655440000",
  "departureCountry": "France",
  "departureCity": "Paris",
  "arrivalCountry": "Spain",
  "arrivalCity": "Madrid",
  "departureDate": "2026-03-20T10:00:00Z",
  "availableWeight": 50.5,
  "pricePerKg": 2.5,
  "description": "Trajet sécurisé avec parking climatisé",
  "status": "active",
  "createdAt": "2026-03-10T08:30:00Z"
}
```

---

### ✏️ Update Trip

Mettez à jour un trajet existant.

**Endpoint**: `PATCH /api/trips/{id}`

**Parameters**:
- `id` (UUID): ID du trajet

**Headers** (authentifié):
```
Authorization: Bearer {token}
Content-Type: application/merge-patch+json
```

**Request Body** (partiellement):
```json
{
  "availableWeight": 45.0,
  "status": "completed"
}
```

**Response** (200 OK):
```json
{
  "@id": "/api/trips/660e8400-e29b-41d4-a716-446655440001",
  "@type": "Trip",
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "sender": "/api/users/550e8400-e29b-41d4-a716-446655440000",
  "departureCountry": "France",
  "departureCity": "Paris",
  "arrivalCountry": "Spain",
  "arrivalCity": "Madrid",
  "departureDate": "2026-03-20T10:00:00Z",
  "availableWeight": 45.0,
  "pricePerKg": 2.5,
  "description": "Trajet sécurisé avec parking climatisé",
  "status": "completed",
  "createdAt": "2026-03-10T08:30:00Z",
  "updatedAt": "2026-03-13T14:30:00Z"
}
```

---

### 🗑️ Delete Trip

Supprimez un trajet.

**Endpoint**: `DELETE /api/trips/{id}`

**Parameters**:
- `id` (UUID): ID du trajet

**Headers** (authentifié):
```
Authorization: Bearer {token}
```

**Response** (204 No Content)

---

## Reservations

### 📋 List All Reservations

Récupérez la liste de toutes les réservations.

**Endpoint**: `GET /api/reservations`

**Headers** (authentifié):
```
Authorization: Bearer {token}
```

**Query Parameters**:
```
- page: int (défaut: 1)
- order[createdAt]: asc|desc
- order[totalPrice]: asc|desc
- status: string (filtre - pending, confirmed, cancelled, completed)
```

**Response** (200 OK):
```json
{
  "@context": "/api/contexts/Reservation",
  "@id": "/api/reservations",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "/api/reservations/770e8400-e29b-41d4-a716-446655440002",
      "@type": "Reservation",
      "id": "770e8400-e29b-41d4-a716-446655440002",
      "sender": "/api/users/550e8400-e29b-41d4-a716-446655440000",
      "trip": "/api/trips/660e8400-e29b-41d4-a716-446655440001",
      "reservedWeight": 10.5,
      "totalPrice": 26.25,
      "status": "pending",
      "createdAt": "2026-03-11T09:15:00Z"
    }
  ],
  "hydra:totalItems": 1
}
```

---

### 📦 Get Reservation Details

Récupérez les détails d'une réservation.

**Endpoint**: `GET /api/reservations/{id}`

**Parameters**:
- `id` (UUID): ID de la réservation

**Headers** (authentifié):
```
Authorization: Bearer {token}
```

**Response** (200 OK):
```json
{
  "@id": "/api/reservations/770e8400-e29b-41d4-a716-446655440002",
  "@type": "Reservation",
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "sender": {
    "@id": "/api/users/550e8400-e29b-41d4-a716-446655440000",
    "@type": "User",
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "firstname": "Jean",
    "lastname": "Dupont"
  },
  "trip": {
    "@id": "/api/trips/660e8400-e29b-41d4-a716-446655440001",
    "@type": "Trip",
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "departureCountry": "France",
    "departureCity": "Paris",
    "arrivalCountry": "Spain",
    "arrivalCity": "Madrid",
    "departureDate": "2026-03-20T10:00:00Z",
    "pricePerKg": 2.5
  },
  "reservedWeight": 10.5,
  "totalPrice": 26.25,
  "status": "pending",
  "createdAt": "2026-03-11T09:15:00Z",
  "updatedAt": null
}
```

---

### ➕ Create Reservation

Créez une nouvelle réservation.

**Endpoint**: `POST /api/reservations`

**Headers** (authentifié):
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body**:
```json
{
  "sender": "/api/users/550e8400-e29b-41d4-a716-446655440000",
  "trip": "/api/trips/660e8400-e29b-41d4-a716-446655440001",
  "reservedWeight": 10.5,
  "status": "pending"
}
```

**Fields**:
- `sender` (string, requis): IRI/URL de l'utilisateur qui réserve
- `trip` (string, requis): IRI/URL du trajet
- `reservedWeight` (float, requis): Poids à réserver en kg
- `status` (string, requis): `pending`, `confirmed`, `cancelled`, ou `completed`

**Note**: `totalPrice` est calculé automatiquement = `reservedWeight * trip.pricePerKg`

**Response** (201 Created):
```json
{
  "@id": "/api/reservations/770e8400-e29b-41d4-a716-446655440002",
  "@type": "Reservation",
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "sender": "/api/users/550e8400-e29b-41d4-a716-446655440000",
  "trip": "/api/trips/660e8400-e29b-41d4-a716-446655440001",
  "reservedWeight": 10.5,
  "totalPrice": 26.25,
  "status": "pending",
  "createdAt": "2026-03-11T09:15:00Z"
}
```

---

### ✏️ Update Reservation

Mettez à jour une réservation existante.

**Endpoint**: `PATCH /api/reservations/{id}`

**Parameters**:
- `id` (UUID): ID de la réservation

**Headers** (authentifié):
```
Authorization: Bearer {token}
Content-Type: application/merge-patch+json
```

**Request Body** (partiellement):
```json
{
  "status": "confirmed",
  "reservedWeight": 12.0
}
```

**Response** (200 OK):
```json
{
  "@id": "/api/reservations/770e8400-e29b-41d4-a716-446655440002",
  "@type": "Reservation",
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "sender": "/api/users/550e8400-e29b-41d4-a716-446655440000",
  "trip": "/api/trips/660e8400-e29b-41d4-a716-446655440001",
  "reservedWeight": 12.0,
  "totalPrice": 30.0,
  "status": "confirmed",
  "createdAt": "2026-03-11T09:15:00Z",
  "updatedAt": "2026-03-13T14:45:00Z"
}
```

---

### 🗑️ Delete Reservation

Supprimez une réservation.

**Endpoint**: `DELETE /api/reservations/{id}`

**Parameters**:
- `id` (UUID): ID de la réservation

**Headers** (authentifié):
```
Authorization: Bearer {token}
```

**Response** (204 No Content)

---

## Messages

> ⚠️ **Note**: La ressource Messages n'est pas encore exposée en tant qu'API REST.  
> Elle est stockée en base de données et liée aux Trips et Reservations.  
> Implémentation prévue pour les futures versions.

**Champs de l'entité Message** (pour référence):
- `id` (UUID): Identifiant unique
- `sender` (User): Utilisateur expéditeur
- `receiver` (User): Utilisateur destinataire
- `content` (string): Contenu du message
- `isRead` (boolean): Message lu ou non
- `trip` (Trip, optionnel): Trajet associé
- `reservation` (Reservation, optionnel): Réservation associée
- `createdAt` (datetime): Date de création

---

## Erreurs Courantes

### 400 Bad Request
Erreur de validation ou données manquantes.

**Exemple**:
```json
{
  "@context": "/api/contexts/ConstraintViolationList",
  "@type": "ConstraintViolationList",
  "hydra:title": "An error occurred",
  "hydra:description": "departureDate: This value should not be null.",
  "violations": [
    {
      "propertyPath": "departureDate",
      "message": "This value should not be null."
    }
  ]
}
```

### 401 Unauthorized
Token manquant, invalide ou expiré.

**Exemple**:
```json
{
  "code": 401,
  "message": "JWT Token not found"
}
```

### 404 Not Found
Ressource non trouvée.

**Exemple**:
```json
{
  "@context": "/api/contexts/Error",
  "@type": "hydra:Error",
  "hydra:title": "An error occurred",
  "hydra:description": "Not Found"
}
```

### 422 Unprocessable Entity
Données rejetées par la logique métier.

**Exemple**:
```json
{
  "@context": "/api/contexts/ConstraintViolationList",
  "@type": "ConstraintViolationList",
  "hydra:title": "An error occurred",
  "violations": [
    {
      "propertyPath": "email",
      "message": "This value is already used."
    }
  ]
}
```

---

## Exemples Complets

### Exemple 1: Inscription et Connexion

```bash
# 1. S'inscrire
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jean@example.com",
    "password": "SecurePass123!",
    "firstname": "Jean",
    "lastname": "Dupont"
  }'

# Réponse:
# {"message": "User created"}

# 2. Se connecter
curl -X POST http://localhost:8000/api/login_check \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jean@example.com",
    "password": "SecurePass123!"
  }'

# Réponse:
# {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}

# 3. Récupérer les infos actuelles
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
curl -X GET http://localhost:8000/api/me \
  -H "Authorization: Bearer $TOKEN"
```

### Exemple 2: Créer un Trajet et une Réservation

```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
USER_ID="550e8400-e29b-41d4-a716-446655440000"

# 1. Créer un trajet
curl -X POST http://localhost:8000/api/trips \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sender": "/api/users/'$USER_ID'",
    "departureCountry": "France",
    "departureCity": "Paris",
    "arrivalCountry": "Spain",
    "arrivalCity": "Madrid",
    "departureDate": "2026-03-20T10:00:00Z",
    "availableWeight": 50.5,
    "pricePerKg": 2.5,
    "description": "Trajet Paris-Madrid",
    "status": "active"
  }'

# Réponse (contient: id = TRIP_ID)

# 2. Créer une réservation
TRIP_ID="660e8400-e29b-41d4-a716-446655440001"
curl -X POST http://localhost:8000/api/reservations \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sender": "/api/users/'$USER_ID'",
    "trip": "/api/trips/'$TRIP_ID'",
    "reservedWeight": 10.5,
    "status": "pending"
  }'
```

### Exemple 3: Rechercher des Trajets

```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Rechercher tous les trajets actifs de France vers Espagne
curl -X GET "http://localhost:8000/api/trips?departureCountry=France&arrivalCountry=Spain&status=active" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🔐 Authentification

Tous les endpoints (excepté register et login_check) nécessitent un token JWT valide dans le header:

```
Authorization: Bearer {your_token_here}
```

Si le token n'est pas fourni ou est invalide, vous recevrez une réponse **401 Unauthorized**.

## 📝 Notes Importantes

- **Pagination**: Par défaut 30 items par page
- **Dates**: Format ISO 8601 (Ex: `2026-03-20T10:00:00Z`)
- **UUID**: Tous les IDs sont des UUID v4
- **CORS**: Les requêtes cross-origin sont configurées
- **Hydra/JsonLD**: L'API implémente les standards Hydra et JSON-LD

---

**Dernière mise à jour**: 13 Mars 2026  
**Statut**: Production Ready
