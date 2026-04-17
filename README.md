<div align="center">

# 🐱 MindCat

**App mobile de saúde mental que conecta pacientes e psicólogos**

[![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo_SDK-54-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Status](https://img.shields.io/badge/status-em_desenvolvimento-yellow)]()

</div>

---

## 📖 Sobre o projeto

O **MindCat** é um aplicativo de saúde mental desenvolvido para aproximar pacientes e profissionais de psicologia. A proposta é tornar o cuidado com a saúde emocional mais acessível, humano e contínuo — indo além de sessões isoladas de terapia.

Este repositório contém o **frontend mobile** (iOS e Android), construído em React Native com Expo. O backend em Laravel está em [MindCatApi](https://github.com/Kuligowskilucas/MindCatApi).

---

## ✨ Principais funcionalidades

### 👤 Para o paciente
- 😺 **Registro de humor diário** com escala visual de 1 a 5 (cat emoji scale)
- 📊 **Gráfico de humor dos últimos 7 dias** construído com React Native primitives (sem libs externas)
- 📓 **Diário pessoal protegido por senha** com CRUD completo e criptografia
- ✅ **Tarefas enviadas pelo profissional** com marcação de conclusão
- 🔗 **Vínculo com psicólogo** mediante consentimento explícito (LGPD-friendly)
- 🔐 **Recuperação de senha por código de 6 dígitos** via email

### 👨‍⚕️ Para o profissional
- 👥 **Lista de pacientes vinculados**
- 📋 **Criação e gestão de tarefas** para pacientes
- 📈 **Resumo clínico** do paciente (humor + tarefas)
- 🔍 **Busca de paciente por email**

---

## 🛠 Stack técnica

| Categoria | Tecnologia |
|---|---|
| Framework | React Native 0.81 + Expo SDK 54 |
| Linguagem | TypeScript |
| Navegação | expo-router (file-based routing) |
| Estado global | React Context API |
| HTTP | axios (com interceptors para erro de rede) |
| Armazenamento seguro | expo-secure-store (tokens) |
| Persistência local | AsyncStorage (onboarding, cache) |
| Localização | expo-location |

---

## 🏗 Decisões arquiteturais

Algumas escolhas que podem parecer triviais mas tiveram razão:

- **Gráfico de humor sem libs externas** — construído com componentes primitivos do React Native. Evita dependência extra (React Native Chart Kit, Victory Native) que costuma dar problema de compatibilidade em updates do Expo SDK.

- **Auth state reativo no `RootNavigator`** — a primeira versão tinha bug de navegação no logout porque o estado de auth não era reativo. Refatorado para usar `useSegments` e escutar mudanças no contexto, eliminando `navigation.reset()` manuais.

- **Onboarding gating via `RootNavigator`** — o `initialRouteName="(auth)"` estava bypassando `app/index.tsx`, então a checagem do AsyncStorage foi movida para o nível do `RootNavigator`. Logica que precisa rodar em toda abertura não deve ficar em route files do expo-router.

- **Validações inline com função pura** — `src/utils/validation.ts` centraliza todas as regras (email, senha, código de 6 dígitos). Qualquer tela importa as mesmas funções, garantindo consistência.

- **Interceptor global de erros de rede** — axios captura timeout, offline e 401 de forma centralizada em `src/services/http.ts`. Nenhuma tela precisa reimplementar tratamento de erro de rede.

---

## 📁 Estrutura do projeto

```
mindcat/
├── app/                      # Rotas (expo-router file-based)
│   ├── (auth)/               # Login, registro, reset de senha, onboarding
│   ├── (tabs)/               # Menu principal (patient e pro têm views distintas)
│   ├── diary/                # Diário
│   ├── moods/                # Humor
│   ├── tasks/                # Tarefas
│   ├── settings/             # Perfil, editar perfil, sobre
│   └── +not-found.tsx        # 404 traduzida
├── components/               # UI reutilizável (Background, InputField, etc)
├── src/
│   ├── contexts/             # AuthContext
│   ├── services/             # Camada HTTP (auth, diary, moods, tasks, links)
│   └── utils/                # validation.ts
├── theme/                    # Paleta de cores, tipografia
└── assets/                   # Imagens, fontes, ícones
```

---

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js 18+
- Expo Go no celular OU emulador Android/iOS
- Backend do MindCat rodando ([MindCatApi](https://github.com/Kuligowskilucas/MindCatApi))

### Instalação

```bash
# Clonar e instalar dependências
git clone https://github.com/Kuligowskilucas/mindcat.git
cd mindcat
npm install

# Configurar URL da API em src/constants/api.ts
# Exemplo: export const API_URL = "http://192.168.0.X:8000/api";

# Iniciar
npm start
```

Escaneie o QR code com o Expo Go ou pressione `a` (Android) / `i` (iOS).

---

## 🧪 Contas de teste

Com os seeders da API rodados:

| Tipo | Email | Senha |
|---|---|---|
| Profissional | `pro@mindcat.app` | `Pro12345` |
| Paciente | `paciente@mindcat.app` | `Paciente123` |

---

## 🗺 Roadmap

- [x] Autenticação com Sanctum
- [x] Fluxos completos de humor, diário, tarefas e vínculos
- [x] Recuperação de senha por email
- [x] Validação forte de senha (8+ chars, maiúscula, minúscula, número)
- [x] Onboarding (3 telas, first-launch only)
- [x] Pull-to-refresh em todas as listagens
- [x] Interceptor global de erros de rede
- [x] 404 traduzida
- [ ] Tela de exclusão de conta (requisito Apple)
- [ ] Validação de CRP para profissionais
- [ ] Push notifications
- [ ] Publicação nas lojas (App Store + Google Play)

---

## 📄 Licença

Projeto pessoal de estudo e portfólio. Todos os direitos reservados.

---

<div align="center">

Feito com 🐱 por **[Seu Nome](https://github.com/Kuligowskilucas)**

</div>