# 🔥 Fire Shield Mobile

Plataforma móvel de monitoramento, análise e reporte de incêndios florestais. O Fire Shield permite que cidadãos e agentes de segurança acompanhem focos de incêndio em tempo real, registrem novas ocorrências e acessem informações de emergência com agilidade.

---

## Vídeo explicativo

```
https://youtube.com/shorts/PWZaaqZdBOA
```

---

## Telas

| Tela                       | Descrição                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| **Login / Cadastro**       | Autenticação com e-mail e senha, criação de conta com localização opcional                   |
| **Mapa de Ocorrências**    | Visão geoespacial dos focos com marcadores coloridos por nível de urgência e filtros rápidos |
| **Detalhes da Ocorrência** | Dados climáticos, distância, área afetada e status do Corpo de Bombeiros                     |
| **Reportar Ocorrência**    | Formulário com GPS automático, câmera/galeria e classificação do evento                      |
| **Emergência**             | Quick-dial 193/199/192, guia de sobrevivência e abrigos mais próximos                        |
| **Notificações**           | Histórico de alertas com marcação de lido/não lido e navegação para o evento                 |
| **Perfil**                 | Edição de dados, slider de raio de alertas e histórico de reportes do usuário                |

## Níveis de urgência

| Cor         | Nível   | Descrição                                    |
| ----------- | ------- | -------------------------------------------- |
| 🟡 Amarelo  | Alerta  | Fumaça suspeita ou fogo de pequeno porte     |
| 🟠 Laranja  | Grave   | Fogo em expansão, equipes em alerta          |
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

## Back-end

A API REST está hospedada em `https://app-fire-shield.azurewebsites.net/api`. Todas as requisições autenticadas enviam o token JWT no header `Authorization: Bearer <token>`.

| Endpoint                  | Método | Descrição                                   |
| ------------------------- | ------ | ------------------------------------------- |
| `/auth/login`             | POST   | Autenticação e obtenção do token            |
| `/auth/registrar`         | POST   | Criação de nova conta                       |
| `/ocorrencias`            | GET    | Lista todas as ocorrências                  |
| `/ocorrencias`            | POST   | Registra uma nova ocorrência                |
| `/notificacoes?lat=&lon=` | GET    | Notificações próximas à posição do usuário  |
| `/usuarios/meu-perfil`    | GET    | Dados do perfil do usuário autenticado      |
| `/usuarios/editar-perfil` | PUT    | Atualiza nome, localidade e raio de alertas |
| `/usuarios/deletar-conta` | DELETE | Remove a conta do usuário                   |

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
│   │   └── index.ts                    # Tipos TypeScript globais
│   ├── constants/
│   │   └── urgency.ts                  # Mapeamento de cores e rótulos por nível de urgência
│   ├── utils/
│   │   ├── date.ts                     # Formatação de datas
│   │   └── location.ts                 # Helpers de geolocalização
│   ├── services/
│   │   ├── api.ts                      # Cliente HTTP base (fetch + token JWT)
│   │   ├── auth.ts                     # login() e registrar()
│   │   ├── occurence.ts                # getOcorrencias() e criarOcorrencia()
│   │   ├── notification.ts             # getNotificacoes()
│   │   └── profile.ts                  # getMeuPerfil(), editarPerfil() e deletarConta()
│   ├── components/
│   │   ├── EmptyState.tsx              # Tela de estado vazio reutilizável
│   │   ├── InfoCard.tsx                # Card genérico de informações
│   │   ├── OccurrenceMapMarker.tsx     # Marcador de ocorrência no mapa
│   │   └── SectionTitle.tsx            # Título de seção
│   ├── screens/
│   │   ├── AuthScreen.tsx
│   │   ├── MapScreen.tsx
│   │   ├── OccurrenceDetailScreen.tsx
│   │   ├── ReportScreen.tsx
│   │   ├── EmergencyScreen.tsx
│   │   ├── NotificationsScreen.tsx
│   │   └── ProfileScreen.tsx
│   └── navigation/
│       └── AppNavigator.tsx            # Fluxo auth → tabs → detalhe
├── assets/                             # Ícones e imagens do app
├── App.tsx                             # Entry point do componente raiz
├── index.ts                            # Entry point com registro do app
└── app.json                            # Configuração Expo
```

---

## Licença

[MIT](LICENSE)
