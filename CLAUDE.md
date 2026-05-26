# Fire Shield Mobile

Plataforma móvel de monitoramento, análise e reporte de incêndios florestais. Desenvolvida em React Native com Expo.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Expo SDK 54 |
| Runtime | React Native 0.81.5 / React 19.1.0 |
| Linguagem | TypeScript 5.9 |
| Navegação | React Navigation v7 (Bottom Tabs + Stack) |
| Mapa | react-native-maps 1.20.1 |
| Localização | expo-location |
| Câmera/Galeria | expo-image-picker |
| Gestos | react-native-gesture-handler |
| Safe Area | react-native-safe-area-context |

## Como rodar

```bash
npm install --legacy-peer-deps
npm run start        # Expo Go (QR code)
npm run android      # Android
npm run ios          # iOS
```

> O projeto requer **Expo Go com suporte a SDK 54**. Versões do Expo Go com SDK 56+ não são compatíveis com este projeto.

## Estrutura

```
src/
  types/index.ts          # Tipos globais (Occurrence, Notification, User, etc.)
  data/mockData.ts        # Dados mockados (sem back-end real)
  screens/
    AuthScreen.tsx              # Login e cadastro
    MapScreen.tsx               # Mapa principal com marcadores e filtros
    OccurrenceDetailScreen.tsx  # Detalhes de uma ocorrência
    ReportScreen.tsx            # Formulário de reporte com GPS e câmera
    EmergencyScreen.tsx         # Quick-dial, guia de sobrevivência e abrigos
    NotificationsScreen.tsx     # Histórico de alertas com estado lida/não-lida
    ProfileScreen.tsx           # Perfil, raio de alerta e histórico de reportes
  navigation/
    AppNavigator.tsx    # Controla fluxo auth → tabs → detalhe
```

## Arquitetura de navegação

O `AppNavigator` usa estado local (`useState`) para controlar o fluxo em vez de um stack navigator aninhado. Três estados possíveis:

1. `!authenticated` → exibe `AuthScreen`
2. `authenticated && selectedOccurrenceId` → exibe `OccurrenceDetailScreen`
3. `authenticated && !selectedOccurrenceId` → exibe `MainTabs` (bottom tabs)

Cada `NavigationContainer` é montado/desmontado conforme o estado. Não há navegação declarativa entre essas três camadas — a transição é imperativa via callbacks (`onLogin`, `onBack`, `onSelectOccurrence`).

## Convenções

- **Dados**: todos os dados são mockados em `src/data/mockData.ts`. Não há chamadas HTTP.
- **Cores de urgência**: `alert` = `#FFC107`, `severe` = `#FF6B35`, `critical` = `#E53935`.
- **Safe area**: use `SafeAreaView` de `react-native-safe-area-context` (não do React Native core). A tab bar usa `useSafeAreaInsets` para calcular a altura correta acima dos botões do sistema.
- **Instalação de pacotes**: sempre usar `npx expo install <pacote>` para garantir versões compatíveis com o SDK 54.
- **Peer deps**: o projeto usa `--legacy-peer-deps` no `npm install` por conflito de versões entre dependências transitivas do Expo e do React Navigation.

## Documentação de referência

Antes de escrever código que envolva APIs do Expo, leia a documentação versionada:

```
https://docs.expo.dev/versions/v54.0.0/
```
