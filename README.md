# react-native-lab

Laboratório de experimentos com React Native + Expo. Usado para explorar componentes, padrões de UI e funcionalidades do ecossistema Expo.

## Stack

- **Expo** `~56.0.12` / **Expo Router** `~56.2.11`
- **React Native** `0.85.3` / **React** `19.2.3`
- **Reanimated** `4.3.1` / **Gesture Handler** `~2.31.1`
- **TypeScript** `~6.0.3`

## Instalação

```bash
npm install
```

## Executar

| Comando              | Descrição                                                         |
| -------------------- | ----------------------------------------------------------------- |
| `npm start`          | Inicia o Metro bundler (escolha a plataforma no terminal)         |
| `npm run android`    | Compila e roda no dispositivo/emulador Android (dev build nativo) |
| `npm run android:go` | Abre no Expo Go para Android                                      |
| `npm run ios`        | Compila e roda no simulador iOS (dev build nativo)                |
| `npm run ios:go`     | Abre no Expo Go para iOS                                          |
| `npm run web`        | Inicia no navegador                                               |

## Build

### APK Android (release)

Gera o APK e salva em `apk/react-native-lab-v<versão>.apk`:

```bash
npm run build:android
```

> Requer Android SDK configurado e variável `ANDROID_HOME` definida.

Equivalente manual passo a passo:

```bash
npx expo prebuild --platform android
cd android && ./gradlew assembleRelease
```

### EAS Build (cloud)

```bash
npx eas build --platform android
npx eas build --platform ios
npx eas build --platform all
```

> Requer conta Expo e `eas-cli` instalado (`npm i -g eas-cli`).

## Lint

```bash
npm run lint
```

## Estrutura

```
src/
├── app/              # Rotas (Expo Router file-based)
│   ├── (home)/       # Stack da tab Home
│   └── _layout.tsx   # Root layout (Tabs)
├── components/       # Componentes reutilizáveis
├── constants/        # Tema, cores, constantes
└── hooks/            # Hooks customizados
```
