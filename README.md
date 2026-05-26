# 🔥 Fire Shield Mobile

Plataforma móvel de monitoramento, análise e reporte de incêndios florestais. O Fire Shield permite que cidadãos e agentes de segurança acompanhem focos de incêndio em tempo real, registrem novas ocorrências e acessem informações de emergência com agilidade.

---

## Telas

| Tela | Descrição |
|---|---|
| **Login / Cadastro** | Autenticação com e-mail e senha, criação de conta com localização opcional |
| **Mapa de Ocorrências** | Visão geoespacial dos focos com marcadores coloridos por nível de urgência e filtros rápidos |
| **Detalhes da Ocorrência** | Dados climáticos, distância, área afetada e status do Corpo de Bombeiros |
| **Reportar Ocorrência** | Formulário com GPS automático, câmera/galeria e classificação do evento |
| **Emergência** | Quick-dial 193/199/192, guia de sobrevivência e abrigos mais próximos |
| **Notificações** | Histórico de alertas com marcação de lido/não lido e navegação para o evento |
| **Perfil** | Edição de dados, slider de raio de alertas e histórico de reportes do usuário |

## Níveis de urgência

| Cor | Nível | Descrição |
|---|---|---|
| 🟡 Amarelo | Alerta | Fumaça suspeita ou fogo de pequeno porte |
| 🟠 Laranja | Grave | Fogo em expansão, equipes em alerta |
| 🔴 Vermelho | Crítico | Incêndio de grande proporção, risco imediato |

---

## Tecnologias

- **Expo SDK 54** — framework principal
- **React Native 0.81.5** com **React 19.1.0**
- **TypeScript 5.9**
- **React Navigation v7** — Bottom Tabs + Stack Navigator
- **react-native-maps** — mapa interativo com marcadores e raios de área
- **expo-location** — captura automática de coordenadas GPS
- **expo-image-picker** — câmera e galeria para anexar fotos ao reporte
- **react-native-gesture-handler** — gestos nativos para navegação
- **react-native-safe-area-context** — adaptação a notch e barra de navegação do sistema

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20+
- [Expo Go](https://expo.dev/go) instalado no celular com suporte a **SDK 54**
- (Opcional) Android Studio ou Xcode para rodar em emulador

---

## Instalação

```bash
git clone https://github.com/wendellnd/fire-shield-mobile.git
cd fire-shield-mobile
npm install --legacy-peer-deps
```

## Executando

```bash
# Expo Go (escanear QR code com o celular)
npm run start

# Emulador Android
npm run android

# Simulador iOS
npm run ios
```

---

## Estrutura do Projeto

```
fire-shield-mobile/
├── src/
│   ├── types/
│   │   └── index.ts              # Tipos TypeScript globais
│   ├── data/
│   │   └── mockData.ts           # Dados mockados (ocorrências, notificações, usuário)
│   ├── screens/
│   │   ├── AuthScreen.tsx
│   │   ├── MapScreen.tsx
│   │   ├── OccurrenceDetailScreen.tsx
│   │   ├── ReportScreen.tsx
│   │   ├── EmergencyScreen.tsx
│   │   ├── NotificationsScreen.tsx
│   │   └── ProfileScreen.tsx
│   └── navigation/
│       └── AppNavigator.tsx      # Fluxo auth → tabs → detalhe
├── assets/                       # Ícones e imagens do app
├── App.tsx                       # Entry point do componente raiz
├── index.ts                      # Entry point com registro do app
└── app.json                      # Configuração Expo
```

---

## Dados Mockados

O aplicativo funciona inteiramente com dados locais — não há back-end nem chamadas HTTP. Os dados estão em [`src/data/mockData.ts`](src/data/mockData.ts) e incluem:

- 5 focos de incêndio com diferentes níveis de urgência, condições climáticas e status
- 5 notificações com estado de leitura
- 2 reportes anteriores do usuário
- 3 abrigos de emergência simulados

---

## Licença

[MIT](LICENSE)
