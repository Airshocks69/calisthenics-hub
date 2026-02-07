# GitHub Repository Setup Instructions

Das lokale Calisthenics Hub Repository wurde erfolgreich erstellt! Folgende Schritte sind erforderlich, um es zu GitHub zu pushen:

## Option 1: Mit GitHub CLI (Empfohlen)

### 1. GitHub CLI installieren (falls nicht vorhanden)

```bash
# macOS
brew install gh

# Ubuntu/Debian
curl -fsSLo /usr/share/keyrings/githubcli-archive-keyring.gpg https://cli.github.com/packages/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages focal main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh

# Windows
choco install gh
```

### 2. GitHub authentifizieren

```bash
gh auth login
# Folge den Prompts - wähle HTTPS und generiere einen Token
```

### 3. Repository erstellen und pushen

```bash
cd /root/.openclaw/workspace/calisthenics-hub

# Remote hinzufügen
gh repo create calisthenics-hub --public --source=. --remote=origin --push

# Oder privates Repo:
gh repo create calisthenics-hub --private --source=. --remote=origin --push
```

## Option 2: Manuell mit Git + Personal Access Token

### 1. Personal Access Token erstellen

Gehe zu https://github.com/settings/tokens und erstelle einen neuen Token mit:
- `repo` (vollständiger Zugriff auf private/public Repos)
- `workflow` (GitHub Actions)

### 2. Repository auf GitHub erstellen

1. Gehe zu https://github.com/new
2. Repository Name: `calisthenics-hub`
3. Wähle Public oder Private
4. Klick "Create repository" (WITHOUT initializing with README)

### 3. Lokal pushen

```bash
cd /root/.openclaw/workspace/calisthenics-hub

# Remote hinzufügen (ersetze YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/calisthenics-hub.git

# Branch auf main umbenennen (optional)
git branch -M main

# Pushen
git push -u origin master
```

Wenn gefragt nach Authentifizierung:
- Username: `YOUR_USERNAME`
- Password: `<dein Personal Access Token>`

## Option 3: Mit SSH (für erfahrene Nutzer)

### 1. SSH-Key Setup (falls nicht vorhanden)

```bash
# SSH-Key generieren (falls nicht vorhanden)
ssh-keygen -t ed25519 -C "your_email@example.com"

# SSH-Key zu GitHub hinzufügen:
# 1. Kopiere Inhalt von ~/.ssh/id_ed25519.pub
# 2. Gehe zu https://github.com/settings/keys
# 3. Klick "New SSH key"
# 4. Paste dein public key
```

### 2. Repository erstellen

1. Gehe zu https://github.com/new
2. Repository Name: `calisthenics-hub`
3. Klick "Create repository"

### 3. Lokal pushen

```bash
cd /root/.openclaw/workspace/calisthenics-hub

# SSH Remote hinzufügen
git remote add origin git@github.com:YOUR_USERNAME/calisthenics-hub.git

# Pushen
git push -u origin master
```

## Verifikation nach dem Push

Nach erfolgreichem Push kannst du das Repository unter folgendem Link aufrufen:
```
https://github.com/YOUR_USERNAME/calisthenics-hub
```

Überprüfe:
- ✅ Alle 35 Dateien sind vorhanden
- ✅ Dokumentation ist sichtbar
- ✅ GitHub Actions Workflow wird angezeigt
- ✅ README wird auf der Landing Page angezeigt

## Nächste Schritte nach dem Push

### 1. GitHub Actions konfigurieren (optional)
Die CI/CD Pipeline unter `.github/workflows/ci.yml` wird automatisch ausgelöst.

### 2. Branch Protection Rules setzen (empfohlen)

Gehe zu Repository Settings > Branches und setze:
- Protect matching branches: `main`
- Require pull request reviews: true
- Require status checks to pass: true

### 3. Secrets konfigurieren (für Deployment)

Falls du später deployen möchtest, füge unter Settings > Secrets diese ein:
- `DOCKER_USERNAME` - Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub password
- `DEPLOY_KEY` - Für Produktions-Server

## Troubleshooting

### "Authentication failed"
```bash
# Token Cache löschen und neu authentifizieren
git config --global --unset credential.helper
git fetch  # Wird dich wieder nach credentials fragen
```

### "Repository already exists"
Das Repository existiert bereits unter diesem Namen. Wähle einen anderen Namen oder lösche das existierende.

### "Permission denied"
Überprüfe:
- SSH-Key ist zu GitHub hinzugefügt (SSH method)
- Personal Access Token hat `repo` Berechtigung (HTTPS method)
- GitHub Account hat Schreibberechtigung

### "fatal: no changes added to commit"
Das passiert nicht, da wir bereits ein Commit erstellt haben. Wenn du dennoch diesen Fehler siehst:
```bash
git status  # Überprüfe Repository-Status
```

## Support

Für Fragen zu GitHub:
- GitHub Docs: https://docs.github.com
- Git Basics: https://git-scm.com/book

Für Fragen zu diesem Projekt:
- Siehe main README.md
- Siehe docs/ für detaillierte Dokumentation
