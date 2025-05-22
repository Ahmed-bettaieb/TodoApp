# 📝 Todo App API

Une API RESTful de gestion de tâches avec authentification sécurisée utilisant **Express.js**, **MongoDB**, et **JWT**.

---

## 🚀 Fonctionnalités

- ✅ Authentification par email et mot de passe
- 🔒 Sécurité via JSON Web Tokens (JWT)
- 📄 CRUD sur les tâches (Create, Read, Update, Delete)
- 🧑‍💻 Données privées par utilisateur
- 🕓 Timestamps automatiques (`createdAt`, `updatedAt`)

---

## ⚙️ Stack Technique

- **Node.js**
- **Express.js**
- **MongoDB** (via Mongoose)
- **JWT**
- **bcryptjs**
- **dotenv**
- **cors**

---

## 📁 Installation

1. Clonez le dépôt :

```bash
git clone ...
cd todo-api
```

2. Installez les dépendances :

```bash
npm install
```

3. Configurez les variables d’environnement :

Créez un fichier `.env` à la racine :

```env
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=une_clé_très_secrète
PORT=5000
```

4. Lancez le serveur :

```bash
npm start
```

> L’API tourne sur `http://localhost:5000`

---

## 📦 Endpoints de l'API

### Authentification

| Méthode | Route               | Description         |
|---------|---------------------|---------------------|
| POST    | `/api/auth/register` | Créer un compte     |
| POST    | `/api/auth/login`    | Connexion utilisateur|

### Tâches (JWT requis)

**Header requis :**
```
Authorization: Bearer <token>
```

| Méthode | Route             | Description             |
|---------|-------------------|-------------------------|
| GET     | `/api/todos`      | Récupérer toutes les tâches |
| POST    | `/api/todos`      | Créer une tâche         |
| PUT     | `/api/todos/:id`  | Modifier une tâche      |
| DELETE  | `/api/todos/:id`  | Supprimer une tâche     |

---

## 📄 Modèle de Données

### Utilisateur

```json
{
  "email": "user@example.com",
  "username": "John",
  "password": "hashed_password",
  "createdAt": "2025-05-23T12:00:00Z"
}
```

### Tâche

```json
{
  "title": "Faire les courses",
  "description": "Acheter du lait",
  "date": "2025-05-24",
  "status": "pending",
  "priority": "high",
  "userId": "ObjectId",
  "createdAt": "2025-05-23T12:30:00Z"
}
```

---

## ✅ TODO (Évolutions possibles)

- [ ] Ajout de filtres et tri
- [ ] Interface graphique avec React ou Next.js
- [ ] Notifications email ou push
- [ ] Ajout de catégories/projets

---

## 📄 Licence

Ce projet est sous licence MIT.